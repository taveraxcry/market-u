import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import './styles/base.css';
import './styles/auth.css';
import './styles/app.css';
import './styles/stories.css';
import './styles/mobile.css';

// Lets phones install the app ("Agregar a pantalla de inicio").
// Only when served over http(s): manifests can't load from a local file.
if (location.protocol.startsWith('http')) {
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = 'manifest.webmanifest';
  document.head.appendChild(link);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </LanguageProvider>
  </React.StrictMode>
);
