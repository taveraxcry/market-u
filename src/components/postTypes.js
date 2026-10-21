import { Briefcase, CalendarDays, Lightbulb, Megaphone, Tag } from 'lucide-react';

export const POST_TYPES = {
  general: { labelKey: 'postType.general', icon: Megaphone, tone: 'slate' },
  producto: { labelKey: 'postType.producto', icon: Tag, tone: 'blue' },
  servicio: { labelKey: 'postType.servicio', icon: Briefcase, tone: 'violet' },
  evento: { labelKey: 'postType.evento', icon: CalendarDays, tone: 'coral' },
  emprendimiento: { labelKey: 'postType.emprendimiento', icon: Lightbulb, tone: 'amber' },
};

export const REF_LABELS = {
  product: 'common.viewProduct',
  service: 'common.viewService',
  event: 'common.viewEvent',
};
