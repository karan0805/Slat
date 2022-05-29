/* eslint-disable no-unused-vars */
import { Button, Group, Text, ActionIcon } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BsPlusCircle } from 'react-icons/bs';
import CreateTicket from '../../components/CreateTicket';
import Ticket from '../../components/Ticket';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';
import toast from 'react-hot-toast';
import { boardApi } from '../../api';

//Drag and Drop function
const onDragEnd = (result, columns, setColumns, isAdmin, boardDetails) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (!isAdmin && source.droppableId == 'waitingforApproval') {
    return toast.error("Sorry, You can't Approve this ticket");
  }

  if (
    source.droppableId != 'waitingforApproval' &&
    destination.droppableId == 'waitingforApproval'
  ) {
    return toast.error(
      "Sorry, Once Approved, You can't send back to Waiting for Approval",
    );
  }

  if (
    source.droppableId == 'waitingforApproval' &&
    destination.droppableId != 'todos'
  ) {
    return toast.error(
      'You can only approve the ticket by moving it to To DOs',
    );
  }

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn];
    const destItems = [...destColumn];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: [...sourceItems],
      [destination.droppableId]: [...destItems],
    });
    boardApi
      .updateBoardTickets({
        boardId: boardDetails._id,
        result,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Changes Saved');
        } else {
          toast.error('Something went wrong');
        }
      });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: [...copiedItems],
    });
    boardApi
      .updateBoardTicketsSameLevel({
        boardId: boardDetails._id,
        result,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Changes Saved');
        } else {
          toast.error('Something went wrong');
        }
      });
  }
};

export const Board = ({
  boardDetails,
  columns,
  setColumns,
  addTask,
  setAddTask,
}) => {
  const user = useSelector(selectUser);
  console.log('boardDetails', boardDetails);

  const isAdmin = (user) => {
    return (
      user._id === boardDetails?.project?.lead._id ||
      boardDetails?.project?.maintainers.filter(function (obj) {
        return obj._id === user._id;
      })
    );
  };

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
          width: '1200px',
          justifytitle: 'center',
          height: '450px',
          paddingTop: '30px',
          overflowX: 'scroll',
          overflowY: 'scroll',
        }}
      >
        <Button
          variant="filled"
          size="lg"
          radius={100}
          leftIcon={<BsPlusCircle />}
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '20px',
          }}
          onClick={() => setAddTask(true)}
        >
          Add Task
        </Button>
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, columns, setColumns, isAdmin(user), boardDetails)
          }
        >
          {Object.entries(columns).map(([columnId, column]) => {
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
                              : '#eeeeee80',
                            padding: 4,
                            width: '300px',
                            minHeight: '400px',
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
                                      <Ticket
                                        item={item}
                                        isAdmin={isAdmin(user)}
                                        boardDetails={boardDetails}
                                      />
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
