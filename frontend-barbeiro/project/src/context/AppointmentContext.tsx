import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, TimeSlot } from '../types';
import { appointments as mockAppointments, generateTimeSlots } from '../data/mockData';
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
  generateTimeSlots: (barberId: string, date: string) => TimeSlot[];
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

  // Filter appointments based on selected date, barber, and search query
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === selectedDate;
    const matchesBarber = appointment.barberId === selectedBarberId;
    const matchesSearch = searchQuery === '' || 
                           appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           appointment.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDate && matchesBarber && matchesSearch;
  });

  // Update time slots when barber or date changes
  useEffect(() => {
    if (selectedBarberId && selectedDate) {
      const slots = generateTimeSlots(selectedBarberId, selectedDate);
      setTimeSlots(slots);
    }
  }, [selectedBarberId, selectedDate, appointments]);

  // Confirm an appointment
  const confirmAppointment = (id: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'confirmed' } : appointment
    ));
  };

  // Reject an appointment
  const rejectAppointment = (id: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
    ));
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
        selectedBarberId
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};