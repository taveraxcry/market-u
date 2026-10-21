// Datos de ejemplo del prototipo Market U, en español e inglés.
// Todas las personas, publicaciones y eventos son ficticios.

const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const minutesAgo = (m) => Date.now() - m * 60 * 1000;
const b = (es, en) => ({ es, en });

export const DEMO_CREDENTIALS = { email: 'demo@marketu.app', password: 'MarketU2026' };

export const UNIVERSITIES = [
  { id: 'uam', name: 'Universidad Autónoma de Manizales', available: true },
  { id: 'otras', nameKey: 'auth.otherUniversities', available: false },
];

const CAMPUS = b('Entrega en el campus', 'Campus pickup');

export const PEOPLE = {
  valentina: { id: 'valentina', name: 'Valentina Ríos', program: b('Diseño Visual', 'Visual Design'), color: '#7C3AED' },
  santiago: { id: 'santiago', name: 'Santiago Cardona', program: b('Ingeniería de Sistemas', 'Systems Engineering'), color: '#0E7C86' },
  mariana: { id: 'mariana', name: 'Mariana Ocampo', program: b('Administración de Empresas', 'Business Administration'), color: '#DB2777' },
  julian: { id: 'julian', name: 'Julián Henao', program: b('Ingeniería Mecatrónica', 'Mechatronics Engineering'), color: '#2F7D6D' },
  camila: { id: 'camila', name: 'Camila Arango', program: b('Negocios Internacionales', 'International Business'), color: '#EA580C' },
  andres: { id: 'andres', name: 'Andrés Salazar', program: b('Economía', 'Economics'), color: '#059669' },
  daniela: { id: 'daniela', name: 'Daniela Giraldo', program: b('Fisioterapia', 'Physical Therapy'), color: '#E11D48' },
  tomas: { id: 'tomas', name: 'Tomás Villegas', program: b('Ingeniería Biomédica', 'Biomedical Engineering'), color: '#5B3FA0' },
  laura: { id: 'laura', name: 'Laura Montoya', program: b('Lenguas Modernas', 'Modern Languages'), color: '#CA8A04' },
  felipe: { id: 'felipe', name: 'Felipe Zuluaga', program: b('Comunicación Social', 'Communications'), color: '#0D9488' },
  clubs: {
    id: 'clubs',
    name: 'Comité Estudiantil de Eventos',
    program: b('Organización estudiantil (ficticia)', 'Student organization (fictional)'),
    color: '#2B2833',
  },
};

