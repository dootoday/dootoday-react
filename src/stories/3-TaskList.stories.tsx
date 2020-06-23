import React from 'react';
import { action } from '@storybook/addon-actions';
import { TaskList } from 'app/components/TaskList';

const Container = ({ children }) => (
  <div
    style={{
      height: '300px',
      width: '250px',
      padding: '80px 10px 0px 10px',
      position: 'relative',
    }}
  >
    {children}
  </div>
);

const tasks = [
  { id: 'some-id-1', markdown: 'This is task 1', isDone: false },
  { id: 'some-id-2', markdown: 'This is task 2', isDone: false },
];

export const taskList = () => (
  <TaskList
    id={'some_id'}
    title={'Monday'}
    meta={'June 21, 2020'}
    tasks={tasks}
    titleEditable={true}
    onTitleChange={action('title changed')}
  />
);

export default {
  title: 'Task List',
  component: TaskList,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
