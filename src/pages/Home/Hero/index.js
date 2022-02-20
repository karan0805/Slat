import {
  Button,
  Container,
  Group,
  Input,
  Space,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as About } from '../../../assets/svgs/about.svg';
import { ReactComponent as Campaign } from '../../../assets/svgs/campaign.svg';
import { ReactComponent as Design } from '../../../assets/svgs/design.svg';
import { ReactComponent as Listed } from '../../../assets/svgs/listed.svg';
import { ReactComponent as Sale } from '../../../assets/svgs/sale.svg';
import { ReactComponent as Store } from '../../../assets/svgs/store.svg';

const Hero = () => {
  const nav = useNavigate();
  return (
    <Container
      fluid
      style={{
        backgroundColor: 'black',
        height: '100vh',
        minHeight: '840px',
        paddingTop: '200px',
      }}
    >
      <Group position="center" direction="column" spacing="xs">
        <Title
          order={1}
          style={{
            fontWeight: '800',
            fontSize: '68px',
            lineHeight: '66px',
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
            onClick={() => {
              nav('/about');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <About />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature
            </Text>
          </Group>
          <Group
            onClick={() => {
              nav('/nft-listed');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Listed />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature{' '}
            </Text>
          </Group>
          <Group
            onClick={() => {
              nav('/nft-sale');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Sale />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature{' '}
            </Text>
          </Group>
          <Group
            onClick={() => {
              nav('/cotton-designs');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Design />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature
            </Text>
          </Group>
          <Group
            onClick={() => {
              nav('/store');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Store />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature
            </Text>
          </Group>
          <Group
            onClick={() => {
              nav('/campaign');
            }}
            direction="column"
            position="center"
            sx={() => ({
              transition: 'all 0.5s ease',

              '&:hover': {
                transform: 'translateY(-20px)',
              },
            })}
          >
            <Campaign />
            <Text
              style={{
                color: '#cccccc',
                lineHeight: '32px',
                fontSize: '20px',
                fontFamily: 'Inter',
                fontWeight: '600',
              }}
            >
              Feature{' '}
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
