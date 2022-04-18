import React, { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Badge,
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(query)),
  );
}

function sortData(data, payload) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search,
  );
}

const data = [
  {
    name: 'Athena Weissnat',
    status: '0',
    priority: '1',
    assignee: 'Sanket',
  },
  {
    name: 'Deangelo Runolfsson',
    status: '0',
    priority: '2',
    assignee: 'Karan',
  },
  {
    name: 'Danny Carter',
    status: '1',
    priority: '0',
    assignee: 'Yagvalkya',
  },
  {
    name: 'Trace Tremblay PhD',
    status: '2',
    priority: '2',
    assignee: 'Karan',
  },
  {
    name: 'Derek Dibbert',
    status: '2',
    priority: '1',
    assignee: 'Hitesh',
  },
  {
    name: 'Viola Bernhard',
    status: '1',
    priority: '0',
    assignee: 'Sanket',
  },
];

const statusBadge = (status) => {
  if (status === '0') {
    return (
      <Badge size="lg" color="red">
        Not Started
      </Badge>
    );
  } else if (status === '1') {
    return (
      <Badge color="green" size="lg">
        On-Going
      </Badge>
    );
  } else {
    return (
      <Badge color="blue" size="lg">
        Completed
      </Badge>
    );
  }
};

const priorityBadge = (priority) => {
  if (priority === '0') {
    return (
      <Badge size="lg" color="Yellow">
        Low Priority
      </Badge>
    );
  } else if (priority === '1') {
    return (
      <Badge color="orange" size="lg">
        Medium Priority
      </Badge>
    );
  } else {
    return (
      <Badge color="red" size="lg">
        High Priority
      </Badge>
    );
  }
};

export function ListView() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{statusBadge(row.priority)}</td>
      <td>{priorityBadge(row.status)}</td>
      <td> {row.assignee}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by Name"
        mb="md"
        icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Ticket Name
            </Th>
            <Th
              sorted={sortBy === 'priority'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('priority')}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === 'status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('status')}
            >
              Priority Level
            </Th>
            <Th
              sorted={sortBy === 'assignee'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('assignee')}
            >
              Assignee
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
