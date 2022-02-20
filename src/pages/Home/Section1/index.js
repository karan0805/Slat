import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Space,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import img from '../../../assets/images/dashboard.png';

const Section1 = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: '#F5F5F5',
        height: '100vh',
        paddingTop: '150px',
      }}
    >
      <Group position="center">
        <Title
          order={1}
          style={{
            fontWeight: '800',
            fontSize: '50px',
            lineHeight: '60px',
            color: '#111111',
            fontFamily: 'Inter',
          }}
        >
          Kanban
        </Title>
        <Title
          order={1}
          style={{
            fontWeight: '700',
            fontSize: '50px',
            lineHeight: '60px',
            color: '#111111',
            fontFamily: 'Inter',
            backgroundImage:
              'repeating-linear-gradient(45deg, #3c81f6, #9d55ff 20%, #833ab4 40%, #c13584 60%, #e1306c 80%, #fd1d1d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Boards
        </Title>
      </Group>
      <Space h="15px" />
      <Text
        align="center"
        weight="400"
        style={{
          color: '#111111',
          lineHeight: '32px',
          fontSize: '20px',
          fontFamily: 'Inter',
          fontWeight: '400',
        }}
      >
        Visualize your progress on digital Kanban boards and see your team move
        tasks from to-do to done.
      </Text>
      <Space h="75px" />
      <Container size="xl">
        <Grid gutter="50">
          <Grid.Col lg={6} md={12}>
            <Card shadow="xl" padding="xl" radius="lg">
              <Card.Section>
                <Image
                  radius="md"
                  height="384px"
                  src={img}
                  alt="Random"
                  withPlaceholder
                  fit="contain"
                />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col lg={6} md={12}>
            <Group
              direction="column"
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
            >
              <Text size="lg" style={{ fontFamily: 'Inter', fontSize: '45px' }}>
                Create and manage Kanban boards online with Slat
              </Text>
              <Text size="lg" style={{ fontFamily: 'Inter', fontSize: '24px' }}>
                <Space h="md" />
                Visualize your progress on digital Kanban boards and see your
                team move tasks from to-do to done.
                <Space h="md" />
                <Group>
                  <Button
                    radius="md"
                    size="lg"
                    style={{ backgroundColor: '#796eff' }}
                  >
                    Learn more
                  </Button>
                </Group>
                <Space h="75px" />
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
};

export default Section1;
