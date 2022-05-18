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

const Section4 = () => {
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
          Get
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
          Key Insights
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
        See data in real time. Dashboards let you gauge progress across teams
        and projects—without the manual effort on same page.
      </Text>
      <Space h="75px" />
      <Container size="xl">
        <Grid gutter="50">
          <Grid.Col lg={6} md={12}>
            <Group
              direction="column"
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
            >
              <Text size="lg" style={{ fontFamily: 'Inter', fontSize: '45px' }}>
                Get key insights without cobbling them together
              </Text>
              <Text size="lg" style={{ fontFamily: 'Inter', fontSize: '24px' }}>
                <Space h="md" />
                Using Slats Dashboard, getting key insights all at one place is
                easy. You can see the progress of your team and projects, and
                see the progress of your team and projects.
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
        </Grid>
      </Container>
    </Container>
  );
};

export default Section4;
