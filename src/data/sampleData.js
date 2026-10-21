// Datos del prototipo Market U, en español e inglés.
//
// - Los EVENTOS marcados con `source` son reales: se tomaron de fuentes públicas
//   (sitios de las universidades y medios) en octubre de 2026, y la app enlaza la fuente.
// - Las PERSONAS, publicaciones, productos, servicios, chats y los eventos con `demo: true`
//   son ficticios, aunque hablen de eventos y lugares reales de Manizales.
// - Las fotos de lugares de Manizales son reales, con licencia libre (ver photos.js).

import { photo } from './photos.js';

const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const minutesAgo = (m) => Date.now() - m * 60 * 1000;
/** Fixed date-time in Colombia (UTC-5). */
const at = (date, time = '12:00') => new Date(`${date}T${time}:00-05:00`).getTime();
const b = (es, en) => ({ es, en });

export const DEMO_CREDENTIALS = { email: 'demo@marketu.app', password: 'MarketU2026' };
export const DEMO_NAME = 'Salomé Vergara';

export const UNIVERSITIES = [
  { id: 'uam', name: 'Universidad Autónoma de Manizales', available: true },
  { id: 'otras', nameKey: 'auth.otherUniversities', available: false },
];

/** Where people and events come from. `short` is shown next to names. */
export const INSTITUTIONS = {
  uam: { short: 'UAM', name: 'Universidad Autónoma de Manizales', color: '#B8306F' },
  unal: { short: 'U. Nacional', name: 'Universidad Nacional de Colombia · Sede Manizales', color: '#2F7D6D' },
  ucaldas: { short: 'U. de Caldas', name: 'Universidad de Caldas', color: '#0E7C86' },
  city: { short: 'Manizales', name: 'Manizales', color: '#9A6200' },
  students: { short: b('Estudiantes', 'Students'), name: 'Estudiantes', color: '#7A3B9A' },
};
export const EVENT_INSTITUTIONS = ['uam', 'unal', 'ucaldas', 'city', 'students'];

const UAM_PICKUP = b('Entrega en la UAM (Antigua Estación)', 'Pickup at UAM (Old Train Station)');

export const PEOPLE = {
  // ----- fictional students -----
  valentina: { id: 'valentina', name: 'Valentina Ríos', uni: 'uam', program: b('Diseño Visual', 'Visual Design'), color: '#7C3AED' },
  santiago: { id: 'santiago', name: 'Santiago Cardona', uni: 'uam', program: b('Ingeniería de Sistemas', 'Systems Engineering'), color: '#0E7C86' },
  mariana: { id: 'mariana', name: 'Mariana Ocampo', uni: 'uam', program: b('Administración de Empresas', 'Business Administration'), color: '#DB2777' },
  julian: { id: 'julian', name: 'Julián Henao', uni: 'uam', program: b('Ingeniería Mecatrónica', 'Mechatronics Engineering'), color: '#2F7D6D' },
  camila: { id: 'camila', name: 'Camila Arango', uni: 'uam', program: b('Negocios Internacionales', 'International Business'), color: '#EA580C' },
  andres: { id: 'andres', name: 'Andrés Salazar', uni: 'uam', program: b('Economía', 'Economics'), color: '#059669' },
  daniela: { id: 'daniela', name: 'Daniela Giraldo', uni: 'uam', program: b('Fisioterapia', 'Physical Therapy'), color: '#E11D48' },
  tomas: { id: 'tomas', name: 'Tomás Villegas', uni: 'uam', program: b('Ingeniería Biomédica', 'Biomedical Engineering'), color: '#5B3FA0' },
  laura: { id: 'laura', name: 'Laura Montoya', uni: 'uam', program: b('Lenguas Modernas', 'Modern Languages'), color: '#CA8A04' },
  felipe: { id: 'felipe', name: 'Felipe Zuluaga', uni: 'uam', program: b('Comunicación Social', 'Communications'), color: '#0D9488' },
  isabella: { id: 'isabella', name: 'Isabella Cardona', uni: 'ucaldas', program: b('Artes Plásticas', 'Fine Arts'), color: '#C2368C' },
  mateo: { id: 'mateo', name: 'Mateo Ríos', uni: 'unal', program: b('Ingeniería Civil', 'Civil Engineering'), color: '#1F8A5B' },
  // ----- real organizers (shown only as event organizers, never as chat contacts) -----
  org_uam: { id: 'org_uam', name: 'Universidad Autónoma de Manizales', institution: true, uni: 'uam', program: b('Organizador oficial', 'Official organizer'), color: '#B8306F' },
  org_unal: { id: 'org_unal', name: 'Universidad Nacional · Sede Manizales', institution: true, uni: 'unal', program: b('Organizador oficial', 'Official organizer'), color: '#2F7D6D' },
  org_ucaldas: { id: 'org_ucaldas', name: 'Universidad de Caldas', institution: true, uni: 'ucaldas', program: b('Organizador oficial', 'Official organizer'), color: '#0E7C86' },
  org_fit: { id: 'org_fit', name: 'Festival Internacional de Teatro de Manizales', institution: true, uni: 'city', program: b('Organizador oficial', 'Official organizer'), color: '#9A6200' },
  org_ungrd: { id: 'org_ungrd', name: 'UNGRD · Gestión del Riesgo de Desastres', institution: true, uni: 'city', program: b('Entidad nacional', 'National agency'), color: '#D4461F' },
  org_feria: { id: 'org_feria', name: 'Feria de Manizales', institution: true, uni: 'city', program: b('Evento de ciudad', 'City event'), color: '#9A6200' },
};

export const PRODUCT_CATEGORIES = ['Tecnología', 'Libros y estudio', 'Ropa y accesorios', 'Hogar', 'Deportes', 'Comida', 'Otros'];
export const SERVICE_CATEGORIES = ['Tutorías', 'Diseño', 'Fotografía y video', 'Tecnología', 'Comida', 'Repostería', 'Artesanías', 'Otros'];
export const EVENT_CATEGORIES = ['Académicos', 'Culturales', 'Comunidad', 'Deportes', 'Emprendimiento'];
export const CONDITIONS = ['new', 'likeNew', 'goodUsed', 'wornUsed'];
export const CONTACT_OPTIONS = ['market', 'campus', 'virtual'];

