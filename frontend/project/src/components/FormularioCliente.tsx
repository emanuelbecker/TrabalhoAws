import React, { useState } from 'react';
import { Cliente } from '../contexts/AgendamentoContext';

interface FormularioClienteProps {
  cliente: Cliente;
  onClienteAtualizado: (cliente: Cliente) => void;
  onSubmit: () => void;
}

const FormularioCliente: React.FC<FormularioClienteProps> = ({ 
  cliente, 
  onClienteAtualizado,
  onSubmit
}) => {
  const [erros, setErros] = useState<Partial<Record<keyof Cliente, string>>>({});
  
  // Verificar campos obrigatórios
  const validarFormulario = (): boolean => {
    const novosErros: Partial<Record<keyof Cliente, string>> = {};
    
    if (!cliente.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }
    
    if (!cliente.telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(cliente.telefone)) {
      novosErros.telefone = 'Formato inválido. Use (99) 99999-9999';
    }
    
    if (!cliente.email.trim()) {
      novosErros.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
      novosErros.email = 'E-mail inválido';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  // Formatar telefone enquanto digita
  const formatarTelefone = (valor: string) => {
    // Remover caracteres não numéricos
    const numeros = valor.replace(/\D/g, '');
    
    if (numeros.length <= 2) {
      return numeros;
    }
    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      onClienteAtualizado({
        ...cliente,
        [name]: formatarTelefone(value)
      });
    } else {
      onClienteAtualizado({
        ...cliente,
        [name]: value
      });
    }
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (erros[name as keyof Cliente]) {
      setErros({
        ...erros,
        [name]: undefined
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-titulo text-xl mb-4 text-preto">Seus Dados</h3>
      
      <div className="mb-4">
        <label htmlFor="nome" className="block font-corpo text-gray-700 mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md font-corpo focus:outline-none focus:ring-2 focus:ring-dourado
            ${erros.nome ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Seu nome completo"
        />
        {erros.nome && (
          <p className="text-red-500 text-sm mt-1">{erros.nome}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="telefone" className="block font-corpo text-gray-700 mb-2">
          Telefone *
        </label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md font-corpo focus:outline-none focus:ring-2 focus:ring-dourado
            ${erros.telefone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="(99) 99999-9999"
        />
        {erros.telefone && (
          <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block font-corpo text-gray-700 mb-2">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md font-corpo focus:outline-none focus:ring-2 focus:ring-dourado
            ${erros.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="seu.email@exemplo.com"
        />
        {erros.email && (
          <p className="text-red-500 text-sm mt-1">{erros.email}</p>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full bg-dourado hover:bg-dourado-claro text-preto font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dourado"
      >
        Confirmar Agendamento
      </button>
    </form>
  );
};

export default FormularioCliente;