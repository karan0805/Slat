import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@mantine/core';
import { BsPlusCircle } from 'react-icons/bs';

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
    <div style={{ height: '400pt', width: '800pt', margin: '50px auto' }}>
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
      />
      <Button
        variant="filled"
        size="lg"
        radius={100}
        leftIcon={<BsPlusCircle />}
        style={{
          position: 'absolute',
          right: '40px',
          bottom: '40px',
        }}
      >
        Add Event
      </Button>
    </div>
  );
};

export default CalendarView;
