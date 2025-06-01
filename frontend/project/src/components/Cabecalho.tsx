import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X } from 'lucide-react';

const Cabecalho: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Controlar transparência do cabeçalho ao rolar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-preto shadow-md' : 'bg-preto/90'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-8 w-8 text-dourado" />
          <div>
            <h1 className="text-dourado font-titulo text-xl md:text-2xl font-bold">Vargas Barbearia</h1>
          </div>
        </Link>

        {/* Menu para Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`text-white hover:text-dourado transition-colors font-corpo ${
              location.pathname === '/' ? 'border-b-2 border-dourado' : ''
            }`}
          >
            Início
          </Link>
          <Link 
            to="/agendar" 
            className={`text-white hover:text-dourado transition-colors font-corpo ${
              location.pathname === '/agendar' ? 'border-b-2 border-dourado' : ''
            }`}
          >
            Agendar
          </Link>
        </nav>

        {/* Botão de menu para Mobile */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={alternarMenu}
          aria-label="Menu"
        >
          {menuAberto ? (
            <X className="h-6 w-6 text-dourado" />
          ) : (
            <Menu className="h-6 w-6 text-dourado" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-preto animate-deslizar">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-white hover:text-dourado transition-colors font-corpo py-2 ${
                  location.pathname === '/' ? 'border-l-4 border-dourado pl-2' : ''
                }`}
                onClick={() => setMenuAberto(false)}
              >
                Início
              </Link>
              <Link 
                to="/agendar" 
                className={`text-white hover:text-dourado transition-colors font-corpo py-2 ${
                  location.pathname === '/agendar' ? 'border-l-4 border-dourado pl-2' : ''
                }`}
                onClick={() => setMenuAberto(false)}
              >
                Agendar
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;