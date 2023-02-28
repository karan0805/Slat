import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#4a4a4a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#4a4a4a',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Bot = ({ greet, user }) => {
  const steps = [
    {
      id: '0',
      message: greet,
      trigger: '3',
    },
    // {
    //   id: '1',
    //   message: 'Please write your Name',
    //   trigger: '2',
    // },
    // {
    //   id: '2',
    //   user: true,
    //   trigger: '3',
    // },
    {
      id: '3',
      message: ' hi ' + user.fullName + ', how can I help you?',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 'y', label: 'Project related help', trigger: 'project' },
        { value: 'z', label: 'Board related help', trigger: 'board' },
        { value: 'n', label: 'Reach out to us', trigger: 'reachout' },
      ],
    },
    {
      id: 'project',
      message: 'You can create a new project by clicking on the button above',
      trigger: 'res',
    },
    {
      id: 'board',
      message:
        'You can create a new board by going in the project view and adding a new board in it',
      trigger: 'next',
    },
    {
      id: 'next',
      message: 'View the types of member in board view',
      trigger: 'types',
    },
    {
      id: 'types',
      message: 'There are three types of members in board view',
      trigger: 'next1',
    },
    {
      id: 'next1',
      message: '1. Lead 2. Maintainer 3. Member',
      trigger: 'res',
    },
    {
      id: 'reachout',
      message: 'Send your query at slatquery@gmail.com',
      trigger: 'res',
    },
    {
      id: 'res',
      options: [
        { value: 'y', label: 'End chat', trigger: 'end' },
        { value: 'n', label: 'Restart', trigger: '4' },
      ],
    },
    {
      id: 'end',
      message: 'Thank you for using our service',
      end: true,
    },
  ];

  const config = {
    botAvatar:
      'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png',
    floating: true,
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Slat Assistant"
          speechSynthesis={{ enable: true, lang: 'en' }}
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </>
  );
};

export default Bot;
