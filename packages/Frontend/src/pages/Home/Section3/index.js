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

const Section3 = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: '#F5F5F5',
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
          Save Time By Adopting
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
          Automation
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
        Don’t spend time on manual work. Let us do it for you. Streamline
        processes, make sure your team doesn’t miss critical steps,
        <br /> and deliver value faster with Automation.
      </Text>
      <Space h="75px" />
      <Container size="xl">
        <Grid gutter="50">
          <Grid.Col lg={6} md={12}>
            <Card shadow="xl" padding="xl" radius="lg">
              <Card.Section>
                <Image
                  radius="md"
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
                Save time for more important problems
              </Text>
              <Text size="lg" style={{ fontFamily: 'Inter', fontSize: '24px' }}>
                <Space h="md" />
                Make Assignment of tasks easy and fast with Automation. You can
                use Automation to assign tasks to your team members and make
                sure they are on time.
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

export default Section3;
