import React from 'react';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { MainSection, TaskColumn } from 'app/components/MainSection';

const Container = ({ children }) => (
  <div>
    <DragDropContext onDragEnd={action('on drag drop')}>
      {children}
    </DragDropContext>
  </div>
);

// const getTaskColumns = () => {
//   const startDate = new Date();

// };

const cols: TaskColumn[] = [
  {
    id: '20022020',
    title: 'Monday',
    meta: '20 Feb, 2020',
    tasks: [
      { id: 'some-id-1', markdown: 'This is task 1', isDone: false },
      { id: 'some-id-2', markdown: 'This is task 2', isDone: false },
      { id: 'some-id-3', markdown: 'This is task 3', isDone: false },
      { id: 'some-id-4', markdown: 'This is task 4', isDone: false },
    ],
  },
  {
    id: '21022020',
    title: 'Tuesday',
    meta: '21 Feb, 2020',
    tasks: [
      { id: 'some-id-5', markdown: 'This is task 5', isDone: false },
      { id: 'some-id-6', markdown: 'This is task 6', isDone: false },
      { id: 'some-id-7', markdown: 'This is task 7', isDone: false },
      { id: 'some-id-8', markdown: 'This is task 8', isDone: false },
    ],
  },
];

export const MainSec = () => (
  <div style={{ height: '500px' }}>
    <MainSection taskColumns={cols}></MainSection>
  </div>
);

export default {
  title: 'Main Section',
  component: MainSection,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