// ======================= PRODUCTS (fictional) =======================
export const initialProducts = [
  {
    id: 'p1',
    title: b('Portátil Lenovo ThinkPad T480', 'Lenovo ThinkPad T480 laptop'),
    price: 1350000,
    category: 'Tecnología',
    condition: 'goodUsed',
    sellerId: 'santiago',
    image: img('photo-1496181133206-80ce9b88a853'),
    description: b(
      'Intel Core i5 de octava generación, 16 GB de RAM y SSD de 512 GB. Batería de unas 5 horas. Corre bien MATLAB, Visual Studio Code y Packet Tracer. Incluye cargador original; se puede probar en la sala de cómputo.',
      '8th-gen Intel Core i5, 16 GB RAM, 512 GB SSD. About 5 hours of battery. Runs MATLAB, VS Code and Packet Tracer fine. Original charger included; you can try it in the computer lab.'
    ),
    location: UAM_PICKUP,
    createdAt: at('2026-10-18', '11:40'),
  },
  {
    id: 'p2',
    title: b('Calculadora científica Casio fx-991LA CW', 'Casio fx-991LA CW scientific calculator'),
    price: 95000,
    category: 'Libros y estudio',
    condition: 'likeNew',
    sellerId: 'tomas',
    image: null,
    description: b(
      'La usé un semestre para Cálculo Diferencial. Funciona perfecto, con estuche y manual. Es la que piden en la mayoría de parciales de primeros semestres.',
      'Used for one semester of Differential Calculus. Works perfectly, with case and manual. The one most first-year exams ask for.'
    ),
    location: b('Biblioteca de la UAM', 'UAM library'),
    createdAt: at('2026-10-20', '09:15'),
  },
  {
    id: 'p3',
    title: b('Libros de Cálculo (Stewart) y Física (Serway)', 'Calculus (Stewart) and Physics (Serway) books'),
    price: 180000,
    category: 'Libros y estudio',
    condition: 'goodUsed',
    sellerId: 'andres',
    image: img('photo-1512820790803-83ca734da794'),
    description: b(
      'Paquete de dos libros: Cálculo de una variable de Stewart y Física para ciencias e ingeniería de Serway. Algunos subrayados a lápiz.',
      "Bundle of two books: Stewart's Single Variable Calculus and Serway's Physics for Scientists and Engineers. Some pencil highlighting."
    ),
    location: UAM_PICKUP,
    createdAt: at('2026-10-15', '17:30'),
  },
  {
    id: 'p13',
    title: b('Kit de dibujo técnico + escalímetro', 'Technical drawing kit + scale ruler'),
    price: 70000,
    category: 'Libros y estudio',
    condition: 'goodUsed',
    sellerId: 'mateo',
    image: img('photo-1503387762-592deb58ef4e'),
    description: b(
      'Escuadras, compás, portaminas 0.5 y escalímetro triangular. Me sirvió para Expresión Gráfica en la Nacional; ideal para Arquitectura o Ingeniería Civil.',
      'Set squares, compass, 0.5 mechanical pencil and triangular scale. Used for Graphic Expression at the Nacional; great for Architecture or Civil Engineering.'
    ),
    location: b('Campus Palogrande (U. Nacional)', 'Palogrande campus (U. Nacional)'),
    createdAt: at('2026-10-13', '14:05'),
  },
  {
    id: 'p4',
    title: b('Audífonos inalámbricos Sony WH-CH520', 'Sony WH-CH520 wireless headphones'),
    price: 160000,
    category: 'Tecnología',
    condition: 'likeNew',
    sellerId: 'julian',
    image: img('photo-1505740420928-5e560c06d30e'),
    description: b(
      'Bluetooth, hasta 50 horas de batería. Perfectos para estudiar o para el bus. Los vendo porque me regalaron otros.',
      'Bluetooth, up to 50 hours of battery. Great for studying or the bus. Selling them because I got another pair as a gift.'
    ),
    location: UAM_PICKUP,
    createdAt: at('2026-10-11', '19:20'),
  },
  {
    id: 'p5',
    title: b('Morral antirrobo para portátil', 'Anti-theft laptop backpack'),
    price: 85000,
    category: 'Ropa y accesorios',
    condition: 'new',
    sellerId: 'camila',
    image: img('photo-1553062407-98eeb64c6a62'),
    description: b(
      'Compartimento acolchado para portátil de hasta 15.6", puerto USB y cierre oculto. Resistente a la lluvia: probado con los aguaceros de Manizales.',
      'Padded compartment for laptops up to 15.6", USB port and hidden zipper. Rain-resistant: tested in Manizales downpours.'
    ),
    location: b('Estación Fundadores del Cable Aéreo', 'Fundadores cable car station'),
    createdAt: at('2026-10-09', '10:10'),
  },
  {
    id: 'p6',
    title: b('Aretes y pulseras artesanales', 'Handmade earrings and bracelets'),
    price: 25000,
    category: 'Ropa y accesorios',
    condition: 'new',
    sellerId: 'valentina',
    image: img('photo-1515562141207-7a88fb7ce338'),
    description: b(
      'Hechos a mano con mostacilla y piedras naturales. Hago diseños personalizados con tus colores. Precio por unidad.',
      'Handmade with beads and natural stones. Custom designs in your colors. Price per item.'
    ),
    location: UAM_PICKUP,
    createdAt: at('2026-10-06', '16:45'),
  },
  {
    id: 'p14',
    title: b('Lienzos y acrílicos (poco uso)', 'Canvases and acrylic paints (barely used)'),
    price: 55000,
    category: 'Otros',
    condition: 'likeNew',
    sellerId: 'isabella',
    image: img('photo-1513364776144-60967b0f800f'),
    description: b(
      'Tres lienzos de 30×40 y un set de 12 acrílicos. Sobraron de un taller de Artes Plásticas en la U. de Caldas.',
      'Three 30×40 canvases and a 12-color acrylic set. Leftovers from a Fine Arts workshop at U. de Caldas.'
    ),
    location: b('Universidad de Caldas, sede central', 'Universidad de Caldas, main campus'),
    createdAt: at('2026-10-17', '12:30'),
  },
  {
    id: 'p7',
    title: b('Bicicleta urbana rin 26', '26" city bike'),
    price: 450000,
    category: 'Deportes',
    condition: 'goodUsed',
    sellerId: 'felipe',
    image: img('photo-1485965120184-e220f721d03e'),
    description: b(
      '21 cambios y frenos en buen estado (las lomas de Manizales lo exigen). Llantas nuevas, incluye candado y luz trasera.',
      '21 speeds and good brakes (Manizales hills demand it). New tires, lock and rear light included.'
    ),
    location: b('Barrio Palermo', 'Palermo neighborhood'),
    createdAt: at('2026-09-29', '08:50'),
  },
  {
    id: 'p8',
    title: b('Lámpara de escritorio LED', 'LED desk lamp'),
    price: 45000,
    category: 'Hogar',
    condition: 'likeNew',
    sellerId: 'laura',
    image: img('photo-1507473885765-e6ed057f782c'),
    description: b('Tres intensidades, luz cálida o fría y cuello flexible. Perfecta para estudiar de noche.', 'Three brightness levels, warm or cool light and flexible neck. Perfect for late-night studying.'),
    location: b('Barrio Milán', 'Milán neighborhood'),
    createdAt: at('2026-09-26', '20:05'),
  },
  {
    id: 'p11',
    title: b('Caja de brownies x6', 'Box of 6 brownies'),
    price: 18000,
    category: 'Comida',
    condition: null,
    sellerId: 'mariana',
    image: img('photo-1606313564200-e75d5e30476c'),
    description: b('Brownies de chocolate con nueces, hechos el mismo día. Pedidos con un día de anticipación.', 'Chocolate walnut brownies, baked the same day. Order one day in advance.'),
    location: UAM_PICKUP,
    createdAt: at('2026-10-21', '06:55'),
  },
  {
    id: 'p12',
    title: b('Bata de laboratorio talla M', 'Lab coat, size M'),
    price: 40000,
    category: 'Otros',
    condition: 'goodUsed',
    sellerId: 'tomas',
    image: null,
    description: b('Bata blanca manga larga, antifluidos. La usé en los laboratorios de Biomédica.', 'White long-sleeve, fluid-resistant lab coat. Used in the Biomedical labs.'),
    location: UAM_PICKUP,
    createdAt: at('2026-09-18', '15:20'),
  },
];

