# Market U — Prototipo visual

**Your University. Your Community. Your Market.**

Prototipo académico de un marketplace social universitario, pensado inicialmente para la comunidad de la
Universidad Autónoma de Manizales (UAM). Proyecto independiente: no es un servicio oficial de la universidad.

## Cómo abrirlo

**Forma rápida:** abre `index.html` con doble clic (Chrome, Edge o Firefox). No necesita instalar nada.
Necesita internet solo para la tipografía y las fotos de ejemplo; sin internet las fotos se reemplazan por íconos.

**Cuenta de demostración:** `demo@marketu.app` / `MarketU2026` (o el botón "Usar cuenta de demostración").
También se acepta cualquier correo válido con una contraseña de 6 o más caracteres, o crear una cuenta nueva.

**Idioma:** la app abre en español. El selector **ES / EN** de arriba a la derecha la cambia a inglés
(incluye los productos, publicaciones y eventos de ejemplo) y recuerda la elección.

## Para modificar el código

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev      # modo desarrollo: abre http://localhost:5173/dev.html
npm run build    # regenera el index.html autónomo con los cambios
```

- `dev.html` es la plantilla de desarrollo (usada por `npm run dev`).
- `index.html` es un archivo **generado** que contiene toda la app. No lo edites a mano: cambia `src/` y ejecuta `npm run build`.

## Contenido real y contenido de ejemplo

- **Eventos con "Fuente"**: son reales (UAM, U. Nacional sede Manizales, U. de Caldas y la ciudad) y se tomaron de sitios oficiales y medios en octubre de 2026. Cada uno enlaza su fuente. Se marcan como pasados o próximos según la fecha del dispositivo.
- **Eventos "demo"**, personas, publicaciones, productos, servicios y chats: son ficticios, aunque hablen de lugares y eventos reales.
- **Fotos de Manizales y sus universidades**: reales, de Wikimedia Commons con licencia libre. Los créditos están en la app ("Créditos de fotos") y en src/data/photos.js.

## Qué es simulado

- Autenticación y registro (no se guardan contraseñas ni se verifica la identidad).
- Mensajería (las respuestas son automáticas).
- Publicaciones, "me gusta", guardados e intereses: viven solo en la memoria del navegador y se reinician al recargar.
- Eventos: fechas, horarios y lugares son ilustrativos.
- No hay pagos, comisiones ni backend.

## Estructura

```
src/
  App.jsx                    Cambia entre la pantalla de bienvenida y la app
  i18n/strings.js            Todos los textos en español e inglés
  i18n/LanguageContext.jsx   Idioma activo, traducción y formato de fechas
  context/AppContext.jsx     Estado global (sesión, publicaciones, guardados, chat, avisos)
  data/sampleData.js         Datos de ejemplo ficticios (bilingües)
  components/                Componentes reutilizables (tarjetas, modales, navegación…)
  pages/                     Pantallas (inicio, marketplace, servicios, eventos…)
  styles/                    Estilos
scripts/build-standalone.mjs Une todo en un solo index.html
```
