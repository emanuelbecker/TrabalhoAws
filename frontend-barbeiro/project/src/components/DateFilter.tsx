import React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
  // Generate dates for the next 7 days
  const today = new Date();
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : format(date, 'EEE, MMM d'),
      date
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-md font-semibold text-gray-800">Date Filter</h3>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {dateOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onDateChange(option.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              selectedDate === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;