// ======================= SERVICES & BUSINESSES (fictional) =======================
export const initialServices = [
  {
    id: 's1',
    kind: 'servicio',
    name: b('Tutorías de Cálculo y Álgebra Lineal', 'Calculus and Linear Algebra tutoring'),
    category: 'Tutorías',
    providerId: 'andres',
    priceLabel: b('Desde $ 25.000 / hora', 'From $ 25.000 / hour'),
    image: img('photo-1509228468518-180dd4864904'),
    description: b(
      'Preparo parciales de Cálculo Diferencial, Integral y Álgebra Lineal. Presencial en la biblioteca de la UAM o virtual. Grupos de hasta 4 personas.',
      'Exam prep for Differential and Integral Calculus and Linear Algebra. In person at the UAM library or online. Groups of up to 4.'
    ),
    contact: 'market',
    rating: 4.9,
  },
  {
    id: 's2',
    kind: 'servicio',
    name: b('Inglés conversacional y prueba de suficiencia', 'Conversational English and proficiency test prep'),
    category: 'Tutorías',
    providerId: 'laura',
    priceLabel: b('Desde $ 30.000 / hora', 'From $ 30.000 / hour'),
    image: img('photo-1503676260728-1c00da094a0b'),
    description: b(
      'Practica speaking y prepara la prueba de suficiencia en inglés que te piden para graduarte. Niveles A2 a B2, simulacros de examen incluidos.',
      'Practice speaking and prepare the English proficiency test required to graduate. Levels A2 to B2, mock exams included.'
    ),
    contact: 'market',
    rating: 4.8,
  },
  {
    id: 's3',
    kind: 'servicio',
    name: b('Diseño de logos e identidad visual', 'Logo and brand identity design'),
    category: 'Diseño',
    providerId: 'valentina',
    priceLabel: b('Desde $ 80.000', 'From $ 80.000'),
    image: img('photo-1561070791-2526d30994b5'),
    description: b(
      'Logo, paleta y piezas para redes para emprendimientos estudiantiles. Ideal si vas a participar en una feria empresarial. Entrega en 5 días hábiles.',
      'Logo, palette and social media graphics for student businesses. Perfect before a business fair. Delivered in 5 business days.'
    ),
    contact: 'market',
    rating: 5.0,
  },
  {
    id: 's4',
    kind: 'servicio',
    name: b('Fotografía de grados en Chipre y el Recinto del Pensamiento', 'Graduation photos at Chipre and Recinto del Pensamiento'),
    category: 'Fotografía y video',
    providerId: 'felipe',
    priceLabel: b('Desde $ 120.000', 'From $ 120.000'),
    image: photo('zeri'),
    description: b(
      'Sesiones para grados y perfiles profesionales en los lugares más lindos de Manizales: el mirador de Chipre, el Recinto del Pensamiento o tu campus. Edición básica y entrega digital.',
      "Graduation and professional headshot sessions at Manizales' prettiest spots: Chipre viewpoint, Recinto del Pensamiento or your campus. Basic editing and digital delivery."
    ),
    contact: 'campus',
    rating: 4.7,
  },
  {
    id: 's5',
    kind: 'servicio',
    name: b('Edición de video para redes', 'Video editing for social media'),
    category: 'Fotografía y video',
    providerId: 'julian',
    priceLabel: b('Desde $ 60.000', 'From $ 60.000'),
    image: img('photo-1574717024653-61fd2cf4d44d'),
    description: b('Reels, TikToks y videos para proyectos de clase. Subtítulos, música y transiciones.', 'Reels, TikToks and class project videos. Subtitles, music and transitions.'),
    contact: 'virtual',
    rating: 4.6,
  },
  {
    id: 's6',
    kind: 'servicio',
    name: b('Reparación y mantenimiento de computadores', 'Computer repair and maintenance'),
    category: 'Tecnología',
    providerId: 'santiago',
    priceLabel: b('Desde $ 40.000', 'From $ 40.000'),
    image: null,
    description: b('Formateo, limpieza interna, pasta térmica, instalación de programas y ampliación de RAM o SSD.', 'OS reinstall, internal cleaning, thermal paste, software setup and RAM or SSD upgrades.'),
    contact: 'campus',
    rating: 4.8,
  },
  {
    id: 's11',
    kind: 'servicio',
    name: b('Maquetas de arquitectura y modelado 3D', 'Architecture models and 3D modeling'),
    category: 'Diseño',
    providerId: 'mateo',
    priceLabel: b('Desde $ 90.000', 'From $ 90.000'),
    image: photo('unalArq'),
    description: b(
      'Maquetas en cartón paja y balso, y modelado en SketchUp o Revit para entregas de taller. Estudiante de la U. Nacional sede Manizales.',
      'Cardboard and balsa models plus SketchUp or Revit modeling for studio deliveries. Student at U. Nacional, Manizales campus.'
    ),
    contact: 'market',
    rating: 4.9,
  },
  {
    id: 's7',
    kind: 'emprendimiento',
    name: b('Sazón de Casa — Almuerzos caseros', 'Sazón de Casa — Home-cooked lunches'),
    category: 'Comida',
    providerId: 'daniela',
    priceLabel: b('$ 14.000 por almuerzo', '$ 14.000 per lunch'),
    image: img('photo-1504674900247-0877df9cc836'),
    description: b(
      'Almuerzos caseros de lunes a viernes: sopa, seco y jugo natural. Pedidos antes de las 10:00 a. m. con entrega en la portería de la UAM.',
      'Home-cooked lunches Monday to Friday: soup, main dish and fresh juice. Order before 10:00 AM for delivery at the UAM gate.'
    ),
    contact: 'market',
    rating: 4.9,
  },
  {
    id: 's8',
    kind: 'emprendimiento',
    name: b('Dulce Campus — Repostería', 'Dulce Campus — Bakery'),
    category: 'Repostería',
    providerId: 'mariana',
    priceLabel: b('Desde $ 6.000', 'From $ 6.000'),
    image: img('photo-1578985545062-69928b1d9587'),
    description: b('Tortas, cupcakes, brownies y postres personalizados para cumpleaños y celebraciones.', 'Cakes, cupcakes, brownies and custom desserts for birthdays and celebrations.'),
    contact: 'market',
    rating: 5.0,
  },
  {
    id: 's9',
    kind: 'emprendimiento',
    name: b('Hilo & Barro — Artesanías', 'Hilo & Barro — Handmade goods'),
    category: 'Artesanías',
    providerId: 'camila',
    priceLabel: b('Desde $ 15.000', 'From $ 15.000'),
    image: img('photo-1452860606245-08befc0ff44b'),
    description: b('Macetas de cerámica, llaveros tejidos y regalos hechos a mano. Cada pieza es única.', 'Ceramic planters, knitted keychains and handmade gifts. Every piece is unique.'),
    contact: 'market',
    rating: 4.8,
  },
  {
    id: 's10',
    kind: 'emprendimiento',
    name: b('Café Ladera — Café de origen Caldas', 'Café Ladera — Single-origin Caldas coffee'),
    category: 'Comida',
    providerId: 'tomas',
    priceLabel: b('Desde $ 22.000', 'From $ 22.000'),
    image: img('photo-1509042239860-f550ce710b93'),
    description: b('Café especial cultivado por mi familia en Chinchiná. Bolsas de 250 g y 500 g, en grano o molido.', 'Specialty coffee grown by my family in Chinchiná. 250 g and 500 g bags, whole bean or ground.'),
    contact: 'campus',
    rating: 4.9,
  },
  {
    id: 's12',
    kind: 'emprendimiento',
    name: b('Trazo Vivo — Ilustración y retratos', 'Trazo Vivo — Illustration and portraits'),
    category: 'Artesanías',
    providerId: 'isabella',
    priceLabel: b('Desde $ 35.000', 'From $ 35.000'),
    image: img('photo-1513364776144-60967b0f800f'),
    description: b(
      'Retratos en acuarela, ilustraciones para regalos y stickers personalizados. Estudiante de Artes Plásticas de la U. de Caldas.',
      'Watercolor portraits, gift illustrations and custom stickers. Fine Arts student at U. de Caldas.'
    ),
    contact: 'market',
    rating: 5.0,
  },
];

