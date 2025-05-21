import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, TimeSlot } from '../types';
import { appointments as mockAppointments, generateTimeSlots as generateTimeSlotsMock } from '../data/mockData';
import { format } from '../utils/dateUtils';

interface AppointmentContextProps {
  appointments: Appointment[];
  filteredAppointments: Appointment[];
  selectedDate: string;
  searchQuery: string;
  timeSlots: TimeSlot[];
  setSelectedDate: (date: string) => void;
  setSearchQuery: (query: string) => void;
  confirmAppointment: (id: string) => void;
  rejectAppointment: (id: string) => void;
  generateTimeSlots: (barberId: string, date: string, appointments: Appointment[]) => TimeSlot[];
  setSelectedBarberId: (id: string) => void;
  selectedBarberId: string;
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBarberId, setSelectedBarberId] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Filtra agendamentos conforme data, barbeiro e termo de busca
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate;
    const matchesBarber = appointment.barberId === selectedBarberId;
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      appointment.clientName.toLowerCase().includes(lowerQuery) ||
      appointment.service.toLowerCase().includes(lowerQuery);

    return matchesDate && matchesBarber && matchesSearch;
  });

  // Gera os time slots levando em conta o barbeiro, data e agendamentos existentes
  const generateTimeSlots = (barberId: string, date: string, currentAppointments: Appointment[]) => {
    const allSlots = generateTimeSlotsMock(barberId, date);

    // Marca slots já confirmados como indisponíveis
    const bookedSlots = currentAppointments
      .filter(app => app.barberId === barberId && app.date === date && app.status === 'confirmed')
      .map(app => app.time);

    return allSlots.map(slot => ({
      ...slot,
      available: !bookedSlots.includes(String(slot.time)),
    }));
  };

  // Atualiza os horários sempre que o barbeiro, data ou agendamentos mudam
  useEffect(() => {
    if (selectedBarberId && selectedDate) {
      const slots = generateTimeSlots(selectedBarberId, selectedDate, appointments);
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  }, [selectedBarberId, selectedDate, appointments]);

  // Confirma um agendamento
  const confirmAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'confirmed' } : appointment
      )
    );
  };

  // Rejeita um agendamento
  const rejectAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        filteredAppointments,
        selectedDate,
        searchQuery,
        timeSlots,
        setSelectedDate,
        setSearchQuery,
        confirmAppointment,
        rejectAppointment,
        generateTimeSlots,
        setSelectedBarberId,
        selectedBarberId,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
