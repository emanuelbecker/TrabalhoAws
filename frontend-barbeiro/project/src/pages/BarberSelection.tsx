import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Barber } from '../types';
import BarberCard from '../components/BarberCard';
import { barbers } from '../data/mockData';
import { Scissors } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';

const BarberSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedBarberId } = useAppointments();

  const handleBarberSelect = (barberId: string) => {
    setSelectedBarberId(barberId);
    navigate(`/appointments/${barberId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Scissors className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">BarberBook</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">Select a barber to view and manage their appointments</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Our Barbers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber: Barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              onClick={handleBarberSelect}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BarberSelection;