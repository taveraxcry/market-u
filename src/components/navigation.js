import { Bookmark, Briefcase, CalendarDays, FileText, Home, Lightbulb, MessageCircle, Store } from 'lucide-react';

// Left menu, grouped in collapsible sections.
export const NAV_SECTIONS = [
  {
    id: 'explore',
    labelKey: 'nav.sectionExplore',
    items: [
      { view: 'home', labelKey: 'nav.home', icon: Home },
      { view: 'marketplace', labelKey: 'nav.marketplace', icon: Store },
      { view: 'services', labelKey: 'nav.services', icon: Briefcase },
      { view: 'businesses', labelKey: 'nav.businesses', icon: Lightbulb },
      { view: 'events', labelKey: 'nav.events', icon: CalendarDays },
    ],
  },
  {
    id: 'mine',
    labelKey: 'nav.sectionMine',
    items: [
      { view: 'mine', labelKey: 'nav.mine', icon: FileText },
      { view: 'saved', labelKey: 'nav.saved', icon: Bookmark },
      { view: 'messages', labelKey: 'nav.messages', icon: MessageCircle },
    ],
  },
];

// Bottom bar on phones.
export const TOP_TABS = [
  { view: 'home', labelKey: 'nav.home', icon: Home },
  { view: 'marketplace', labelKey: 'nav.marketplace', icon: Store },
  { view: 'services', labelKey: 'nav.services', icon: Briefcase, also: ['businesses'] },
  { view: 'events', labelKey: 'nav.eventsShort', icon: CalendarDays },
];