export const PRODUCT_CATEGORIES = ['Tecnología', 'Libros y estudio', 'Ropa y accesorios', 'Hogar', 'Deportes', 'Comida', 'Otros'];
export const SERVICE_CATEGORIES = ['Tutorías', 'Diseño', 'Fotografía y video', 'Tecnología', 'Comida', 'Repostería', 'Artesanías', 'Otros'];
export const EVENT_CATEGORIES = ['Académicos', 'Culturales', 'Sociales', 'Deportes', 'Emprendimiento'];
export const CONDITIONS = ['new', 'likeNew', 'goodUsed', 'wornUsed'];
export const CONTACT_OPTIONS = ['market', 'campus', 'virtual'];

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
      'Intel Core i5 de octava generación, 16 GB de RAM y SSD de 512 GB. Batería dura unas 5 horas. Ideal para programar, hacer trabajos y clases virtuales. Incluye cargador original.',
      '8th-gen Intel Core i5, 16 GB RAM and 512 GB SSD. Battery lasts about 5 hours. Great for coding, assignments and online classes. Original charger included.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(95),
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
      'La usé solo un semestre para Cálculo Diferencial. Funciona perfecto, con estuche y manual. Permitida en la mayoría de parciales.',
      'I only used it for one semester of Differential Calculus. Works perfectly, comes with case and manual. Allowed in most exams.'
    ),
    location: b('Biblioteca o cafetería', 'Library or cafeteria'),
    createdAt: minutesAgo(240),
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
      'Paquete de dos libros: Cálculo de una variable de Stewart y Física para ciencias e ingeniería de Serway. Tienen algunos subrayados a lápiz.',
      "Bundle of two books: Stewart's Single Variable Calculus and Serway's Physics for Scientists and Engineers. Some pencil highlighting."
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 8),
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
      'Bluetooth, hasta 50 horas de batería. Perfectos para estudiar en la biblioteca. Los vendo porque me regalaron otros.',
      'Bluetooth, up to 50 hours of battery. Perfect for studying in the library. Selling them because I got another pair as a gift.'
    ),
    location: b('Bloque de ingenierías', 'Engineering building'),
    createdAt: minutesAgo(60 * 20),
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
      'Compartimento acolchado para portátil de hasta 15.6", puerto USB externo y cierre oculto. Resistente a la lluvia, ideal para el clima de Manizales.',
      'Padded compartment for laptops up to 15.6", external USB port and hidden zipper. Rain-resistant, perfect for Manizales weather.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 26),
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
      'Accesorios hechos a mano con mostacilla y piedras naturales. Hay diseños personalizados con tus colores favoritos. Precio por unidad.',
      'Handmade accessories with beads and natural stones. Custom designs in your favorite colors available. Price per item.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 30),
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
      'Bicicleta de 21 cambios con frenos en buen estado. Llantas nuevas. Incluye candado y luz trasera.',
      '21-speed bike with brakes in good shape. New tires. Lock and rear light included.'
    ),
    location: b('Barrio Palermo', 'Palermo neighborhood'),
    createdAt: minutesAgo(60 * 48),
  },
  {
    id: 'p8',
    title: b('Lámpara de escritorio LED', 'LED desk lamp'),
    price: 45000,
    category: 'Hogar',
    condition: 'likeNew',
    sellerId: 'laura',
    image: img('photo-1507473885765-e6ed057f782c'),
    description: b(
      'Tres niveles de intensidad y luz cálida o fría. Cuello flexible. Perfecta para estudiar de noche.',
      'Three brightness levels and warm or cool light. Flexible neck. Perfect for late-night studying.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 52),
  },
  {
    id: 'p9',
    title: b('Tenis deportivos talla 40', 'Running shoes, size 40'),
    price: 120000,
    category: 'Ropa y accesorios',
    condition: 'goodUsed',
    sellerId: 'daniela',
    image: img('photo-1542291026-7eec264c27ff'),
    description: b(
      'Usados pocas veces, muy cómodos para correr o ir al gimnasio. Talla 40 colombiana.',
      'Only worn a few times, very comfortable for running or the gym. Colombian size 40.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 70),
  },
  {
    id: 'p10',
    title: b('Monitor de 24 pulgadas Full HD', '24-inch Full HD monitor'),
    price: 380000,
    category: 'Tecnología',
    condition: 'goodUsed',
    sellerId: 'santiago',
    image: img('photo-1527443224154-c4a3942d3acf'),
    description: b(
      'Monitor IPS de 24", entrada HDMI. Muy buen estado, sin píxeles muertos. Incluye cable HDMI.',
      '24" IPS monitor with HDMI input. Very good condition, no dead pixels. HDMI cable included.'
    ),
    location: b('Barrio La Enea', 'La Enea neighborhood'),
    createdAt: minutesAgo(60 * 90),
  },
  {
    id: 'p11',
    title: b('Caja de brownies x6', 'Box of 6 brownies'),
    price: 18000,
    category: 'Comida',
    condition: null,
    sellerId: 'mariana',
    image: img('photo-1606313564200-e75d5e30476c'),
    description: b(
      'Brownies de chocolate con nueces, hechos el mismo día. Pedidos con un día de anticipación.',
      'Chocolate walnut brownies, baked the same day. Order one day in advance.'
    ),
    location: b('Entrega en la cafetería', 'Cafeteria pickup'),
    createdAt: minutesAgo(60 * 3),
  },
  {
    id: 'p12',
    title: b('Bata de laboratorio talla M', 'Lab coat, size M'),
    price: 40000,
    category: 'Otros',
    condition: 'goodUsed',
    sellerId: 'tomas',
    image: null,
    description: b(
      'Bata blanca manga larga, antifluidos. Usada para laboratorios de química y biología.',
      'White long-sleeve, fluid-resistant coat. Used for chemistry and biology labs.'
    ),
    location: CAMPUS,
    createdAt: minutesAgo(60 * 100),
  },
];

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
      'Te ayudo a preparar parciales de Cálculo Diferencial, Integral y Álgebra Lineal. Sesiones presenciales en la biblioteca o virtuales. Grupos de hasta 4 personas.',
      'I help you prepare for Differential and Integral Calculus and Linear Algebra exams. In-person sessions at the library or online. Groups of up to 4 people.'
    ),
    contact: 'market',
    rating: 4.9,
  },
  {
    id: 's2',
    kind: 'servicio',
    name: b('Clases de inglés conversacional', 'Conversational English classes'),
    category: 'Tutorías',
    providerId: 'laura',
    priceLabel: b('Desde $ 30.000 / hora', 'From $ 30.000 / hour'),
    image: img('photo-1503676260728-1c00da094a0b'),
    description: b(
      'Practica speaking con actividades dinámicas. Preparación para exámenes de suficiencia y entrevistas. Niveles A2 a B2.',
      'Practice speaking with fun activities. Preparation for proficiency exams and interviews. Levels A2 to B2.'
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
      'Diseño de logo, paleta de colores y piezas para redes sociales para emprendimientos estudiantiles. Entrega en 5 días hábiles.',
      'Logo, color palette and social media graphics for student businesses. Delivered in 5 business days.'
    ),
    contact: 'market',
    rating: 5.0,
  },
  {
    id: 's4',
    kind: 'servicio',
    name: b('Fotografía de grados y eventos', 'Graduation and event photography'),
    category: 'Fotografía y video',
    providerId: 'felipe',
    priceLabel: b('Desde $ 120.000', 'From $ 120.000'),
    image: img('photo-1516035069371-29a1b244cc32'),
    description: b(
      'Sesiones de fotos para grados, perfiles profesionales y eventos estudiantiles. Incluye edición básica y entrega digital.',
      'Photo sessions for graduations, professional headshots and student events. Basic editing and digital delivery included.'
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
    description: b(
      'Reels, TikToks y videos para proyectos de clase. Subtítulos, música y transiciones. Entregas rápidas.',
      'Reels, TikToks and videos for class projects. Subtitles, music and transitions. Fast turnaround.'
    ),
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
    description: b(
      'Formateo, limpieza interna, cambio de pasta térmica, instalación de programas y ampliación de RAM o SSD.',
      'OS reinstall, internal cleaning, thermal paste replacement, software installation and RAM or SSD upgrades.'
    ),
    contact: 'campus',
    rating: 4.8,
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
      'Almuerzos caseros de lunes a viernes: sopa, seco y jugo natural. Pedidos antes de las 10:00 a. m. con entrega en el campus.',
      'Home-cooked lunches Monday to Friday: soup, main dish and fresh juice. Order before 10:00 AM for campus delivery.'
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
    description: b(
      'Tortas, cupcakes, brownies y postres personalizados para cumpleaños y celebraciones. Pedidos con anticipación.',
      'Cakes, cupcakes, brownies and custom desserts for birthdays and celebrations. Order in advance.'
    ),
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
    description: b(
      'Macetas de cerámica, llaveros tejidos y regalos hechos a mano. Cada pieza es única.',
      'Ceramic planters, knitted keychains and handmade gifts. Every piece is unique.'
    ),
    contact: 'market',
    rating: 4.8,
  },
  {
    id: 's10',
    kind: 'emprendimiento',
    name: b('Café Ladera — Café de origen', 'Café Ladera — Single-origin coffee'),
    category: 'Comida',
    providerId: 'tomas',
    priceLabel: b('Desde $ 22.000', 'From $ 22.000'),
    image: img('photo-1509042239860-f550ce710b93'),
    description: b(
      'Café especial cultivado por mi familia en Caldas. Bolsas de 250 g y 500 g, en grano o molido.',
      'Specialty coffee grown by my family in Caldas. 250 g and 500 g bags, whole bean or ground.'
    ),
    contact: 'campus',
    rating: 4.9,
  },
];

