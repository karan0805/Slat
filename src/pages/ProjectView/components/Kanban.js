import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Ticket from '../../../components/Ticket';

// import { SegmentedControl, Textarea, Button } from '@mantine/core';

const { uuid } = require('uuidv4');
//Column State
const columnsFromBackend = {
  [uuid()]: {
    name: 'Requested',
    items: [
      { id: uuid(), priority: 'High Priority', content: 'First task' },
      { id: uuid(), priority: 'Medium Priority', content: 'Second task' },
      { id: uuid(), priority: 'Low Priority', content: 'Third task' },
      { id: uuid(), priority: 'High Priority', content: 'Fourth task' },
      { id: uuid(), priority: 'High Priority', content: 'Fifth task' },
    ],
  },
  [uuid()]: {
    name: 'To do',
    items: [],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
};

//Add function
// const AddTask = (e, columns, columnId, setColumns) => {
//   e.preventDefault();

//   const data = {
//     id: uuid(),
//     priority: e.target.priority.value,
//     content: e.target.content.value,
//   };
//   console.log(data);
//   const addcolumn = columns[columnId];
//   console.log(addcolumn);
//   setColumns({
//     ...columns,
//     [columnId]: {
//       ...addcolumn,
//       items: data,
//     },
//   });
//   const addcolumn1 = columns[columnId];
//   console.log(addcolumn1);
// };

//Drag and Drop function
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
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
                          width: 250,
                          minHeight: 500,
                          borderWidth: 1,
                          borderStyle: 'solid',
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
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
              {/* <form onSubmit={(e) => AddTask(e, columns, columnId, setColumns)}>
                <SegmentedControl
                  name="priority"
                  fullWidth
                  data={[
                    { label: 'Low', value: 'Low Priority' },
                    { label: 'Medium', value: 'Medium Priority' },
                    { label: 'High', value: 'High Priority' },
                  ]}
                />
                <Textarea name="content" placeholder="Add task" required />
                <Button
                  type="submit"
                  style={{ margin: '3px' }}
                  size="xs"
                  variant="light"
                >
                  AddTask
                </Button>
              </form> */}
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
