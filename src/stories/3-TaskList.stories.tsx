import React from 'react';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskList } from 'app/components/TaskList';

const Container = ({ children }) => (
  <div
    style={{
      height: '300px',
      width: 'auto',
      padding: '80px 10px 0px 10px',
      position: 'relative',
    }}
  >
    <DragDropContext onDragEnd={action('on drag drop')}>
      {children}
    </DragDropContext>
  </div>
);

const tasks = [
  {
    id: 'some-id-1',
    markdown: 'This is task 1',
    isDone: false,
    recurringID: '0',
  },
  {
    id: 'some-id-2',
    markdown: 'This is task 2',
    isDone: false,
    recurringID: '0',
  },
  {
    id: 'some-id-3',
    markdown: 'This is task 3',
    isDone: false,
    recurringID: '0',
  },
  {
    id: 'some-id-4',
    markdown: 'This is task 4',
    isDone: false,
    recurringID: '0',
  },
];

export const taskList = () => (
  <div
    style={{
      display: 'flex',
      width: '600px',
      justifyContent: 'space-around',
      height: '500px',
    }}
  >
    <div style={{ width: '250px' }}>
      <TaskList
        id={'some_id_1'}
        title={'Monday'}
        meta={'June 21, 2020'}
        tasks={[tasks[0], tasks[2]]}
        titleEditable={false}
        onTaskAdd={action('task add')}
        onTaskUpdate={action('task update')}
        onTitleChange={action('title changed')}
      />
    </div>
    <div style={{ minWidth: '250px' }}>
      <TaskList
        id={'some_id_2'}
        title={'Editable'}
        meta={'June 21, 2020'}
        tasks={[tasks[1], tasks[3]]}
        highlight={true}
        titleEditable={true}
        onTaskAdd={action('task add')}
        onTaskUpdate={action('task update')}
        onTitleChange={action('title changed')}
      />
    </div>
  </div>
);

export default {
  title: 'Task List',
  component: TaskList,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
