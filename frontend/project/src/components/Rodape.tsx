import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Rodape: React.FC = () => {
  return (
    <footer className="bg-preto text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-dourado font-titulo text-xl mb-4">Barbearia Corte & Estilo</h3>
            <p className="font-corpo text-sm mb-4">
              Especializada em cortes masculinos tradicionais e modernos desde 2010.
              Nossa missão é oferecer um serviço de excelência com estilo e personalidade.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-dourado hover:text-dourado-claro transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-dourado hover:text-dourado-claro transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-dourado font-titulo text-xl mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">Segunda a Sexta: 9h às 19h</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">Sábado: 9h às 18h</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">Domingo: Fechado</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-dourado font-titulo text-xl mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-dourado mr-2" />
                <span className="font-corpo text-sm">contato@corteestilo.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center">
          <p className="font-corpo text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Barbearia Corte & Estilo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;