import React, { useState, useEffect } from 'react';
import ListaDeBarbeiros from './components/ListaDeBarbeiros';
import AgendaDoBarbeiro from './components/AgendaDoBarbeiro';
import { Barbeiro } from './types/tipos';

function App() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(null);

  useEffect(() => {
    async function fetchBarbeiros() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/barbeiros`);
        const data = await response.json();
        setBarbeiros(data);
      } catch (error) {
        console.error('Erro ao buscar barbeiros:', error);
      }
    }
    fetchBarbeiros();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-800 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">BarbeariaApp</h1>
      </header>

      <main className="container mx-auto p-4">
        {barbeiroSelecionado ? (
          <div className="space-y-4">
            <button
              onClick={() => setBarbeiroSelecionado(null)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition duration-200 flex items-center"
            >
              <span className="mr-2">←</span> Voltar para Lista de Barbeiros
            </button>
            <AgendaDoBarbeiro barbeiro={barbeiroSelecionado} />
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">Selecione um Barbeiro</h2>
            <ListaDeBarbeiros 
              barbeiros={barbeiros} 
              onSelecionarBarbeiro={(barbeiro) => setBarbeiroSelecionado(barbeiro)} 
            />
          </div>
        )}
      </main>

      <footer className="bg-slate-800 text-white py-3 px-6 mt-auto">
        <p className="text-center text-sm">© 2025 BarbeariaApp - Sistema exclusivo para barbeiros</p>
      </footer>
    </div>
  );
}

export default App;
