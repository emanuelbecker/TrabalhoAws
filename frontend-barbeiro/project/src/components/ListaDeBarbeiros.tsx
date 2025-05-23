import React from 'react';
import { Barbeiro } from '../types/tipos';

interface ListaDeBarbeirosProps {
  barbeiros: Barbeiro[];
  onSelecionarBarbeiro: (barbeiro: Barbeiro) => void;
}

function bufferParaBase64(bufferData: number[]) {
  const binary = bufferData.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
}

function ListaDeBarbeiros({ barbeiros, onSelecionarBarbeiro }: ListaDeBarbeirosProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {barbeiros.map((barbeiro) => {
        const srcImagem =
          barbeiro.img && typeof barbeiro.img === 'object' && 'data' in barbeiro.img
            ? `data:image/jpeg;base64,${bufferParaBase64(barbeiro.img.data)}`
            : barbeiro.imagemUrl || barbeiro.img || '/default-barbeiro.png';

        return (
          <div
            key={barbeiro.id}
            className="group bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center p-6 border border-slate-100 hover:border-blue-400"
            onClick={() =>
              onSelecionarBarbeiro({
                ...barbeiro,
                especialidade: barbeiro.especialidade ?? '',
                imagemUrl: barbeiro.imagemUrl ?? '',
                clientes: barbeiro.clientes ?? 0,
              })
            }
          >
            <div className="relative mb-4">
              <img
                src={srcImagem}
                alt={`Foto do barbeiro ${barbeiro.nome}`}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 group-hover:border-blue-400 transition"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 transition">{barbeiro.nome}</h3>
            {barbeiro.especialidade && (
              <p className="text-sm text-blue-500 mt-1 font-medium">{barbeiro.especialidade}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ListaDeBarbeiros;