export const initialEvents = [
  {
    id: 'e1',
    name: b('UAM Fest', 'UAM Fest'),
    category: 'Culturales',
    date: '2026-11-14',
    time: '14:00',
    location: b('Campus universitario (ubicación ilustrativa)', 'University campus (illustrative location)'),
    organizerId: 'clubs',
    image: img('photo-1470229722913-7c0e2dbbafd3', 1200),
    description: b(
      'Una tarde de música en vivo, comida de emprendimientos estudiantiles, juegos y actividades culturales para toda la comunidad. Evento de ejemplo para mostrar cómo se publicarían los eventos en Market U.',
      'An afternoon of live music, food from student businesses, games and cultural activities for the whole community. A sample event showing how events would be posted on Market U.'
    ),
    interested: 214,
    demo: true,
    featured: true,
  },
  {
    id: 'e2',
    name: b('Feria de Emprendimiento Estudiantil', 'Student Entrepreneurship Fair'),
    category: 'Emprendimiento',
    date: '2026-11-06',
    time: '09:00',
    location: b('Plazoleta central (ilustrativa)', 'Central plaza (illustrative)'),
    organizerId: 'mariana',
    image: img('photo-1533900298318-6b8da08a523e', 1200),
    description: b(
      'Más de 30 emprendimientos estudiantiles muestran sus productos y servicios. Habrá charlas cortas sobre cómo validar una idea de negocio.',
      'More than 30 student businesses showcase their products and services. Includes short talks on how to validate a business idea.'
    ),
    interested: 132,
    demo: true,
  },
  {
    id: 'e3',
    name: b('Congreso de Innovación y Tecnología', 'Innovation & Technology Conference'),
    category: 'Académicos',
    date: '2026-11-20',
    time: '08:00',
    location: b('Auditorio principal (ilustrativo)', 'Main auditorium (illustrative)'),
    organizerId: 'santiago',
    image: img('photo-1540575467063-178a50c2df87', 1200),
    description: b(
      'Conferencias sobre inteligencia artificial, salud digital y desarrollo sostenible, con espacios para presentar proyectos de investigación estudiantil.',
      'Talks on artificial intelligence, digital health and sustainable development, with space to present student research projects.'
    ),
    interested: 98,
    demo: true,
  },
  {
    id: 'e4',
    name: b('Noche Acústica: Open Mic', 'Acoustic Night: Open Mic'),
    category: 'Culturales',
    date: '2026-10-30',
    time: '18:00',
    location: b('Cafetería central (ilustrativa)', 'Main cafeteria (illustrative)'),
    organizerId: 'felipe',
    image: img('photo-1501281668745-f7f57925c3b4', 1200),
    description: b(
      'Trae tu guitarra, tu poesía o tu voz. Micrófono abierto para músicos y artistas de la comunidad universitaria.',
      'Bring your guitar, your poetry or your voice. Open mic for musicians and artists from the university community.'
    ),
    interested: 76,
    demo: true,
  },
  {
    id: 'e5',
    name: b('Torneo Interfacultades de Fútbol Sala', 'Inter-faculty Futsal Tournament'),
    category: 'Deportes',
    date: '2026-11-02',
    time: '16:00',
    location: b('Coliseo (ilustrativo)', 'Sports arena (illustrative)'),
    organizerId: 'julian',
    image: img('photo-1574629810360-7efbbe195018', 1200),
    description: b(
      'Inscribe a tu equipo de 8 jugadores y representa a tu programa. Fase de grupos y finales con barras de cada facultad.',
      'Sign up your team of 8 players and represent your program. Group stage and finals, with cheering sections from every faculty.'
    ),
    interested: 154,
    demo: true,
  },
  {
    id: 'e6',
    name: b('Encuentro de Clubes Estudiantiles', 'Student Clubs Fair'),
    category: 'Sociales',
    date: '2026-10-28',
    time: '11:00',
    location: b('Bloque de bienestar (ilustrativo)', 'Student wellness building (illustrative)'),
    organizerId: 'clubs',
    image: img('photo-1522202176988-66273c2fd55f', 1200),
    description: b(
      'Conoce los clubes de lectura, robótica, debate, fotografía y voluntariado. Ideal para estudiantes de primeros semestres.',
      'Meet the reading, robotics, debate, photography and volunteering clubs. Perfect for first-year students.'
    ),
    interested: 63,
    demo: true,
  },
];