// ======================= EVENTS =======================
// `source`: real event, data from the linked public source.
// `demo`: illustrative student event.  `tentative`: real event, dates not official yet.
export const initialEvents = [
  {
    id: 'e-foro',
    name: b('XXIX Foro de Investigación UAM: Tejiendo conocimiento para construir redes', 'XXIX UAM Research Forum: Weaving knowledge to build networks'),
    category: 'Académicos',
    institution: 'uam',
    date: '2026-11-11',
    endDate: '2026-11-13',
    time: '07:00',
    location: b('Universidad Autónoma de Manizales · modalidad híbrida', 'Universidad Autónoma de Manizales · hybrid (in person + online)'),
    organizerId: 'org_uam',
    image: photo('uamFacade'),
    description: b(
      'El XXIX Foro de Investigación UAM llega junto con el I Encuentro Interdisciplinario de I+D+i de la Red Universitaria Mutis y el II Coloquio Doctoral de Ingeniería y Sostenibilidad. Cinco líneas temáticas: bioeconomía y economía creativa; agua y cambio climático; nuevo modelo productivo, sostenible y competitivo; conocimiento e innovación para la equidad; y educar con calidad. La participación es sin costo, como gesto de solidaridad con la comunidad tras el desastre natural.',
      'The XXIX UAM Research Forum comes with the 1st Interdisciplinary R&D&I Meeting of the Mutis University Network and the 2nd Doctoral Colloquium on Engineering and Sustainability. Five tracks: bioeconomy and creative economy; water and climate change; a new productive, sustainable and competitive model; knowledge and innovation for equity; and quality education. Participation is free, as a gesture of solidarity with the community after the natural disaster.'
    ),
    interested: 186,
    featured: true,
    source: { label: 'autonoma.edu.co', url: 'https://www.autonoma.edu.co/eventos/tejiendo-conocimientos-para-construir-redes' },
  },
  {
    id: 'e-hack',
    name: b('Hackathon UNAL Manizales: soluciones tras el sismo', 'UNAL Manizales Hackathon: solutions after the earthquake'),
    category: 'Emprendimiento',
    institution: 'unal',
    date: '2026-11-20',
    endDate: '2026-11-21',
    time: '',
    location: b('Universidad Nacional de Colombia, sede Manizales', 'Universidad Nacional de Colombia, Manizales campus'),
    organizerId: 'org_unal',
    image: photo('unalPalogrande'),
    description: b(
      'Maratón de innovación abierta a estudiantes de varias universidades para crear prototipos en vivienda e infraestructura, servicios públicos, movilidad y gestión del riesgo después del terremoto del 10 de agosto. Se pide un prototipo medible y una ruta para probarlo en un piloto de 20 a 30 días. Se presentó el 8 de octubre en el campus La Nubia.',
      'Innovation marathon open to students from several universities to build prototypes for housing and infrastructure, public services, mobility and risk management after the August 10 earthquake. Teams must deliver a measurable prototype and a plan to pilot it in 20 to 30 days. It was launched on October 8 at the La Nubia campus.'
    ),
    interested: 241,
    source: { label: 'BC Noticias', url: 'https://www.bcnoticias.com.co/unal-manizales-realizara-hackathon-para-buscar-soluciones-tras-el-sismo-en-caldas/' },
  },
  {
    id: 'e-sim',
    name: b('Simulacro Nacional de Respuesta a Emergencias 2026', '2026 National Emergency Response Drill'),
    category: 'Comunidad',
    institution: 'city',
    date: '2026-10-21',
    time: '10:00',
    location: b('Todo el país: universidades, empresas, colegios y hogares', 'Nationwide: universities, companies, schools and homes'),
    organizerId: 'org_ungrd',
    image: photo('cerroOro'),
    description: b(
      'Dos momentos: a las 10:00 a. m. para entidades públicas y privadas, organizaciones, familias y ciudadanía, y a las 2:00 p. m. para alcaldías y gobernaciones. Este año se trasladó de septiembre a octubre por el terremoto del 10 de agosto. Ubica la ruta de evacuación de tu bloque y tu punto de encuentro.',
      'Two moments: 10:00 AM for public and private organizations, families and citizens, and 2:00 PM for city and regional governments. This year it moved from September to October because of the August 10 earthquake. Find your building’s evacuation route and meeting point.'
    ),
    interested: 512,
    source: { label: 'Blu Radio · Circular UNGRD 079', url: 'https://www.bluradio.com/nacion/simulacro-nacional-sera-el-proximo-21-de-octubre-se-realizara-en-dos-jornadas-rg10' },
  },
  {
    id: 'e-salud',
    name: b('"Pare Parcero": Semana de la Salud 2026', '"Pare Parcero": 2026 Health Week'),
    category: 'Comunidad',
    institution: 'ucaldas',
    date: '2026-10-19',
    endDate: '2026-10-21',
    time: '',
    location: b('Universidad de Caldas', 'Universidad de Caldas'),
    organizerId: 'org_ucaldas',
    image: photo('ucaldas'),
    description: b(
      'Semana de bienestar y salud de la Universidad de Caldas, con actividades para estudiantes, docentes y personal. Consulta la programación en el portal de la universidad.',
      'Universidad de Caldas wellbeing and health week, with activities for students, faculty and staff. Check the schedule on the university portal.'
    ),
    interested: 97,
    source: { label: 'ucaldas.edu.co', url: 'https://ucaldas.edu.co/portal/' },
  },
  {
    id: 'e-humanismo',
    name: b('Simposio Humanismo y Salud', 'Humanism and Health Symposium'),
    category: 'Académicos',
    institution: 'ucaldas',
    date: '2026-10-23',
    time: '',
    location: b('Universidad de Caldas', 'Universidad de Caldas'),
    organizerId: 'org_ucaldas',
    image: img('photo-1540575467063-178a50c2df87', 1200),
    description: b(
      'Simposio académico de la Universidad de Caldas sobre la dimensión humana del cuidado de la salud. Detalles y agenda en el portal de la universidad.',
      'Universidad de Caldas academic symposium on the human side of healthcare. Details and agenda on the university portal.'
    ),
    interested: 54,
    source: { label: 'ucaldas.edu.co', url: 'https://ucaldas.edu.co/portal/' },
  },
  {
    id: 'e-openmic',
    name: b('Noche acústica a beneficio de familias damnificadas', 'Acoustic night for families affected by the earthquake'),
    category: 'Culturales',
    institution: 'students',
    date: '2026-10-30',
    time: '18:00',
    location: b('Cafetería de la UAM (ilustrativo)', 'UAM cafeteria (illustrative)'),
    organizerId: 'felipe',
    image: img('photo-1501281668745-f7f57925c3b4', 1200),
    description: b(
      'Micrófono abierto para músicos, poetas y artistas de las universidades de Manizales. La entrada es un mercado no perecedero para familias afectadas por el sismo.',
      'Open mic for musicians, poets and artists from Manizales universities. Entry is a non-perishable food donation for families affected by the earthquake.'
    ),
    interested: 76,
    demo: true,
  },
  {
    id: 'e-torneo',
    name: b('Torneo interuniversitario de fútbol sala', 'Inter-university futsal tournament'),
    category: 'Deportes',
    institution: 'students',
    date: '2026-11-03',
    time: '16:00',
    location: b('Coliseo (ilustrativo)', 'Sports arena (illustrative)'),
    organizerId: 'julian',
    image: img('photo-1574629810360-7efbbe195018', 1200),
    description: b(
      'Equipos de 8 jugadores de la UAM, la Nacional y la de Caldas. Fase de grupos y finales con barras de cada universidad.',
      'Teams of 8 players from UAM, the Nacional and U. de Caldas. Group stage and finals with cheering sections from each university.'
    ),
    interested: 154,
    demo: true,
  },
  {
    id: 'e-feria',
    name: b('70ª Feria de Manizales', '70th Manizales Fair'),
    category: 'Culturales',
    institution: 'city',
    date: '2027-01-02',
    endDate: '2027-01-10',
    time: '',
    tentative: true,
    location: b('Manizales', 'Manizales'),
    organizerId: 'org_feria',
    image: photo('catedral'),
    description: b(
      'La feria más tradicional de la ciudad se celebra cada año en los primeros días de enero, con desfiles, conciertos y el Reinado Internacional del Café. Las fechas oficiales de 2027 aún no se han anunciado.',
      "The city's most traditional fair takes place every year in early January, with parades, concerts and the International Coffee Pageant. Official 2027 dates have not been announced yet."
    ),
    interested: 388,
    source: { label: 'Calendario de ferias (Fontur)', url: 'https://calendarioferiasyfiestas.fontur.com.co/en/node/1445' },
  },
  // ----- past events -----
  {
    id: 'e-ling',
    name: b('I Congreso Internacional de Lingüística y Literatura', '1st International Congress of Linguistics and Literature'),
    category: 'Académicos',
    institution: 'ucaldas',
    date: '2026-10-07',
    endDate: '2026-10-09',
    time: '',
    location: b('Universidad de Caldas', 'Universidad de Caldas'),
    organizerId: 'org_ucaldas',
    image: photo('ucaldas'),
    description: b(
      'Primer congreso internacional de lingüística y literatura organizado por la Universidad de Caldas, con ponencias de investigadores y estudiantes.',
      'First international linguistics and literature congress organized by Universidad de Caldas, with talks by researchers and students.'
    ),
    recap: b(
      'Tres días de ponencias sobre lengua, literatura y enseñanza. Para los de Lenguas Modernas, una buena excusa para cruzar la ciudad y conocer otros grupos de investigación.',
      'Three days of talks on language, literature and teaching. For Modern Languages students, a great excuse to cross town and meet other research groups.'
    ),
    interested: 88,
    source: { label: 'ucaldas.edu.co', url: 'https://ucaldas.edu.co/portal/' },
  },
  {
    id: 'e-fit',
    name: b('58° Festival Internacional de Teatro de Manizales', '58th Manizales International Theater Festival'),
    category: 'Culturales',
    institution: 'city',
    date: '2026-09-26',
    endDate: '2026-10-04',
    time: '',
    location: b('Auditorio del Bloque K (U. Nacional), Teatro El Galpón y calles de Manizales', 'Block K Auditorium (U. Nacional), Teatro El Galpón and the streets of Manizales'),
    organizerId: 'org_fit',
    image: img('photo-1503095396549-807759245b35', 1200),
    description: b(
      'Unas 30 agrupaciones de España, Uruguay, Chile, Portugal, México, Brasil, República Dominicana, Argentina y Colombia, con teatro de sala, de calle, infantil y títeres. Abrió con la obra española "Sahara: La barca del desierto" y tuvo en paralelo el 8° Congreso Iberoamericano de Teatro.',
      'About 30 companies from Spain, Uruguay, Chile, Portugal, Mexico, Brazil, the Dominican Republic, Argentina and Colombia, with stage and street theater, children’s shows and puppets. It opened with the Spanish play "Sahara: La barca del desierto", alongside the 8th Ibero-American Theater Congress.'
    ),
    recap: b(
      'A pesar del sismo, se presentaron todas las obras anunciadas. Como la Sala Fundadores del Teatro Los Fundadores quedó cerrada, sus funciones pasaron al Auditorio del Bloque K de la Universidad Nacional.',
      'Despite the earthquake, every announced play went on. Since the Fundadores hall at Teatro Los Fundadores was closed, its shows moved to the Block K Auditorium at the Universidad Nacional.'
    ),
    interested: 430,
    source: { label: 'festivaldemanizales.com', url: 'https://festivaldemanizales.com/' },
  },
  {
    id: 'e-uamfest',
    name: b('UAM Fest Solidario', 'UAM Fest Solidario'),
    category: 'Culturales',
    institution: 'uam',
    date: '2026-09-23',
    time: '07:30',
    location: b('Campus UAM · Antigua Estación del Ferrocarril', 'UAM campus · Old Train Station'),
    organizerId: 'org_uam',
    image: photo('uamAerial'),
    description: b(
      '"Obras son amores y no buenas razones." Un día para encontrarnos y unirnos alrededor de la solidaridad: jornada deportiva, juegos tradicionales, Almuerzo UAM Solidario, Festival Gastronómico Solidario, bingo con el Ensamble de Vientos Enraizados y Talento UAM Solidario.',
      '"Actions speak louder than words." A day to come together around solidarity: sports day, traditional games, UAM Solidarity Lunch, Solidarity Food Festival, bingo with the Ensamble de Vientos Enraizados and UAM Solidarity Talent show.'
    ),
    recap: b(
      'Esta edición del UAM Fest se dedicó a la solidaridad después del terremoto. Las ediciones anteriores tuvieron temática retro (2023) y de las regiones de Colombia (2024).',
      'This UAM Fest edition was dedicated to solidarity after the earthquake. Previous editions had a retro theme (2023) and a Colombian regions theme (2024).'
    ),
    interested: 214,
    source: { label: 'autonoma.edu.co', url: 'https://www.autonoma.edu.co/eventos/uam-fest-solidario' },
  },
  {
    id: 'e-imagen',
    name: b('25° Festival Internacional de la Imagen', '25th International Image Festival'),
    category: 'Culturales',
    institution: 'ucaldas',
    date: '2026-09-11',
    endDate: '2026-09-18',
    time: '',
    location: b('Manizales y Bogotá', 'Manizales and Bogotá'),
    organizerId: 'org_ucaldas',
    image: img('photo-1554907984-15263bfd63bd', 1200),
    description: b(
      'Edición de 25 años del festival de arte, diseño, ciencia y tecnología de la Universidad de Caldas, en alianza con la Universidad Jorge Tadeo Lozano. Tema: "Imágenes que nos piensan", con el eje curatorial SENSO/grafías sobre imagen, cuerpo y archivos vivos en tiempos de inteligencia artificial.',
      "25th anniversary edition of Universidad de Caldas' art, design, science and technology festival, in partnership with Universidad Jorge Tadeo Lozano. Theme: “Images That Think Us”, with the curatorial axis SENSO/graphies on image, body and living archives in the age of artificial intelligence."
    ),
    recap: b(
      'Exposiciones, conferencias, talleres y proyecciones entre Manizales y Bogotá. Para los estudiantes de la U. de Caldas y de la Tadeo, la acreditación fue gratuita.',
      'Exhibitions, talks, workshops and screenings across Manizales and Bogotá. Accreditation was free for U. de Caldas and Tadeo students.'
    ),
    interested: 265,
    source: { label: 'festivaldelaimagen.com', url: 'https://www.festivaldelaimagen.com/' },
  },
  {
    id: 'e-dni',
    name: b('Día del Negociador Internacional (DNI)', 'International Negotiator Day (DNI)'),
    category: 'Emprendimiento',
    institution: 'uam',
    date: '2026-03-18',
    endDate: '2026-03-20',
    time: '',
    tentative: true,
    location: b('Auditorio Mario Calderón Rivera y Parque de los Estudiantes (UAM)', 'Mario Calderón Rivera Auditorium and Students’ Park (UAM)'),
    organizerId: 'org_uam',
    image: photo('uamSede'),
    description: b(
      'Celebración anual del programa de Negocios Internacionales, organizada por estudiantes desde 2017. Su formato incluye una Rueda de Conferencias con egresados, un Desafío Empresarial con una empresa aliada, una Feria Empresarial en el Parque de los Estudiantes, una lunada y una Gala de Reconocimientos.',
      'Annual celebration of the International Business program, run by students since 2017. It includes a Talk Series with alumni, a Business Challenge with a partner company, a Business Fair in the Students’ Park, an evening get-together and an Awards Gala.'
    ),
    recap: b(
      'En la edición de 2025 (la novena, por los 15 años del programa) la Feria Empresarial reunió a más de 38 emprendimientos. La fecha exacta de 2026 aquí es aproximada.',
      'At the 2025 edition (the ninth, for the program’s 15th anniversary) the Business Fair brought together more than 38 ventures. The exact 2026 date shown here is approximate.'
    ),
    interested: 172,
    source: { label: 'autonoma.edu.co (edición 2025)', url: 'https://www.autonoma.edu.co/blog/noticias/la-uam-celebra-con-exito-el-noveno-dia-del-negociador-internacional' },
  },
];

