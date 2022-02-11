/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Text,
  Textarea,
  ThemeIcon,
} from '@mantine/core';
import moment from 'moment';
import { BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../redux/slices/UserSlice';
import Members from '../OrganizationSettings/components/Members';

export const Time = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 4px;
  color: #1e1f21;
  font-weight: 500;
  font-family: 'Segoe UI';
`;

export const Greet = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  line-height: 40px;
  color: #1e1f21;
  font-weight: 400;
  font-family: 'Segoe UI';
  margin-bottom: 100px;
`;

const Dashboard = () => {
  const user = useSelector(selectUser);
  var myDate = new Date();
  var hrs = myDate.getHours();

  let greet;

  if (hrs < 12) greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';

  return (
    <>
      <Container>
        <Time>{moment().format('dddd, MMMM D')}</Time>
        <Greet>
          {greet}, {user.fullName}
        </Greet>
        <Grid grow>
          <Grid.Col span={6}>
            <Card radius="md" shadow="sm" withBorder>
              <Text weight={500} size="xl">
                Add Notes
              </Text>
              <Space h="30px" />
              <Text size="sm">
                <Textarea
                  placeholder="Start typing..."
                  variant="unstyled"
                  autosize
                  minRows={3}
                  size="md"
                />
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card radius="md" shadow="sm" withBorder>
              <Text weight={500} size="xl">
                Projects
              </Text>
              <Space h="30px" />

              <Text size="sm">
                <SimpleGrid cols={2}>
                  <Box>
                    <Group>
                      <ThemeIcon variant="light" size="lg" color="pink">
                        <BiPlus />
                      </ThemeIcon>
                      <Text>Create Project</Text>
                    </Group>
                  </Box>

                  <Box>
                    <Group>
                      <Avatar
                        src={`https://avatars.dicebear.com/api/identicon/Slat.svg`}
                        radius="md"
                        size="md"
                      />
                      <Text>Slat</Text>
                    </Group>
                  </Box>
                  <Box>
                    <Group>
                      <Avatar
                        src={`https://avatars.dicebear.com/api/identicon/hireme.svg`}
                        radius="sm"
                      />
                      <Text>Hire Me</Text>
                    </Group>
                  </Box>
                </SimpleGrid>
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card radius="md" shadow="sm" withBorder>
              <Text weight={500} size="xl">
                Members
              </Text>
              <Space h="10px" />
              <Members />
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
