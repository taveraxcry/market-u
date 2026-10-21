import { useApp } from './context/AppContext.jsx';
import { useI18n } from './i18n/LanguageContext.jsx';
import ChatModal from './components/ChatModal.jsx';
import CreatePublicationModal from './components/CreatePublicationModal.jsx';
import DetailModal from './components/DetailModal.jsx';
import MobileNav from './components/MobileNav.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toasts from './components/Toasts.jsx';
import Topbar from './components/Topbar.jsx';
import AuthScreen from './pages/AuthScreen.jsx';
import EventsPage from './pages/EventsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import MyPostsPage from './pages/MyPostsPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';

function CurrentView({ view }) {
  switch (view) {
    case 'marketplace':
      return <MarketplacePage />;
    case 'services':
      return <ServicesPage key="services" />;
    case 'businesses':
      return <ServicesPage key="businesses" initialKind="emprendimiento" />;
    case 'events':
      return <EventsPage />;
    case 'mine':
      return <MyPostsPage />;
    case 'saved':
      return <SavedPage />;
    case 'messages':
      return <MessagesPage />;
    case 'search':
      return <SearchPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  const { user, view } = useApp();
  const { t } = useI18n();

  if (!user) {
    return (
      <>
        <AuthScreen />
        <Toasts />
      </>
    );
  }

  return (
    <div className="app">
      <a href="#main" className="skip-link">{t('nav.skip')}</a>
      <Topbar />
      <div className="app__body">
        <Sidebar />
        <main id="main" className={`app__main ${view === 'home' ? 'app__main--home' : ''}`} tabIndex={-1}>
          <CurrentView view={view} />
        </main>
      </div>
      <MobileNav />
      <DetailModal />
      <ChatModal />
      <CreatePublicationModal />
      <Toasts />
    </div>
  );
}