// ======================= POSTS (fictional people, real context) =======================
export const initialPosts = [
  {
    id: 'post-sim',
    authorId: 'laura',
    type: 'evento',
    text: b(
      'Hoy es el Simulacro Nacional 🚨 Primer momento a las 10:00 a. m. y el segundo a las 2:00 p. m. Este año lo movieron de septiembre a octubre por el terremoto del 10 de agosto, así que tomémoslo en serio: ubiquen la ruta de evacuación de su bloque y el punto de encuentro 🙏',
      "Today is the National Drill 🚨 First moment at 10:00 AM and the second at 2:00 PM. This year it moved from September to October because of the August 10 earthquake, so let's take it seriously: find your building's evacuation route and meeting point 🙏"
    ),
    image: null,
    ref: { kind: 'event', id: 'e-sim' },
    likes: 143,
    shares: 58,
    createdAt: at('2026-10-21', '07:45'),
    comments: [
      { id: 'c1', authorId: 'daniela', text: b('En Fisioterapia nos dijeron que salimos por la escalera del lado del parque.', 'In Physical Therapy we were told to use the stairs on the park side.'), createdAt: at('2026-10-21', '08:02') },
      { id: 'c2', authorId: 'mateo', text: b('En la Nacional también participamos. Después de agosto nadie se lo toma a chiste.', "We're taking part at the Nacional too. After August nobody takes it lightly."), createdAt: at('2026-10-21', '08:20') },
    ],
  },
  {
    id: 'post-sazon',
    authorId: 'daniela',
    type: 'emprendimiento',
    text: b(
      'Hoy en Sazón de Casa: ajiaco con arroz, aguacate y jugo de mora 🍲 Quedan 12 almuerzos. Pedidos antes de las 10:00 a. m. (¡antes del simulacro!) con entrega en la portería de la UAM.',
      "Today at Sazón de Casa: ajiaco with rice, avocado and blackberry juice 🍲 12 lunches left. Order before 10:00 AM (before the drill!) for pickup at the UAM gate."
    ),
    image: img('photo-1504674900247-0877df9cc836', 1200),
    ref: { kind: 'service', id: 's7' },
    likes: 57,
    shares: 9,
    createdAt: at('2026-10-21', '07:10'),
    comments: [],
  },
  {
    id: 'post-salud',
    authorId: 'isabella',
    type: 'evento',
    text: b(
      'En la U. de Caldas arrancó "Pare Parcero", la Semana de la Salud 2026 💚 Va hasta hoy, así que si están por la sede central pasen por las actividades de bienestar.',
      'At U. de Caldas, "Pare Parcero", the 2026 Health Week, is on 💚 It runs until today, so if you’re near the main campus, stop by the wellbeing activities.'
    ),
    image: photo('ucaldas'),
    ref: { kind: 'event', id: 'e-salud' },
    likes: 38,
    shares: 6,
    createdAt: at('2026-10-20', '12:10'),
    comments: [],
  },
  {
    id: 'post-dni',
    authorId: 'camila',
    type: 'emprendimiento',
    text: b(
      'En Negocios Internacionales ya estamos pensando en el próximo Día del Negociador Internacional 🌎 Si tienen emprendimiento y quieren estar en la Feria Empresarial del Parque de los Estudiantes, escríbanme y los anoto en la lista de interesados.',
      "In International Business we're already planning the next International Negotiator Day 🌎 If you have a business and want a spot at the Business Fair in the Students' Park, message me and I'll add you to the list."
    ),
    image: photo('uamSede'),
    ref: { kind: 'event', id: 'e-dni' },
    likes: 49,
    shares: 11,
    createdAt: at('2026-10-20', '15:00'),
    comments: [
      { id: 'c3', authorId: 'mariana', text: b('¡Dulce Campus se apunta! 🧁', 'Dulce Campus is in! 🧁'), createdAt: at('2026-10-20', '15:24') },
    ],
  },
  {
    id: 'post-feria',
    authorId: 'julian',
    type: 'evento',
    text: b(
      '¿Ya cuadraron plan para la Feria de Manizales en enero? Sería la edición 70 🎉 Todavía no hay fechas oficiales, pero ya estoy contando los días.',
      "Got plans for the Manizales Fair in January yet? It'd be the 70th edition 🎉 No official dates yet, but I'm already counting the days."
    ),
    image: photo('catedral'),
    ref: { kind: 'event', id: 'e-feria' },
    likes: 91,
    shares: 14,
    createdAt: at('2026-10-19', '21:30'),
    comments: [],
  },
  {
    id: 'post-laptop',
    authorId: 'santiago',
    type: 'producto',
    text: b(
      'Vendo mi ThinkPad T480 porque me pasé a un equipo de escritorio. 16 GB de RAM, batería con buena duración y corre todo lo de Sistemas. Se puede probar en la sala de cómputo antes de comprar 👇',
      "Selling my ThinkPad T480 because I switched to a desktop. 16 GB RAM, good battery and runs everything for Systems Engineering. You can try it in the computer lab before buying 👇"
    ),
    image: img('photo-1496181133206-80ce9b88a853', 1200),
    ref: { kind: 'product', id: 'p1' },
    likes: 34,
    shares: 4,
    createdAt: at('2026-10-18', '11:40'),
    comments: [{ id: 'c4', authorId: 'tomas', text: b('¿Le sirve para correr MATLAB?', 'Can it run MATLAB?'), createdAt: at('2026-10-18', '12:05') }],
  },
  {
    id: 'post-llaves',
    authorId: 'felipe',
    type: 'general',
    text: b(
      'Encontré unas llaves con un llavero azul de Totoro en el Parque de los Estudiantes de la UAM. Las dejé en la portería principal. ¡Compartan para que lleguen a su dueño! 🔑',
      "I found some keys with a blue Totoro keychain in UAM's Students' Park. I left them at the main gate. Share so they get back to their owner! 🔑"
    ),
    image: null,
    likes: 23,
    shares: 15,
    createdAt: at('2026-10-16', '13:15'),
    comments: [],
  },
  {
    id: 'post-foro',
    authorId: 'andres',
    type: 'evento',
    text: b(
      'Último llamado: las inscripciones al XXIX Foro de Investigación UAM cierran este viernes 16 de octubre a las 11:59 p. m. El foro es del 11 al 13 de noviembre, híbrido y sin costo, y este año va con la Red Universitaria Mutis. Yo presento ponencia en "Agua y cambio climático" 🤞',
      'Last call: registration for the XXIX UAM Research Forum closes this Friday, October 16 at 11:59 PM. The forum runs November 11–13, hybrid and free, together with the Mutis University Network this year. I’m presenting in the "Water and climate change" track 🤞'
    ),
    image: photo('uamFacade'),
    ref: { kind: 'event', id: 'e-foro' },
    likes: 62,
    shares: 19,
    createdAt: at('2026-10-14', '16:30'),
    comments: [
      { id: 'c5', authorId: 'laura', text: b('¡Éxitos! El 23 salen los resultados de aceptación, ¿no?', 'Good luck! Acceptance results come out on the 23rd, right?'), createdAt: at('2026-10-14', '17:02') },
      { id: 'c6', authorId: 'andres', text: b('Sí, el viernes 23. Nervios 😅', 'Yes, Friday the 23rd. Nervous 😅'), createdAt: at('2026-10-14', '17:10') },
    ],
  },
  {
    id: 'post-hack',
    authorId: 'mateo',
    type: 'evento',
    text: b(
      'La Nacional sede Manizales hace una Hackathon el 20 y 21 de noviembre para buscar soluciones tras el sismo: vivienda, infraestructura, servicios públicos, movilidad y gestión del riesgo. Está abierta a estudiantes de varias universidades. Busco gente de la UAM y de la de Caldas para armar equipo interdisciplinario 💻🏗️',
      'The Nacional in Manizales is hosting a Hackathon on November 20–21 to find solutions after the earthquake: housing, infrastructure, public services, mobility and risk management. It’s open to students from several universities. Looking for people from UAM and U. de Caldas for an interdisciplinary team 💻🏗️'
    ),
    image: photo('unalPalogrande'),
    ref: { kind: 'event', id: 'e-hack' },
    likes: 118,
    shares: 47,
    createdAt: at('2026-10-12', '19:05'),
    comments: [
      { id: 'c7', authorId: 'santiago', text: b('¡Me apunto! Me encargo del software.', "I'm in! I'll handle the software."), createdAt: at('2026-10-12', '19:30') },
      { id: 'c8', authorId: 'isabella', text: b('Si necesitan diseño e ilustración para el pitch, cuenten conmigo.', 'If you need design and illustration for the pitch, count me in.'), createdAt: at('2026-10-12', '20:12') },
    ],
  },
  {
    id: 'post-cafe',
    authorId: 'tomas',
    type: 'emprendimiento',
    text: b(
      'Les presento Café Ladera ☕ Café especial que cultiva mi familia en Chinchiná. Esta semana, bolsas de 250 g con 10% de descuento para la comunidad universitaria.',
      'Meet Café Ladera ☕ Specialty coffee my family grows in Chinchiná. This week, 250 g bags at 10% off for the university community.'
    ),
    image: img('photo-1509042239860-f550ce710b93', 1200),
    ref: { kind: 'service', id: 's10' },
    likes: 72,
    shares: 10,
    createdAt: at('2026-10-10', '09:30'),
    comments: [],
  },
  {
    id: 'post-logo',
    authorId: 'valentina',
    type: 'servicio',
    text: b(
      '¿Tienes emprendimiento y todavía no tienes logo? Abrí cupos para diseñar identidad visual a emprendedores de las universidades de Manizales. Precio especial para estudiantes ✨',
      'Have a business but no logo yet? I opened spots to design brand identities for student entrepreneurs across Manizales universities. Special student pricing ✨'
    ),
    image: img('photo-1561070791-2526d30994b5', 1200),
    ref: { kind: 'service', id: 's3' },
    likes: 41,
    shares: 6,
    createdAt: at('2026-10-07', '18:00'),
    comments: [{ id: 'c9', authorId: 'camila', text: b('Me encantó el que le hiciste a Hilo & Barro 😍', 'Loved the one you made for Hilo & Barro 😍'), createdAt: at('2026-10-07', '18:40') }],
  },
  {
    id: 'post-fit',
    authorId: 'felipe',
    type: 'evento',
    text: b(
      'Se acabó el 58° Festival Internacional de Teatro 🎭 Vi "Sahara: La barca del desierto", la obra con la que abrió. Como la Sala Fundadores sigue cerrada después del sismo, varias funciones pasaron al Auditorio del Bloque K de la Nacional y al Teatro El Galpón… y aun así se presentaron todas las obras anunciadas. Qué orgullo de ciudad.',
      'The 58th International Theater Festival is over 🎭 I saw "Sahara: La barca del desierto", the opening play. Since the Fundadores hall is still closed after the earthquake, several shows moved to the Block K Auditorium at the Nacional and to Teatro El Galpón… and every announced play still went on. So proud of this city.'
    ),
    image: img('photo-1503095396549-807759245b35', 1200),
    ref: { kind: 'event', id: 'e-fit' },
    likes: 156,
    shares: 22,
    createdAt: at('2026-10-05', '10:20'),
    comments: [
      { id: 'c10', authorId: 'isabella', text: b('Yo fui a las de calle, ¡increíbles los títeres!', 'I went to the street shows, the puppets were amazing!'), createdAt: at('2026-10-05', '11:00') },
    ],
  },
  {
    id: 'post-cable',
    authorId: 'laura',
    type: 'general',
    text: b('Volviendo a casa en el Cable Aéreo después de clase ☁️ Manizales, cómo no quererte.', 'Riding the cable car home after class ☁️ Manizales, how could I not love you.'),
    image: photo('cableCar'),
    likes: 88,
    shares: 3,
    createdAt: at('2026-09-30', '18:10'),
    comments: [],
  },
  {
    id: 'post-uamfest',
    authorId: 'mariana',
    type: 'emprendimiento',
    text: b(
      'Gracias a todos los que pasaron por el Festival Gastronómico Solidario del UAM Fest Solidario 💛 Dulce Campus vendió todo antes de las 2:00 p. m. "Obras son amores y no buenas razones" ✨',
      "Thanks to everyone who stopped by the Solidarity Food Festival at UAM Fest Solidario 💛 Dulce Campus sold out before 2:00 PM. “Actions speak louder than words” ✨"
    ),
    image: photo('uamAerial'),
    ref: { kind: 'event', id: 'e-uamfest' },
    likes: 128,
    shares: 21,
    createdAt: at('2026-09-24', '09:00'),
    comments: [
      { id: 'c11', authorId: 'daniela', text: b('¡El almuerzo solidario estuvo delicioso!', 'The solidarity lunch was delicious!'), createdAt: at('2026-09-24', '09:35') },
      { id: 'c12', authorId: 'julian', text: b('La jornada deportiva quedó buenísima ⚽', 'The sports day was awesome ⚽'), createdAt: at('2026-09-24', '10:10') },
    ],
  },
  {
    id: 'post-imagen',
    authorId: 'valentina',
    type: 'evento',
    text: b(
      'Fui al Festival Internacional de la Imagen de la U. de Caldas, que cumplió 25 años 🎨 El tema, "Imágenes que nos piensan", gira alrededor del cuerpo, los archivos vivos y la inteligencia artificial. Salí con mil ideas para mi proyecto de grado.',
      'I went to U. de Caldas’ International Image Festival, which turned 25 🎨 This year’s theme, “Images That Think Us”, is about the body, living archives and artificial intelligence. I left with a thousand ideas for my thesis project.'
    ),
    image: img('photo-1554907984-15263bfd63bd', 1200),
    ref: { kind: 'event', id: 'e-imagen' },
    likes: 67,
    shares: 8,
    createdAt: at('2026-09-19', '18:40'),
    comments: [],
  },
  {
    id: 'post-voluntarios',
    authorId: 'mateo',
    type: 'general',
    text: b(
      'Orgulloso de mi U: en la Nacional sede Manizales más de 240 voluntarios estamos apoyando a los damnificados del terremoto del 10 de agosto. Si quieren ayudar, pregunten en su universidad por los puntos de acopio. Manizales se levanta 🤝',
      "Proud of my university: at the Nacional in Manizales more than 240 of us are volunteering to support people affected by the August 10 earthquake. If you want to help, ask your university about donation points. Manizales rises again 🤝"
    ),
    image: photo('unalCable'),
    likes: 304,
    shares: 96,
    createdAt: at('2026-08-23', '20:15'),
    comments: [
      { id: 'c13', authorId: 'laura', text: b('Gracias por lo que hacen 💛', 'Thank you for what you do 💛'), createdAt: at('2026-08-23', '20:40') },
    ],
  },
].sort((a, z) => z.createdAt - a.createdAt);