export const initialPosts = [
  {
    id: 'post1',
    authorId: 'clubs',
    type: 'evento',
    text: b(
      '🎉 ¡Se viene el UAM Fest! Música en vivo, comida de emprendimientos estudiantiles y muchas actividades. Marca "Me interesa" para recibir recordatorios. (Evento de demostración)',
      '🎉 UAM Fest is coming! Live music, food from student businesses and lots of activities. Tap "Interested" to get reminders. (Demo event)'
    ),
    image: img('photo-1470229722913-7c0e2dbbafd3', 1200),
    ref: { kind: 'event', id: 'e1' },
    likes: 128,
    shares: 21,
    createdAt: minutesAgo(35),
    comments: [
      { id: 'c1', authorId: 'daniela', text: b('¡No me lo pierdo! ¿Habrá zona de comida?', "Wouldn't miss it! Will there be a food area?"), createdAt: minutesAgo(20) },
      { id: 'c2', authorId: 'mariana', text: b('Sí 🙌 Dulce Campus va a tener stand.', 'Yes 🙌 Dulce Campus will have a stand.'), createdAt: minutesAgo(12) },
    ],
  },
  {
    id: 'post2',
    authorId: 'santiago',
    type: 'producto',
    text: b(
      'Vendo mi ThinkPad T480 porque me cambié a un equipo de escritorio. Le funciona todo perfecto, batería con buena duración y 16 GB de RAM. Se puede probar en el campus antes de comprar. Escríbanme por aquí 👇',
      "Selling my ThinkPad T480 because I switched to a desktop. Everything works perfectly, good battery life and 16 GB of RAM. You can try it on campus before buying. Message me here 👇"
    ),
    image: img('photo-1496181133206-80ce9b88a853', 1200),
    ref: { kind: 'product', id: 'p1' },
    likes: 34,
    shares: 4,
    createdAt: minutesAgo(95),
    comments: [
      { id: 'c3', authorId: 'tomas', text: b('¿Le sirve para correr MATLAB?', 'Can it run MATLAB?'), createdAt: minutesAgo(70) },
    ],
  },
  {
    id: 'post3',
    authorId: 'laura',
    type: 'general',
    text: b(
      '¿Alguien está armando grupo de estudio para el parcial de Estadística del jueves? Podemos reunirnos en la biblioteca desde las 2:00 p. m. Yo llevo los ejercicios resueltos del taller 3 📚',
      "Is anyone putting together a study group for Thursday's Statistics exam? We can meet at the library from 2:00 PM. I'll bring the solved exercises from worksheet 3 📚"
    ),
    image: null,
    likes: 19,
    shares: 2,
    createdAt: minutesAgo(140),
    comments: [
      {
        id: 'c4',
        authorId: 'andres',
        text: b('Me uno. También puedo explicar la parte de distribuciones.', "I'm in. I can also explain the distributions part."),
        createdAt: minutesAgo(120),
      },
    ],
  },
  {
    id: 'post4',
    authorId: 'daniela',
    type: 'emprendimiento',
    text: b(
      'Hoy en Sazón de Casa tenemos ajiaco con arroz, aguacate y jugo de mora 🍲 Quedan 12 almuerzos. Pedidos antes de las 10:00 a. m. con entrega en la portería principal.',
      "Today at Sazón de Casa we have ajiaco with rice, avocado and blackberry juice 🍲 12 lunches left. Order before 10:00 AM for pickup at the main gate."
    ),
    image: img('photo-1504674900247-0877df9cc836', 1200),
    ref: { kind: 'service', id: 's7' },
    likes: 57,
    shares: 9,
    createdAt: minutesAgo(60 * 4),
    comments: [],
  },
  {
    id: 'post5',
    authorId: 'valentina',
    type: 'servicio',
    text: b(
      '¿Tienes un emprendimiento y todavía no tienes logo? Abrí cupos para diseñar identidad visual a emprendedores de la universidad. Precio especial para estudiantes ✨ Pueden ver mi portafolio en mi perfil.',
      "Do you have a business but no logo yet? I've opened spots to design brand identities for student entrepreneurs. Special student pricing ✨ You can see my portfolio on my profile."
    ),
    image: img('photo-1561070791-2526d30994b5', 1200),
    ref: { kind: 'service', id: 's3' },
    likes: 41,
    shares: 6,
    createdAt: minutesAgo(60 * 7),
    comments: [
      { id: 'c5', authorId: 'camila', text: b('Me encantó el que le hiciste a Hilo & Barro 😍', 'Loved the one you made for Hilo & Barro 😍'), createdAt: minutesAgo(60 * 6) },
    ],
  },
  {
    id: 'post6',
    authorId: 'felipe',
    type: 'general',
    text: b(
      'Encontré unas llaves con un llavero azul de Totoro en el segundo piso de la biblioteca. Las dejé en la recepción. ¡Compartan para que lleguen a su dueño! 🔑',
      'I found some keys with a blue Totoro keychain on the second floor of the library. I left them at the front desk. Share so they get back to their owner! 🔑'
    ),
    image: null,
    likes: 23,
    shares: 15,
    createdAt: minutesAgo(60 * 11),
    comments: [],
  },
  {
    id: 'post7',
    authorId: 'julian',
    type: 'evento',
    text: b(
      '⚽ Abiertas las inscripciones para el Torneo Interfacultades de Fútbol Sala. Equipos de 8 jugadores. ¿Ingenierías se anima a defender el título? (Evento de demostración)',
      '⚽ Sign-ups are open for the Inter-faculty Futsal Tournament. Teams of 8 players. Is Engineering ready to defend the title? (Demo event)'
    ),
    image: img('photo-1574629810360-7efbbe195018', 1200),
    ref: { kind: 'event', id: 'e5' },
    likes: 66,
    shares: 12,
    createdAt: minutesAgo(60 * 20),
    comments: [],
  },
  {
    id: 'post8',
    authorId: 'tomas',
    type: 'emprendimiento',
    text: b(
      'Les presento Café Ladera ☕ Café especial cultivado por mi familia en Caldas. Esta semana tengo bolsas de 250 g con 10% de descuento para la comunidad universitaria.',
      "Meet Café Ladera ☕ Specialty coffee grown by my family in Caldas. This week I have 250 g bags at 10% off for the university community."
    ),
    image: img('photo-1509042239860-f550ce710b93', 1200),
    ref: { kind: 'service', id: 's10' },
    likes: 72,
    shares: 10,
    createdAt: minutesAgo(60 * 28),
    comments: [],
  },
];

