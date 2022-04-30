/* eslint-disable no-unused-vars */
import { Group, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BsPlusCircle } from 'react-icons/bs';
import { uuid } from 'uuidv4';
import { boardApi } from '../../api';
import CreateTicket from '../../components/CreateTicket';
import Ticket from '../../components/Ticket';

const columnsFromBackend = {
  // waitingforApproval: [],
  // backlog: [],
  // design: [],
  todos: [
    {
      assignee_id: [],
      comments: [],
      status: 'open',
      priority: 'low',
      type: 'bug',
      _id: '626cd60e4dbe6c3e06162986',
      title: 'First Ticket',
      description: 's',
      createdAt: '2022-04-30T06:24:14.194Z',
      updatedAt: '2022-04-30T06:24:14.194Z',
      __v: 0,
    },
  ],
  inprogress: [
    {
      assignee_id: [],
      comments: [],
      status: 'open',
      priority: 'low',
      type: 'bug',
      _id: '626cd6124dbe6c3e06s6298b',
      title: 'Second Ticket',
      description: 's',
      createdAt: '2022-04-30T06:24:18.646Z',
      updatedAt: '2022-04-30T06:24:18.646Z',
      __v: 0,
    },
    {
      assignee_id: [],
      comments: [],
      status: 'open',
      priority: 'high',
      type: 'bug',
      _id: '626cd6124sbe6c3e0616298b',
      title: 'Sample Ticket',
      description: 's',
      createdAt: '2022-04-30T06:24:18.646Z',
      updatedAt: '2022-04-30T06:24:18.646Z',
      __v: 0,
    },
  ],
  inreview: [],
  testing: [],
  completed: [],
};

//Drag and Drop function
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn];
    const destItems = [...destColumn];
    console.log('sourceColumn', sourceColumn);
    console.log('destColumn', destColumn);
    console.log('sourceItems', sourceItems);
    console.log('destItems', destItems);

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: [...sourceItems],
      [destination.droppableId]: [...destItems],
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column];
    const [removed] = copiedItems.splice(source.index, 1);
    console.log(removed);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: [...copiedItems],
    });
  }
};

export const Board = ({ boardDetails }) => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [addTask, setAddTask] = useState(false);

  // useEffect(() => {
  //   boardApi
  //     .getBoardTickets({ boardId: boardDetails._id })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data.data);
  //         //setColumns(res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [addTask]);

  return (
    <>
      <CreateTicket
        addTask={addTask}
        setAddTask={setAddTask}
        boardDetails={boardDetails}
      />
      <div
        style={{
          display: 'flex',
          width: '1000px',
          justifytitle: 'center',
          height: '100%',
          paddingTop: '30px',
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            //console.log(columnId, column);
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                key={columnId}
              >
                <Group
                  direction="apart"
                  style={{ padding: '0 10px', justifytitle: 'space-between' }}
                >
                  <Text color="dimmed" style={{ fontWeight: '600' }}>
                    {columnId.toUpperCase()}
                  </Text>
                  {columnId === 'todos' && (
                    <BsPlusCircle onClick={() => setAddTask(true)} />
                  )}
                </Group>

                <div style={{ margin: 8, alignItems: 'center' }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightyellow'
                              : 'white',
                            padding: 4,
                            width: '300px',
                            minHeight: 500,
                          }}
                        >
                          {column.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Ticket item={item} />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};