export const initialNotifications = [
  { id: 'n1', personId: 'laura', createdAt: minutesAgo(12), read: false, text: b('te etiquetó: Simulacro Nacional hoy a las 10:00 a. m.', 'tagged you: National Drill today at 10:00 AM.') },
  { id: 'n2', personId: 'mateo', createdAt: minutesAgo(50), read: false, text: b('te invitó a su equipo para la Hackathon UNAL.', 'invited you to his UNAL Hackathon team.') },
  { id: 'n3', personId: 'andres', createdAt: minutesAgo(60 * 4), read: false, text: b('comentó: "¿Vas a ir al XXIX Foro de Investigación?"', 'commented: "Are you going to the XXIX Research Forum?"') },
  { id: 'n4', personId: 'isabella', createdAt: minutesAgo(60 * 20), read: true, text: b('reaccionó a tu historia.', 'reacted to your story.') },
];

export const initialConversations = [
  {
    id: 'conv1',
    personId: 'camila',
    itemRef: { kind: 'product', id: 'p5' },
    topic: b('Morral antirrobo para portátil', 'Anti-theft laptop backpack'),
    messages: [
      { from: 'them', text: b('¡Hola! Sí, el morral todavía está disponible 😊', 'Hi! Yes, the backpack is still available 😊'), at: minutesAgo(50) },
      { from: 'them', text: b('¿Te sirve vernos mañana en la estación Fundadores del Cable?', 'Can we meet tomorrow at the Fundadores cable car station?'), at: minutesAgo(49) },
    ],
    unread: true,
  },
  {
    id: 'conv2',
    personId: 'andres',
    itemRef: { kind: 'service', id: 's1' },
    topic: b('Tutorías de Cálculo', 'Calculus tutoring'),
    messages: [
      { from: 'me', text: b('Hola Andrés, ¿tienes cupo el jueves?', 'Hi Andrés, do you have a spot on Thursday?'), at: minutesAgo(60 * 3) },
      { from: 'them', text: b('Sí, a las 3:00 p. m. en la biblioteca de la UAM. ¿Te sirve?', 'Yes, at 3:00 PM at the UAM library. Does that work?'), at: minutesAgo(60 * 2.5) },
    ],
    unread: false,
  },
];

