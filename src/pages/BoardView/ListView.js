import {
  Badge,
  Center,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import moment from 'moment';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Selector } from 'tabler-icons-react';

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

function filterData(listviewdata, search) {
  const keys = Object.keys(listviewdata[0]);
  const query = search.toLowerCase().trim();
  return listviewdata.filter((item) =>
    keys.some((key) => item[key].toString().toLowerCase().includes(query)),
  );
}

function sortData(listviewdata, payload) {
  if (!payload.sortBy) {
    return filterData(listviewdata, payload.search);
  }

  return filterData(
    [...listviewdata].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search,
  );
}

const statusBadge = (status) => {
  if (status === 'open') {
    return (
      <Badge size="lg" color="red">
        Not Started
      </Badge>
    );
  } else if (status === 'in-progress') {
    return (
      <Badge color="green" size="lg">
        In Progress{' '}
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
  if (priority === 'low') {
    return (
      <Badge size="lg" color="Yellow">
        Low Priority
      </Badge>
    );
  } else if (priority === 'medium') {
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

export function ListView({ listviewdata }) {
  const [sortedData, setSortedData] = useState(listviewdata);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(listviewdata, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(listviewdata, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    );
  };

  const rows = sortedData.map(
    (row) =>
      !row.isDeleted && (
        <tr key={row._id}>
          <td>{row.title}</td>
          <td>{statusBadge(row.status)}</td>
          <td>{priorityBadge(row.priority)}</td>
          <td> {row.assignee ? row.assignee : 'Not Assigned'}</td>
          <td>{moment(row.dueDate).format('LL')}</td>
        </tr>
      ),
  );

  return (
    <ScrollArea style={{ paddingTop: '30px' }}>
      <TextInput
        placeholder="Search by title"
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
              sorted={sortBy === 'title'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('title')}
            >
              Ticket
            </Th>
            <Th
              sorted={sortBy === 'status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('status')}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === 'priority'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('priority')}
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
            <Th
              sorted={sortBy === 'dueDate'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dueDate')}
            >
              Due Date
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={5}>
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
