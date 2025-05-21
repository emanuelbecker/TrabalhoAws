import React from 'react';
import { Barber } from '../types';
import { Scissors, Star, Calendar } from 'lucide-react';

interface BarberCardProps {
  barber: Barber;
  onClick: (barberId: string) => void;
}

const BarberCard: React.FC<BarberCardProps> = ({ barber, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(barber.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={barber.imageUrl} 
          alt={`Barber ${barber.name}`}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white mb-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{barber.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{barber.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Scissors className="w-4 h-4 mr-2" />
          <p className="text-sm">{barber.specialty}</p>
        </div>
        
        <div className="flex items-center text-blue-600">
          <Calendar className="w-4 h-4 mr-2" />
          <p className="text-sm font-medium">{barber.appointmentsCount} appointments today</p>
        </div>
      </div>
    </div>
  );
};

export default BarberCard;