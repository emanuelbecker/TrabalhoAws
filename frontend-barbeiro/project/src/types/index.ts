export interface Barber {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  appointmentsCount: number;
}

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: number; // in minutes
  notes?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  barberId: string;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  appointmentId?: string;
}