export const SIMULATED_REPLIES = [
  b('¡Hola! Gracias por escribir. Sí, todavía está disponible 😊', 'Hi! Thanks for writing. Yes, it is still available 😊'),
  b('Claro que sí. ¿Te queda bien vernos en el campus?', 'Sure! Would meeting on campus work for you?'),
  b('¡Perfecto! Te confirmo por aquí apenas pueda.', "Perfect! I'll confirm here as soon as I can."),
  b('Con gusto te doy más detalles. ¿Qué te gustaría saber?', "Happy to give you more details. What would you like to know?"),
];

// ======================= STORIES (Instagram-style, last 24 h) =======================
export const STORY_BACKGROUNDS = {
  gold: { css: 'linear-gradient(160deg, #FFE27A 0%, #F5B21B 60%, #E8862A 100%)', ink: true },
  sunset: { css: 'linear-gradient(160deg, #F5A524 0%, #EF5D3A 55%, #B8306F 100%)', ink: false },
  plum: { css: 'linear-gradient(160deg, #2B1748 0%, #6B2E86 55%, #C2368C 100%)', ink: false },
  night: { css: 'linear-gradient(160deg, #121117 0%, #2A2833 60%, #4A4552 100%)', ink: false },
  mint: { css: 'linear-gradient(160deg, #1E7F5C 0%, #3FB27F 55%, #B9E6C9 100%)', ink: false },
};

