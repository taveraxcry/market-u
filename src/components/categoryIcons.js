import {
  BookOpen, Briefcase, Cake, CalendarDays, Camera, Dumbbell, Gem, GraduationCap, Laptop, Lightbulb,
  Megaphone, Music, Package, Palette, Rocket, Shirt, Sofa, Users, UtensilsCrossed,
} from 'lucide-react';

export const CATEGORY_ICONS = {
  Tecnología: Laptop,
  'Libros y estudio': BookOpen,
  'Ropa y accesorios': Shirt,
  Hogar: Sofa,
  Deportes: Dumbbell,
  Comida: UtensilsCrossed,
  Otros: Package,
  Tutorías: GraduationCap,
  Diseño: Palette,
  'Fotografía y video': Camera,
  Repostería: Cake,
  Artesanías: Gem,
  Académicos: GraduationCap,
  Culturales: Music,
  Sociales: Users,
  Emprendimiento: Rocket,
  servicio: Briefcase,
  emprendimiento: Lightbulb,
  evento: CalendarDays,
  producto: Package,
  general: Megaphone,
};

export const CATEGORY_TINTS = {
  Tecnología: ['#3730A3', '#2F7BFF'],
  'Libros y estudio': ['#0E7490', '#22D3EE'],
  'Ropa y accesorios': ['#BE185D', '#F472B6'],
  Hogar: ['#92400E', '#F59E0B'],
  Deportes: ['#047857', '#34D399'],
  Comida: ['#C2410C', '#FB923C'],
  Otros: ['#334155', '#94A3B8'],
  Repostería: ['#BE123C', '#FDA4AF'],
  Artesanías: ['#7E22CE', '#C084FC'],
  Tutorías: ['#1D4ED8', '#60A5FA'],
  Diseño: ['#6D28D9', '#A78BFA'],
  'Fotografía y video': ['#0F172A', '#475569'],
  Académicos: ['#1E3A8A', '#3B82F6'],
  Culturales: ['#9D174D', '#F472B6'],
  Sociales: ['#0F766E', '#2DD4BF'],
  Emprendimiento: ['#B45309', '#FBBF24'],
};

export function iconFor(category) {
  return CATEGORY_ICONS[category] || Package;
}
