import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AgendamentoProvider } from './contexts/AgendamentoContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AgendamentoProvider>
        <App />
      </AgendamentoProvider>
    </BrowserRouter>
  </StrictMode>
);