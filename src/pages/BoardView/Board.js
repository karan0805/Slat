/* eslint-disable no-unused-vars */
import { Button, Group, Text, ActionIcon } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BsPlusCircle } from 'react-icons/bs';
import CreateTicket from '../../components/CreateTicket';
import Ticket from '../../components/Ticket';

//Drag and Drop function
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

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

export const Board = ({
  boardDetails,
  columns,
  setColumns,
  addTask,
  setAddTask,
}) => {
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
