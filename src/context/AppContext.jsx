import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEMO_CREDENTIALS,
  DEMO_NAME,
  PEOPLE,
  SIMULATED_REPLIES,
  initialConversations,
  initialEvents,
  initialNotifications,
  initialPosts,
  initialProducts,
  initialServices,
  initialStories,
} from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { haptic, uid } from '../utils/format.js';

const AppContext = createContext(null);
const SESSION_KEY = 'marketu:session';

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const session = raw ? JSON.parse(raw) : null;
    // The demo account was renamed; update sessions saved before the change.
    if (session && session.email === DEMO_CREDENTIALS.email) {
      session.name = DEMO_NAME;
      session.color = '#B8306F';
    }
    return session;
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
const SIDEBAR_KEY = 'marketu:sidebar-collapsed';

function readCollapsed() {
  try {
    return localStorage.getItem(SIDEBAR_KEY) === '1';
  } catch {
    return false;
  }
}

export function AppProvider({ children }) {
  const { t, tAll } = useI18n();
  const [user, setUser] = useState(readSession);
  const [view, setViewState] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readCollapsed);

  const [stories, setStories] = useState(initialStories);
  const [seenStories, setSeenStories] = useState(() => new Set());
  const [likedStories, setLikedStories] = useState(() => new Set());
  const [storyViewer, setStoryViewer] = useState(null); // { queue: personIds[], start, openId }
  const [createStoryOpen, setCreateStoryOpen] = useState(false);

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

  const viewRef = useRef('home');
  viewRef.current = view;

  const setView = useCallback((next) => {
    if (next !== viewRef.current) {
      try {
        history.pushState({ mu: true, view: next }, '');
      } catch {
        /* history unavailable */
      }
    }
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
    setStoryViewer(null);
    setCreateStoryOpen(false);
    setSearchQuery('');
    setViewState('home');
  }, []);

  // ---------- feed interactions ----------
  const toggleLike = useCallback(
    (postId) => {
      const wasLiked = liked.has(postId);
      if (!wasLiked) haptic();
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
      haptic();
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
      if (!was) haptic();
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

  // ---------- sidebar ----------
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0');
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  // ---------- stories ----------
  const hasStory = useCallback((personId) => stories.some((s) => s.personId === personId && s.items.length), [stories]);

  const isGroupSeen = useCallback(
    (group) => group.items.every((it) => seenStories.has(it.id)),
    [seenStories]
  );

  // Order like Instagram: your story first, then unseen, then seen.
  const storyOrder = useMemo(() => {
    const own = stories.filter((s) => s.personId === 'me');
    const others = stories.filter((s) => s.personId !== 'me');
    const unseen = others.filter((g) => !isGroupSeen(g));
    const seen = others.filter((g) => isGroupSeen(g));
    return [...own, ...unseen, ...seen];
  }, [stories, isGroupSeen]);

  const openStories = useCallback(
    (personId) => {
      const queue = storyOrder.map((g) => g.personId);
      const start = Math.max(0, queue.indexOf(personId));
      setStoryViewer({ queue, start, openId: Date.now() });
    },
    [storyOrder]
  );

  const closeStories = useCallback(() => setStoryViewer(null), []);

  const markStorySeen = useCallback((id) => {
    setSeenStories((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const toggleStoryLike = useCallback((id) => {
    setLikedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addStory = useCallback(
    ({ text, bg, image }) => {
      const item = { id: uid('st'), text, bg: image ? undefined : bg, image: image || null, createdAt: Date.now() };
      setStories((list) => {
        const own = list.find((g) => g.personId === 'me');
        if (own) return list.map((g) => (g.personId === 'me' ? { ...g, items: [...g.items, item] } : g));
        return [{ personId: 'me', items: [item] }, ...list];
      });
      setCreateStoryOpen(false);
      notify(t('stories.published'));
    },
    [notify, t]
  );

  const replyToStory = useCallback(
    (personId, text) => {
      const existing = conversations.find((c) => c.itemRef?.kind === 'story' && c.itemRef?.id === personId);
      let convId = existing?.id;
      if (!convId) {
        convId = uid('conv');
        const conv = { id: convId, personId, itemRef: { kind: 'story', id: personId }, topic: tAll('stories.topic'), messages: [], unread: false };
        setConversations((list) => [conv, ...list]);
      }
      sendMessage(convId, text);
      notify(t('stories.replySent', { name: getPerson(personId).name }));
    },
    [conversations, sendMessage, notify, t, tAll, getPerson]
  );

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

  // ---------- phone back button ----------
  // Each time a panel opens we add a history entry, so the back button
  // closes it instead of leaving the app. Without panels, back returns
  // to the previous section.
  const overlays = {
    story: Boolean(storyViewer),
    chat: Boolean(chatId),
    createStory: createStoryOpen,
    create: Boolean(createType),
    detail: Boolean(detail),
    sidebar: sidebarOpen,
  };
  const openCount = Object.values(overlays).filter(Boolean).length;
  const overlaysRef = useRef(overlays);
  overlaysRef.current = overlays;
  const prevOpenCount = useRef(0);

  useEffect(() => {
    if (openCount > prevOpenCount.current) {
      try {
        history.pushState({ mu: true, view: viewRef.current }, '');
      } catch {
        /* history unavailable */
      }
    }
    prevOpenCount.current = openCount;
  }, [openCount]);

  useEffect(() => {
    try {
      history.replaceState({ mu: true, view: viewRef.current }, '');
    } catch {
      /* history unavailable */
    }
    const onPop = (e) => {
      const o = overlaysRef.current;
      if (o.story) return setStoryViewer(null);
      if (o.chat) return setChatId(null);
      if (o.createStory) return setCreateStoryOpen(false);
      if (o.create) return setCreateType(null);
      if (o.detail) return setDetail(null);
      if (o.sidebar) return setSidebarOpen(false);
      const next = e.state?.view || 'home';
      if (next !== 'search') setSearchQuery('');
      setViewState(next);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const value = useMemo(
    () => ({
      user, login, logout,
      view, setView, searchQuery, setSearchQuery, sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebar,
      stories, storyOrder, hasStory, isGroupSeen, seenStories, likedStories, storyViewer, openStories, closeStories,
      markStorySeen, toggleStoryLike, addStory, replyToStory, createStoryOpen, setCreateStoryOpen,
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
      user, login, logout, view, setView, searchQuery, sidebarOpen, sidebarCollapsed, toggleSidebar,
      stories, storyOrder, hasStory, isGroupSeen, seenStories, likedStories, storyViewer, openStories, closeStories,
      markStorySeen, toggleStoryLike, addStory, replyToStory, createStoryOpen, posts, products, services, events,
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
