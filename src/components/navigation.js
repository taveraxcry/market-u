import { Bookmark, CalendarDays, FileText, Home, Lightbulb, MessageCircle, Store, Briefcase } from 'lucide-react';

export const NAV_ITEMS = [
  { view: 'home', labelKey: 'nav.home', icon: Home },
  { view: 'marketplace', labelKey: 'nav.marketplace', icon: Store },
  { view: 'services', labelKey: 'nav.services', icon: Briefcase },
  { view: 'businesses', labelKey: 'nav.businesses', icon: Lightbulb },
  { view: 'events', labelKey: 'nav.events', icon: CalendarDays },
  { view: 'mine', labelKey: 'nav.mine', icon: FileText },
  { view: 'saved', labelKey: 'nav.saved', icon: Bookmark },
  { view: 'messages', labelKey: 'nav.messages', icon: MessageCircle },
];

export const TOP_TABS = [
  { view: 'home', labelKey: 'nav.home', icon: Home },
  { view: 'marketplace', labelKey: 'nav.marketplace', icon: Store },
  { view: 'services', labelKey: 'nav.services', icon: Briefcase, also: ['businesses'] },
  { view: 'events', labelKey: 'nav.eventsShort', icon: CalendarDays },
];