export const initialStories = [
  {
    personId: 'laura',
    items: [
      {
        id: 'st1',
        bg: 'gold',
        text: b('Hoy 10:00 a. m. 🚨\nSimulacro Nacional\n¿Ya sabes cuál es tu punto de encuentro?', 'Today 10:00 AM 🚨\nNational Drill\nDo you know your meeting point?'),
        ref: { kind: 'event', id: 'e-sim' },
        createdAt: minutesAgo(25),
      },
    ],
  },
  {
    personId: 'mateo',
    items: [
      {
        id: 'st2',
        image: photo('unalPalogrande'),
        text: b('Armando equipo para la Hackathon 💻', 'Building a team for the Hackathon 💻'),
        ref: { kind: 'event', id: 'e-hack' },
        createdAt: minutesAgo(70),
      },
      {
        id: 'st3',
        bg: 'plum',
        text: b('Buscamos:\n1 diseñador(a)\n1 ingeniero(a) civil\n1 de sistemas 👀', 'Looking for:\n1 designer\n1 civil engineer\n1 software dev 👀'),
        createdAt: minutesAgo(68),
      },
    ],
  },
  {
    personId: 'mariana',
    items: [
      {
        id: 'st4',
        image: img('photo-1606313564200-e75d5e30476c', 800),
        text: b('Quedan 4 cajas de brownies para hoy', '4 boxes of brownies left for today'),
        ref: { kind: 'product', id: 'p11' },
        createdAt: minutesAgo(95),
      },
    ],
  },
  {
    personId: 'isabella',
    items: [
      {
        id: 'st5',
        image: photo('ucaldas'),
        text: b('Último día de la Semana de la Salud 💚', 'Last day of Health Week 💚'),
        ref: { kind: 'event', id: 'e-salud' },
        createdAt: minutesAgo(130),
      },
    ],
  },
  {
    personId: 'andres',
    items: [
      {
        id: 'st6',
        image: photo('uamFacade'),
        text: b('Ponencia lista para el XXIX Foro 📑', 'Paper ready for the XXIX Forum 📑'),
        ref: { kind: 'event', id: 'e-foro' },
        createdAt: minutesAgo(190),
      },
    ],
  },
  {
    personId: 'felipe',
    items: [
      {
        id: 'st7',
        image: photo('chipreCity'),
        text: b('Atardecer desde Chipre 🧡', 'Sunset from Chipre 🧡'),
        createdAt: minutesAgo(60 * 9),
      },
      {
        id: 'st8',
        image: photo('zeri'),
        text: b('Sesión de grados en el Recinto del Pensamiento 📸', 'Graduation shoot at Recinto del Pensamiento 📸'),
        ref: { kind: 'service', id: 's4' },
        createdAt: minutesAgo(60 * 8),
      },
    ],
  },
  {
    personId: 'camila',
    items: [
      {
        id: 'st9',
        bg: 'sunset',
        text: b('¿Emprendes? 🌎\nArmando la lista para la Feria Empresarial del próximo DNI', 'Run a business? 🌎\nBuilding the list for the next DNI Business Fair'),
        ref: { kind: 'event', id: 'e-dni' },
        createdAt: minutesAgo(60 * 11),
      },
    ],
  },
  {
    personId: 'daniela',
    items: [
      {
        id: 'st10',
        image: img('photo-1504674900247-0877df9cc836', 800),
        text: b('Menú de hoy en Sazón de Casa 🍲', "Today's menu at Sazón de Casa 🍲"),
        ref: { kind: 'service', id: 's7' },
        createdAt: minutesAgo(60 * 3),
      },
    ],
  },
  {
    personId: 'tomas',
    items: [
      {
        id: 'st11',
        image: img('photo-1509042239860-f550ce710b93', 800),
        text: b('Café Ladera: 10% de descuento esta semana ☕', 'Café Ladera: 10% off this week ☕'),
        ref: { kind: 'service', id: 's10' },
        createdAt: minutesAgo(60 * 14),
      },
    ],
  },
  {
    personId: 'julian',
    items: [
      {
        id: 'st12',
        image: img('photo-1574629810360-7efbbe195018', 800),
        text: b('Entrenando para el torneo interuniversitario ⚽', 'Training for the inter-university tournament ⚽'),
        ref: { kind: 'event', id: 'e-torneo' },
        createdAt: minutesAgo(60 * 16),
      },
    ],
  },
];