export const initialNotifications = [
  {
    id: 'n1', personId: 'mariana', createdAt: minutesAgo(8), read: false,
    text: b('reaccionó a tu comentario en "Feria de Emprendimiento".', 'reacted to your comment on "Entrepreneurship Fair".'),
  },
  {
    id: 'n2', personId: 'clubs', createdAt: minutesAgo(35), read: false,
    text: b('publicó un nuevo evento: UAM Fest (demostración).', 'posted a new event: UAM Fest (demo).'),
  },
  {
    id: 'n3', personId: 'santiago', createdAt: minutesAgo(95), read: false,
    text: b('publicó un producto que podría interesarte.', 'posted an item you might like.'),
  },
  {
    id: 'n4', personId: 'laura', createdAt: minutesAgo(60 * 5), read: true,
    text: b('te mencionó en un grupo de estudio.', 'mentioned you in a study group.'),
  },
];

export const initialConversations = [
  {
    id: 'conv1',
    personId: 'camila',
    itemRef: { kind: 'product', id: 'p5' },
    topic: b('Morral antirrobo para portátil', 'Anti-theft laptop backpack'),
    messages: [
      { from: 'them', text: b('¡Hola! Sí, el morral todavía está disponible 😊', 'Hi! Yes, the backpack is still available 😊'), at: minutesAgo(50) },
      { from: 'them', text: b('¿Te queda bien vernos mañana en la cafetería?', 'Does meeting at the cafeteria tomorrow work for you?'), at: minutesAgo(49) },
    ],
    unread: true,
  },
  {
    id: 'conv2',
    personId: 'andres',
    itemRef: { kind: 'service', id: 's1' },
    topic: b('Tutorías de Cálculo', 'Calculus tutoring'),
    messages: [
      { from: 'me', text: b('Hola Andrés, ¿tienes cupo el viernes?', 'Hi Andrés, do you have a spot on Friday?'), at: minutesAgo(60 * 3) },
      { from: 'them', text: b('Sí, a las 3:00 p. m. en la biblioteca. ¿Te sirve?', 'Yes, at 3:00 PM at the library. Does that work?'), at: minutesAgo(60 * 2.5) },
    ],
    unread: false,
  },
];

