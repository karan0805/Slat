import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  //const now = new Date();
  const events = [
    {
      id: 13,
      title: 'HireMe Development',
      start: new Date(2022, 4, 3, 0, 0, 0),
      end: new Date(2022, 4, 10, 2, 0, 0),
    },
  ];
  return (
    <div style={{ height: '500pt', padding: '25px' }}>
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
      />
    </div>
  );
};

export default CalendarView;
