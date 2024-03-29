import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@mantine/core';
import { BsPlusCircle } from 'react-icons/bs';
import CreateEvent from '../../components/CreateEvent';
import { orgApi } from '../../api';
import { useSelector } from 'react-redux';
import { selectActiveOrg } from '../../redux/slices/OrgSlice';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [addEvent, setAddEvent] = useState(false);
  const activeOrg = useSelector(selectActiveOrg);
  const [call, setCall] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    orgApi.getEvents(activeOrg).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setEvents(res.data.data);
        setCall(false);
      }
    });
  }, [call]);

  return (
    <div style={{ height: '400pt', width: '800pt', margin: '50px auto' }}>
      <CreateEvent
        addEvent={addEvent}
        setAddEvent={setAddEvent}
        events={events}
        activeOrg={activeOrg}
        setCall={setCall}
      />
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
        onClick={() => setAddEvent(true)}
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
