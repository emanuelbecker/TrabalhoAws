/**
 * Format a date to a string in the specified format
 */
export const format = (date: Date, formatStr: string): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return formatStr
    .replace('yyyy', year.toString())
    .replace('MM', month)
    .replace('dd', day);
};

/**
 * Add minutes to a date
 */
export const addMinutes = (date: number | Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

/**
 * Format date for display
 */
export const formatDateForDisplay = (dateStr: string): string => {
  const date = new Date(dateStr);
  
  // Check if it's today, tomorrow, or later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, tomorrow)) {
    return 'Tomorrow';
  } else {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Calculate time difference in minutes
 */
export const calculateTimeDifference = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const appointmentTime = new Date();
  appointmentTime.setHours(hours, minutes, 0, 0);
  
  const now = new Date();
  
  const diffMs = appointmentTime.getTime() - now.getTime();
  return Math.floor(diffMs / 60000); // Convert ms to minutes
};

/**
 * Format time from 24h to 12h format
 */
export const formatTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Get human-readable time remaining
 */
export const getTimeRemaining = (timeStr: string): string => {
  const minutesRemaining = calculateTimeDifference(timeStr);
  
  if (minutesRemaining < 0) {
    return 'Overdue';
  }
  
  if (minutesRemaining < 60) {
    return `${minutesRemaining} min`;
  }
  
  const hours = Math.floor(minutesRemaining / 60);
  const minutes = minutesRemaining % 60;
  
  if (minutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${minutes} min`;
};

/**
 * Format duration in minutes to a readable string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};