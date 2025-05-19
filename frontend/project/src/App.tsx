import { Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import PaginaInicial from './pages/PaginaInicial';
import PaginaAgendamento from './pages/PaginaAgendamento';
import PaginaConfirmacao from './pages/PaginaConfirmacao';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cinza-claro">
      <Cabecalho />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/agendar" element={<PaginaAgendamento />} />
          <Route path="/confirmacao" element={<PaginaConfirmacao />} />
        </Routes>
      </main>
      <Rodape />
    </div>
  );
}

export default App;