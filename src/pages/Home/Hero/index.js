import {
  Container,
  Group,
  Button,
  Space,
  Input,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { ReactComponent as Feature1 } from '../../../assets/svgs/feature1.svg';
import { ReactComponent as Feature2 } from '../../../assets/svgs/feature2.svg';
import { ReactComponent as Feature3 } from '../../../assets/svgs/feature3.svg';
import { ReactComponent as Feature4 } from '../../../assets/svgs/feature4.svg';
import { ReactComponent as Feature5 } from '../../../assets/svgs/feature5.svg';
import { ReactComponent as Feature6 } from '../../../assets/svgs/feature6.svg';
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const nav = useNavigate();
  return (
    <Container
      fluid
      style={{ backgroundColor: 'black', height: '100vh', paddingTop: '150px' }}
    >
      <Group position="center" direction="column">
        <Title
          order={1}
          style={{
            fontWeight: '800',
            fontSize: '68px',
            lineHeight: '88px',
            color: '#ffffff',
            fontFamily: 'Inter',
          }}
        >
          Try the World&apos;s Coolest
        </Title>
        <Title
          order={1}
          style={{
            fontWeight: '700',
            fontSize: '68px',
            lineHeight: '80px',
            color: '#ffffff',
            fontFamily: 'Inter',
            backgroundImage:
              'repeating-linear-gradient(45deg, #3c81f6, #9d55ff 20%, #833ab4 40%, #c13584 60%, #e1306c 80%, #fd1d1d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Project Planning Software
        </Title>
      </Group>
      <Space h="25px" />
      <Container>
        <Text
          align="center"
          weight="400"
          style={{
            color: '#cccccc',
            lineHeight: '32px',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
        >
          Slat is a workflow management tool for defining, managing, and
          improving services that deliver knowledge work. It helps you visualize
          your work, maximize efficiency, and improve continuously.
        </Text>
      </Container>
      <Space h="60px" />
      <Group position="center">
        <Button
          radius="xl"
          size="lg"
          color="yellow"
          onClick={() => {
            nav('/auth/login');
          }}
        >
          Plan Your First Project
        </Button>
      </Group>
      <Space h="60px" />
      <Container>
        <Group position="center" grow>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature1 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature1
            </Text>
          </Group>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature2 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature2
            </Text>
          </Group>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature3 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature3
            </Text>
          </Group>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature4 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature4
            </Text>
          </Group>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature5 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature5
            </Text>
          </Group>
          <Group
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Feature6 />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature6
            </Text>
          </Group>
        </Group>
      </Container>
      <Space h="85px" />
      <Container>
        <Group position="center">
          <Input
            icon={<HiOutlineMail />}
            placeholder="Your email"
            radius="xl"
            size="md"
            style={{ width: '350px' }}
          />
          <Button radius="lg" size="md" color="pink">
            Subscribe
          </Button>
        </Group>
      </Container>
    </Container>
  );
};

export default Hero;
