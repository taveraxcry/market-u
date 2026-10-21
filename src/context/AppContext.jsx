import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  PEOPLE,
  SIMULATED_REPLIES,
  initialConversations,
  initialEvents,
  initialNotifications,
  initialPosts,
  initialProducts,
  initialServices,
} from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { uid } from '../utils/format.js';

const AppContext = createContext(null);
const SESSION_KEY = 'marketu:session';

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable: session simply won't persist */
  }
}

const itemKey = (kind, id) => `${kind}:${id}`;

export function AppProvider({ children }) {
  const { t, tAll } = useI18n();
  const [user, setUser] = useState(readSession);
  const [view, setViewState] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [services, setServices] = useState(initialServices);
  const [events, setEvents] = useState(initialEvents);

  const [saved, setSaved] = useState(() => new Set(['product:p4', 'event:e1']));
  const [liked, setLiked] = useState(() => new Set());
  const [interested, setInterested] = useState(() => new Set());

  const [notifications, setNotifications] = useState(initialNotifications);
  const [conversations, setConversations] = useState(initialConversations);

  const [detail, setDetail] = useState(null); // { kind, id }
  const [chatId, setChatId] = useState(null);
  const [createType, setCreateType] = useState(null); // null = closed
  const [toasts, setToasts] = useState([]);
  const replyIndex = useRef(0);

  // ---------- helpers ----------
  const getPerson = useCallback(
    (id) => {
      if (id === 'me' && user) return { id: 'me', ...user };
      return PEOPLE[id] || { id, name: '—', program: '', color: '#64748B' };
    },
    [user]
  );

  const notify = useCallback((message, tone = 'success') => {
    const id = uid('toast');
    setToasts((list) => [...list, { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), 3800);
  }, []);

  const dismissToast = useCallback((id) => setToasts((list) => list.filter((x) => x.id !== id)), []);

  const setView = useCallback((next) => {
    setViewState(next);
    setSidebarOpen(false);
    if (next !== 'search') setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const findItem = useCallback(
    (kind, id) => {
      const source = { product: products, service: services, event: events }[kind] || [];
      return source.find((item) => item.id === id) || null;
    },
    [products, services, events]
  );

  // ---------- auth (simulated) ----------
  const login = useCallback((profile, remember) => {
    setUser(profile);
    writeSession(remember ? profile : null);
    setViewState('home');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
    setDetail(null);
    setChatId(null);
    setCreateType(null);
    setSearchQuery('');
    setViewState('home');
  }, []);

  // ---------- feed interactions ----------
  const toggleLike = useCallback(
    (postId) => {
      const wasLiked = liked.has(postId);
      setLiked((prev) => {
        const next = new Set(prev);
        if (wasLiked) next.delete(postId);
        else next.add(postId);
        return next;
      });
      setPosts((list) =>
        list.map((p) => (p.id === postId ? { ...p, likes: p.likes + (wasLiked ? -1 : 1) } : p))
      );
    },
    [liked]
  );

  const addComment = useCallback((postId, text) => {
    const comment = { id: uid('c'), authorId: 'me', text, createdAt: Date.now() };
    setPosts((list) => list.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)));
  }, []);

  const sharePost = useCallback(
    (postId) => {
      setPosts((list) => list.map((p) => (p.id === postId ? { ...p, shares: p.shares + 1 } : p)));
      notify(t('toast.shared'), 'info');
    },
    [notify, t]
  );

  const toggleSave = useCallback(
    (kind, id) => {
      const key = itemKey(kind, id);
      const wasSaved = saved.has(key);
      setSaved((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
      notify(wasSaved ? t('toast.removed') : t('toast.saved'), wasSaved ? 'info' : 'success');
    },
    [saved, notify, t]
  );

  const isSaved = useCallback((kind, id) => saved.has(itemKey(kind, id)), [saved]);

  const toggleInterest = useCallback(
    (eventId) => {
      const was = interested.has(eventId);
      setInterested((prev) => {
        const next = new Set(prev);
        if (was) next.delete(eventId);
        else next.add(eventId);
        return next;
      });
      setEvents((list) =>
        list.map((e) => (e.id === eventId ? { ...e, interested: e.interested + (was ? -1 : 1) } : e))
      );
      if (!was) notify(t('toast.interested'));
    },
    [interested, notify, t]
  );

  // ---------- notifications ----------
  const markNotificationsRead = useCallback(
    () => setNotifications((list) => list.map((n) => ({ ...n, read: true }))),
    []
  );

  // ---------- simulated chat ----------
  const openContact = useCallback(
    (kind, id) => {
      const item = findItem(kind, id);
      if (!item) return;
      const ownerId = item.sellerId || item.providerId || item.organizerId;
      if (ownerId === 'me') {
        notify(t('toast.ownPost'), 'info');
        return;
      }
      const existing = conversations.find((c) => c.itemRef?.kind === kind && c.itemRef?.id === id);
      if (existing) {
        setChatId(existing.id);
        return;
      }
      const conv = {
        id: uid('conv'),
        personId: ownerId,
        itemRef: { kind, id },
        topic: item.title || item.name,
        messages: [],
        unread: false,
      };
      setConversations((list) => [conv, ...list]);
      setChatId(conv.id);
    },
    [findItem, conversations, notify, t]
  );

  const openConversation = useCallback((id) => {
    setChatId(id);
    setConversations((list) => list.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  }, []);

  const sendMessage = useCallback((convId, text) => {
    const append = (msg) =>
      setConversations((list) =>
        list.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, msg] } : c))
      );
    append({ from: 'me', text, at: Date.now() });
    const reply = SIMULATED_REPLIES[replyIndex.current % SIMULATED_REPLIES.length];
    replyIndex.current += 1;
    setTimeout(() => append({ from: 'them', text: reply, at: Date.now(), simulated: true }), 1400);
  }, []);

  // ---------- create publication ----------
  const createPublication = useCallback(
    (type, data) => {
      const now = Date.now();
      const postBase = { id: uid('post'), authorId: 'me', likes: 0, shares: 0, createdAt: now, comments: [] };
      let destination = 'home';
      let message = t('toast.general');

      if (type === 'general') {
        setPosts((list) => [{ ...postBase, type: 'general', text: data.text, image: data.image || null }, ...list]);
      }

      if (type === 'producto') {
        const product = {
          id: uid('p'),
          title: data.title,
          price: Number(data.price),
          category: data.category,
          condition: data.condition || null,
          sellerId: 'me',
          image: data.image || null,
          description: data.description,
          location: tAll('auto.campusPickup'),
          createdAt: now,
        };
        setProducts((list) => [product, ...list]);
        setPosts((list) => [
          {
            ...postBase,
            type: 'producto',
            text: tAll('auto.product', { title: product.title, desc: product.description }),
            image: product.image,
            ref: { kind: 'product', id: product.id },
          },
          ...list,
        ]);
        destination = 'marketplace';
        message = t('toast.product');
      }

      if (type === 'servicio' || type === 'emprendimiento') {
        const service = {
          id: uid('s'),
          kind: type,
          name: data.name,
          category: data.category,
          providerId: 'me',
          priceLabel: data.price ? data.price : tAll('auto.negotiable'),
          image: data.image || null,
          description: data.description,
          contact: data.contact || 'market',
          rating: null,
        };
        setServices((list) => [service, ...list]);
        setPosts((list) => [
          {
            ...postBase,
            type,
            text: tAll(type === 'servicio' ? 'auto.service' : 'auto.business', { name: service.name, desc: service.description }),
            image: service.image,
            ref: { kind: 'service', id: service.id },
          },
          ...list,
        ]);
        destination = 'services';
        message = type === 'servicio' ? t('toast.service') : t('toast.business');
      }

      if (type === 'evento') {
        const event = {
          id: uid('e'),
          name: data.name,
          category: data.category,
          date: data.date,
          time: data.time || '',
          location: data.location,
          organizerId: 'me',
          image: data.image || null,
          description: data.description,
          interested: 0,
          demo: true,
        };
        setEvents((list) => [event, ...list]);
        setPosts((list) => [
          {
            ...postBase,
            type: 'evento',
            text: tAll('auto.event', { name: event.name, location: event.location, desc: event.description }),
            image: event.image,
            ref: { kind: 'event', id: event.id },
          },
          ...list,
        ]);
        destination = 'events';
        message = t('toast.event');
      }

      setCreateType(null);
      notify(message);
      return destination;
    },
    [notify, t, tAll]
  );

  const value = useMemo(
    () => ({
      user, login, logout,
      view, setView, searchQuery, setSearchQuery, sidebarOpen, setSidebarOpen,
      posts, products, services, events,
      getPerson, findItem,
      liked, toggleLike, addComment, sharePost,
      toggleSave, isSaved, saved,
      interested, toggleInterest,
      notifications, markNotificationsRead,
      conversations, chatId, setChatId, openContact, openConversation, sendMessage,
      detail, setDetail,
      createType, setCreateType, createPublication,
      toasts, notify, dismissToast,
    }),
    [
      user, login, logout, view, setView, searchQuery, sidebarOpen, posts, products, services, events,
      getPerson, findItem, liked, toggleLike, addComment, sharePost, toggleSave, isSaved, saved,
      interested, toggleInterest, notifications, markNotificationsRead, conversations, chatId,
      openContact, openConversation, sendMessage, detail, createType, createPublication, toasts, notify, dismissToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
