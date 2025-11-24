import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Application from './pages/Application';
import About from './pages/About';
import Contact from './pages/Contact';
import i18n from './i18n'; // configuration i18n

type Page = 'home' | 'simulation' | 'application' | 'about' | 'contact';

function App() {
  const { lang } = useParams(); // récupère fr, de, es…
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // 🔥 Change automatiquement la langue selon l’URL
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'simulation':
        return <Simulation onNavigate={handleNavigate} />;
      case 'application':
        return <Application onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;