export const SIMULATED_REPLIES = [
  b('¡Hola! Gracias por escribir. Sí, todavía está disponible 😊', 'Hi! Thanks for writing. Yes, it is still available 😊'),
  b('Claro que sí. ¿Te queda bien que nos veamos en el campus?', 'Sure! Would meeting on campus work for you?'),
  b('¡Perfecto! Te confirmo por aquí apenas pueda.', "Perfect! I'll confirm here as soon as I can."),
  b('Con gusto te doy más detalles. ¿Qué te gustaría saber?', "Happy to give you more details. What would you like to know?"),
];

// ---------- Historias (estilo Instagram) ----------
export const DEMO_NAME = 'Salomé Vergara';

export const STORY_BACKGROUNDS = {
  gold: { css: 'linear-gradient(160deg, #FFE27A 0%, #F5B21B 60%, #E8862A 100%)', ink: true },
  sunset: { css: 'linear-gradient(160deg, #F5A524 0%, #EF5D3A 55%, #B8306F 100%)', ink: false },
  plum: { css: 'linear-gradient(160deg, #2B1748 0%, #6B2E86 55%, #C2368C 100%)', ink: false },
  night: { css: 'linear-gradient(160deg, #121117 0%, #2A2833 60%, #4A4552 100%)', ink: false },
  mint: { css: 'linear-gradient(160deg, #1E7F5C 0%, #3FB27F 55%, #B9E6C9 100%)', ink: false },
};

