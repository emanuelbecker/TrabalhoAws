import { Appointment, Barber, TimeSlot } from '../types';
import { addMinutes, format } from '../utils/dateUtils';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    specialty: 'Classic Cuts & Beard Trim',
    imageUrl: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    appointmentsCount: 12
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    specialty: 'Modern Styles & Fades',
    imageUrl: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    appointmentsCount: 8
  },
  {
    id: '3',
    name: 'David Chen',
    specialty: 'Premium Shaves & Styling',
    imageUrl: 'https://images.pexels.com/photos/2035237/pexels-photo-2035237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    appointmentsCount: 5
  },
  {
    id: '4',
    name: 'James Wilson',
    specialty: 'Hair Coloring & Treatments',
    imageUrl: 'https://images.pexels.com/photos/2760343/pexels-photo-2760343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    appointmentsCount: 10
  }
];

// Generate today's date
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

export const appointments: Appointment[] = [
  {
    id: '1',
    clientName: 'John Smith',
    service: 'Haircut & Beard Trim',
    date: format(today, 'yyyy-MM-dd'),
    time: '10:00',
    duration: 45,
    notes: 'Prefer shorter on the sides',
    status: 'pending',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 2)).toISOString(),
  },
  {
    id: '2',
    clientName: 'Michael Brown',
    service: 'Premium Shave',
    date: format(today, 'yyyy-MM-dd'),
    time: '11:30',
    duration: 30,
    status: 'confirmed',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 4)).toISOString(),
  },
  {
    id: '3',
    clientName: 'Robert Davis',
    service: 'Fade & Line Up',
    date: format(today, 'yyyy-MM-dd'),
    time: '14:00',
    duration: 40,
    notes: 'First time customer',
    status: 'pending',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 1)).toISOString(),
  },
  {
    id: '4',
    clientName: 'William Jones',
    service: 'Hair Coloring',
    date: format(tomorrow, 'yyyy-MM-dd'),
    time: '09:30',
    duration: 90,
    notes: 'Bringing reference photos',
    status: 'pending',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 12)).toISOString(),
  },
  {
    id: '5',
    clientName: 'David Wilson',
    service: 'Haircut & Styling',
    date: format(tomorrow, 'yyyy-MM-dd'),
    time: '13:00',
    duration: 45,
    status: 'confirmed',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 24)).toISOString(),
  },
  {
    id: '6',
    clientName: 'Richard Moore',
    service: 'Beard Trim & Shaping',
    date: format(dayAfterTomorrow, 'yyyy-MM-dd'),
    time: '10:30',
    duration: 30,
    status: 'rejected',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 28)).toISOString(),
  },
  {
    id: '7',
    clientName: 'Thomas Taylor',
    service: 'Full Service Package',
    date: format(dayAfterTomorrow, 'yyyy-MM-dd'),
    time: '15:00',
    duration: 75,
    notes: 'Special occasion prep',
    status: 'pending',
    barberId: '1',
    createdAt: new Date(today.setHours(today.getHours() - 36)).toISOString(),
  },
  {
    id: '8',
    clientName: 'Carlos Rodriguez',
    service: 'Haircut & Hot Towel Shave',
    date: format(today, 'yyyy-MM-dd'),
    time: '09:00',
    duration: 60,
    status: 'pending',
    barberId: '2',
    createdAt: new Date(today.setHours(today.getHours() - 3)).toISOString(),
  },
  {
    id: '9',
    clientName: 'Daniel Martin',
    service: 'Beard Styling',
    date: format(tomorrow, 'yyyy-MM-dd'),
    time: '11:00',
    duration: 30,
    status: 'confirmed',
    barberId: '2',
    createdAt: new Date(today.setHours(today.getHours() - 8)).toISOString(),
  },
  {
    id: '10',
    clientName: 'Kevin Lewis',
    service: 'Children's Haircut',
    date: format(dayAfterTomorrow, 'yyyy-MM-dd'),
    time: '14:30',
    duration: 30,
    notes: '5-year-old son, first haircut',
    status: 'pending',
    barberId: '2',
    createdAt: new Date(today.setHours(today.getHours() - 18)).toISOString(),
  }
];

// Generate time slots based on appointments
export const generateTimeSlots = (barberId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9:00 AM
  const endHour = 18; // 6:00 PM
  const slotDuration = 30; // 30 minutes per slot

  const barberAppointments = appointments.filter(
    app => app.barberId === barberId && app.date === date && app.status !== 'rejected'
  );

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endTimeObj = addMinutes(new Date().setHours(hour, minute), slotDuration);
      const endTime = `${endTimeObj.getHours().toString().padStart(2, '0')}:${endTimeObj.getMinutes().toString().padStart(2, '0')}`;
      
      const overlappingAppointment = barberAppointments.find(app => {
        const [appHour, appMinute] = app.time.split(':').map(Number);
        const appEndObj = addMinutes(new Date().setHours(appHour, appMinute), app.duration);
        const appEndTime = `${appEndObj.getHours().toString().padStart(2, '0')}:${appEndObj.getMinutes().toString().padStart(2, '0')}`;
        
        return (
          (startTime >= app.time && startTime < appEndTime) || 
          (endTime > app.time && endTime <= appEndTime) ||
          (app.time >= startTime && app.time < endTime)
        );
      });

      slots.push({
        id: `${hour}-${minute}`,
        startTime,
        endTime,
        isOccupied: !!overlappingAppointment,
        appointmentId: overlappingAppointment?.id
      });
    }
  }

  return slots;
};