import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Si aucune langue dans l'URL → redirection vers /fr */}
        <Route path="/" element={<Navigate to="/fr" replace />} />

        {/* Route dynamique : fonctionne pour fr, en, es, de, ar, etc. */}
        <Route path="/:lang/*" element={<App />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
