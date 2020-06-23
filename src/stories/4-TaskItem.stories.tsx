import React from 'react';
import { action } from '@storybook/addon-actions';
import { TaskItem } from 'app/components/TaskItem';

const Container = ({ children }) => (
  <div
    style={{
      width: '250px',
      margin: 'auto',
      position: 'relative',
      border: '1px solid',
      padding: '10px',
    }}
  >
    {children}
  </div>
);

export const taskItem = () => (
  <>
    <TaskItem
      task={{ id: 'some-id', markdown: 'This is a task', isDone: false }}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />
    <TaskItem
      task={{ id: 'some-id', markdown: 'This is a **task**', isDone: true }}
    />
    <TaskItem
      task={{
        id: 'some-id',
        markdown:
          'This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text.',
        isDone: false,
      }}
      onTaskUpdate={action('task updated')}
    />
  </>
);

export default {
  title: 'Task Item',
  component: TaskItem,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
