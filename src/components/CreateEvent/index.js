import { Button, Modal, Select, TextInput } from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import React, { useState } from 'react';

const CreateEvent = ({ addEvent, setAddEvent }) => {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState();
  const [type, setType] = useState('');

  return (
    <>
      <Modal
        centered
        opened={addEvent}
        onClose={() => setAddEvent(false)}
        title="Create New Event"
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        <form>
          <TextInput
            placeholder="Title"
            label="Title"
            radius="md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <Select
            label="Choose Event Type"
            placeholder="Pick One"
            data={[
              { value: 'meeting', label: 'Meeting' },
              { value: 'holiday', label: 'Holiday' },
              { value: 'custom', label: 'Custom Range' },
            ]}
            value={type}
            onChange={setType}
            required
          />

          {type !== 'custom' && (
            <DatePicker
              firstDayOfWeek="sunday"
              placeholder="Due Date"
              label="Due Date"
              value={eventDate}
              radius="md"
              onChange={setEventDate}
              minDate={new Date()}
              required={true}
            />
          )}
          {type == 'custom' && (
            <DateRangePicker
              label="Event Range"
              placeholder="Pick dates range"
              value={eventDate}
              onChange={setEventDate}
            />
          )}
          <br />
          <Button type="submit">Create </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateEvent;
