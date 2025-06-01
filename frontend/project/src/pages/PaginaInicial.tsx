import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Scissors, Award, MapPin } from 'lucide-react';
import { useAgendamento } from '../contexts/AgendamentoContext';

const PaginaInicial: React.FC = () => {
  const { servicos } = useAgendamento();

  return (
    <div className="pt-16">
      {/* Banner Hero */}
      <section className="relative flex items-center justify-center h-[70vh] bg-gradient-to-r from-preto to-cinza-escuro overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ 
            backgroundImage: "url('https://i.ibb.co/bRssGXsQ/photo.jpg')",
            backgroundPosition: "center 30%"
          }}
        ></div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl text-white font-titulo font-bold mb-6 animate-aparecer">
            Barbearia <span className="text-dourado">Vargas</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-corpo mb-8 max-w-2xl mx-auto animate-aparecer" style={{animationDelay: '200ms'}}>
            Tradição e estilo no corte masculino desde 2010
          </p>
          <Link 
            to="/agendar" 
            className="inline-block bg-dourado hover:bg-dourado-claro text-preto font-semibold py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dourado animate-aparecer"
            style={{animationDelay: '400ms'}}
          >
            Agendar Horário
          </Link>
        </div>
      </section>
      
      {/* Nossos Diferenciais */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-titulo font-bold text-preto text-center mb-12">
            Por que escolher a <span className="text-dourado">Vargas Barbearia</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto bg-dourado/10 p-4 rounded-full inline-flex mb-4">
                <Scissors className="h-8 w-8 text-dourado" />
              </div>
              <h3 className="text-xl font-titulo font-semibold mb-2">Profissionais Experientes</h3>
              <p className="text-gray-600 font-corpo">Barbeiros com mais de 10 anos de experiência para garantir o melhor resultado.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto bg-dourado/10 p-4 rounded-full inline-flex mb-4">
                <Award className="h-8 w-8 text-dourado" />
              </div>
              <h3 className="text-xl font-titulo font-semibold mb-2">Qualidade Premium</h3>
              <p className="text-gray-600 font-corpo">Utilizamos apenas produtos de primeira linha para seus cabelos e barba.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto bg-dourado/10 p-4 rounded-full inline-flex mb-4">
                <Clock className="h-8 w-8 text-dourado" />
              </div>
              <h3 className="text-xl font-titulo font-semibold mb-2">Agendamento Fácil</h3>
              <p className="text-gray-600 font-corpo">Reserve seu horário online com facilidade e receba confirmação instantânea.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mx-auto bg-dourado/10 p-4 rounded-full inline-flex mb-4">
                <MapPin className="h-8 w-8 text-dourado" />
              </div>
              <h3 className="text-xl font-titulo font-semibold mb-2">Localização Central</h3>
              <p className="text-gray-600 font-corpo">Estamos localizados no coração da cidade, com fácil acesso e estacionamento.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nossos Serviços */}
      <section className="py-16 bg-cinza-claro relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-titulo font-bold text-preto text-center mb-12">
            Nossos <span className="text-dourado">Serviços</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <div key={servico.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-titulo font-semibold mb-2 text-preto">{servico.nome}</h3>
                  <p className="text-gray-600 font-corpo mb-4">{servico.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-titulo text-2xl text-preto">
                      R$ {(Number(servico.preco) || 0).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/agendar" 
              className="inline-block bg-dourado hover:bg-dourado-claro text-preto font-semibold py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dourado"
            >
              Agendar Agora
            </Link>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute -left-16 bottom-0 opacity-10 pointer-events-none">
          <Scissors className="h-64 w-64 text-dourado transform rotate-45" />
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-titulo font-bold text-preto text-center mb-12">
            O que nossos <span className="text-dourado">Clientes</span> dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-dourado">★</span>
                ))}
              </div>
              <p className="text-gray-600 font-corpo italic mb-4">
                "Melhor barbearia que já frequentei. Atendimento excelente e resultado impecável. Recomendo a todos!"
              </p>
              <p className="font-titulo font-semibold">Carlos Roberto</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-dourado">★</span>
                ))}
              </div>
              <p className="text-gray-600 font-corpo italic mb-4">
                "Profissionais extremamente habilidosos e ambiente agradável. Sempre saio satisfeito com meu corte."
              </p>
              <p className="font-titulo font-semibold">André Luiz</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-dourado">★</span>
                ))}
              </div>
              <p className="text-gray-600 font-corpo italic mb-4">
                "Agendamento online super prático e rápido. O barbeiro entendeu exatamente o que eu queria. Resultado perfeito!"
              </p>
              <p className="font-titulo font-semibold">Marcos Paulo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginaInicial;
