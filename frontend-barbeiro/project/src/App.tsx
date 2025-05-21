import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelecaoBarbeiro from './paginas/SelecaoBarbeiro';
import ListaAgendamentos from './paginas/ListaAgendamentos';
import { ProvedorAgendamento } from './contexto/AgendamentoContexto';

function App() {
  return (
    <ProvedorAgendamento>
      <Router>
        <Routes>
          <Route path="/" element={<SelecaoBarbeiro />} />
          <Route path="/agendamentos/:barbeiroId" element={<ListaAgendamentos />} />
        </Routes>
      </Router>
    </ProvedorAgendamento>
  );
}

export default App;