export const initialStories = [
  {
    personId: 'clubs',
    items: [
      {
        id: 'st1',
        image: img('photo-1470229722913-7c0e2dbbafd3', 800),
        text: b('¡Faltan 3 semanas para el UAM Fest! 🎶', 'UAM Fest is 3 weeks away! 🎶'),
        ref: { kind: 'event', id: 'e1' },
        createdAt: minutesAgo(40),
      },
      {
        id: 'st2',
        bg: 'sunset',
        text: b('Buscamos voluntarios para la logística del festival. ¡Escríbenos! 🙌', 'We need volunteers for the festival logistics. Message us! 🙌'),
        createdAt: minutesAgo(38),
      },
    ],
  },
  {
    personId: 'mariana',
    items: [
      {
        id: 'st3',
        image: img('photo-1578985545062-69928b1d9587', 800),
        text: b('Tortas recién salidas del horno 🧁', 'Cakes fresh out of the oven 🧁'),
        ref: { kind: 'service', id: 's8' },
        createdAt: minutesAgo(75),
      },
      {
        id: 'st4',
        image: img('photo-1606313564200-e75d5e30476c', 800),
        text: b('Quedan 4 cajas de brownies para hoy', '4 boxes of brownies left for today'),
        ref: { kind: 'product', id: 'p11' },
        createdAt: minutesAgo(70),
      },
    ],
  },
  {
    personId: 'laura',
    items: [
      {
        id: 'st5',
        bg: 'gold',
        text: b(
          'Tip de inglés del día ✏️\n"I\'m looking forward to it" = "Tengo muchas ganas de que llegue"',
          'English tip of the day ✏️\n"I\'m looking forward to it" = "I can\'t wait for it"'
        ),
        createdAt: minutesAgo(120),
      },
    ],
  },
  {
    personId: 'santiago',
    items: [
      {
        id: 'st6',
        image: img('photo-1496181133206-80ce9b88a853', 800),
        text: b('Último día para comprar mi ThinkPad 💻', 'Last day to buy my ThinkPad 💻'),
        ref: { kind: 'product', id: 'p1' },
        createdAt: minutesAgo(150),
      },
    ],
  },
  {
    personId: 'julian',
    items: [
      {
        id: 'st7',
        image: img('photo-1574629810360-7efbbe195018', 800),
        text: b('Entrenamiento a las 4:00 p. m. ⚽', 'Practice at 4:00 PM ⚽'),
        ref: { kind: 'event', id: 'e5' },
        createdAt: minutesAgo(200),
      },
    ],
  },
  {
    personId: 'daniela',
    items: [
      {
        id: 'st8',
        image: img('photo-1504674900247-0877df9cc836', 800),
        text: b('Menú de hoy en Sazón de Casa 🍲', "Today's menu at Sazón de Casa 🍲"),
        ref: { kind: 'service', id: 's7' },
        createdAt: minutesAgo(260),
      },
    ],
  },
  {
    personId: 'felipe',
    items: [
      {
        id: 'st9',
        image: img('photo-1501281668745-f7f57925c3b4', 800),
        text: b('¿Quién se anima al Open Mic? 🎤', "Who's up for the Open Mic? 🎤"),
        ref: { kind: 'event', id: 'e4' },
        createdAt: minutesAgo(320),
      },
      {
        id: 'st10',
        bg: 'night',
        text: b('Abrí 3 cupos para fotos de grado este mes 📸', 'I opened 3 spots for graduation photos this month 📸'),
        ref: { kind: 'service', id: 's4' },
        createdAt: minutesAgo(310),
      },
    ],
  },
  {
    personId: 'valentina',
    items: [
      {
        id: 'st11',
        image: img('photo-1561070791-2526d30994b5', 800),
        text: b('Nuevo logo para Hilo & Barro ✨', 'New logo for Hilo & Barro ✨'),
        ref: { kind: 'service', id: 's3' },
        createdAt: minutesAgo(400),
      },
    ],
  },
  {
    personId: 'tomas',
    items: [
      {
        id: 'st12',
        image: img('photo-1509042239860-f550ce710b93', 800),
        text: b('Café Ladera: 10% de descuento esta semana ☕', 'Café Ladera: 10% off this week ☕'),
        ref: { kind: 'service', id: 's10' },
        createdAt: minutesAgo(480),
      },
    ],
  },
];
