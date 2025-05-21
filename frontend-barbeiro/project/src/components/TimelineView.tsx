import React from 'react';
import { TimeSlot, Appointment } from '../types';
import { formatTime } from '../utils/dateUtils';

interface TimelineViewProps {
  timeSlots: TimeSlot[];
  appointments: Appointment[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ timeSlots, appointments }) => {
  // Group time slots by hour for better display
  const groupedTimeSlots: Record<string, TimeSlot[]> = {};
  
  timeSlots.forEach(slot => {
    const hour = slot.startTime.split(':')[0];
    if (!groupedTimeSlots[hour]) {
      groupedTimeSlots[hour] = [];
    }
    groupedTimeSlots[hour].push(slot);
  });

  // Get appointment details for a specific slot
  const getAppointmentForSlot = (slot: TimeSlot): Appointment | undefined => {
    if (!slot.isOccupied || !slot.appointmentId) return undefined;
    return appointments.find(app => app.id === slot.appointmentId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Today's Schedule</h2>
      
      <div className="space-y-4">
        {Object.entries(groupedTimeSlots).map(([hour, slots]) => (
          <div key={hour} className="flex">
            <div className="w-16 flex-shrink-0 text-right pr-4 font-medium text-gray-500">
              {formatTime(`${hour}:00`)}
            </div>
            
            <div className="flex-grow border-l border-gray-200 pl-4 space-y-2">
              {slots.map(slot => {
                const appointment = getAppointmentForSlot(slot);
                return (
                  <div 
                    key={slot.id}
                    className={`py-1 px-2 rounded text-sm ${
                      slot.isOccupied 
                        ? appointment?.status === 'confirmed'
                          ? 'bg-green-100 border-l-2 border-green-500'
                          : appointment?.status === 'rejected'
                            ? 'bg-red-100 border-l-2 border-red-500'
                            : 'bg-yellow-100 border-l-2 border-yellow-500'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </span>
                      {slot.isOccupied && appointment && (
                        <span className="truncate max-w-[150px]">{appointment.clientName}</span>
                      )}
                    </div>
                    {slot.isOccupied && appointment && (
                      <div className="text-xs text-gray-600 mt-1 truncate">
                        {appointment.service}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;