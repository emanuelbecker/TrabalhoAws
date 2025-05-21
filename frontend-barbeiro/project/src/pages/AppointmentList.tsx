import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, CalendarX, ClipboardCheck } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { barbers } from '../data/mockData';
import AppointmentCard from '../components/AppointmentCard';
import SearchBar from '../components/SearchBar';
import DateFilter from '../components/DateFilter';
import TimelineView from '../components/TimelineView';

const AppointmentList: React.FC = () => {
  const { barberId } = useParams<{ barberId: string }>();
  const navigate = useNavigate();
  
  const { 
    filteredAppointments, 
    selectedDate, 
    setSelectedDate, 
    searchQuery, 
    setSearchQuery, 
    confirmAppointment, 
    rejectAppointment,
    timeSlots,
    appointments,
    setSelectedBarberId
  } = useAppointments();

  // Set selected barber when the component mounts
  useEffect(() => {
    if (barberId) {
      setSelectedBarberId(barberId);
    }
  }, [barberId, setSelectedBarberId]);

  // Get the barber details
  const barber = barbers.find(b => b.id === barberId);
  
  // Navigate back to barber selection
  const handleBack = () => {
    navigate('/');
  };

  // Pending appointments count
  const pendingAppointments = filteredAppointments.filter(app => app.status === 'pending').length;

  // Confirmed appointments count
  const confirmedAppointments = filteredAppointments.filter(app => app.status === 'confirmed').length;
  
  // Rejected appointments count
  const rejectedAppointments = filteredAppointments.filter(app => app.status === 'rejected').length;

  if (!barber) {
    return <div>Barber not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Back to Barbers</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={barber.imageUrl} 
                alt={barber.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{barber.name}</h1>
                <p className="text-sm text-gray-600">{barber.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-yellow-100 mb-2">
                  <ClipboardCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">{pendingAppointments}</span>
                <span className="text-sm text-gray-500">Pending</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-green-100 mb-2">
                  <CalendarCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold">{confirmedAppointments}</span>
                <span className="text-sm text-gray-500">Confirmed</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="p-2 rounded-full bg-red-100 mb-2">
                  <CalendarX className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold">{rejectedAppointments}</span>
                <span className="text-sm text-gray-500">Rejected</span>
              </div>
            </div>
            
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
            />
            
            <DateFilter 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointments</h2>
              
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map(appointment => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onConfirm={confirmAppointment}
                      onReject={rejectAppointment}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <CalendarX className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
                  <p className="text-gray-500">There are no appointments for this date or search criteria.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <TimelineView 
              timeSlots={timeSlots} 
              appointments={appointments} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentList;