import React from 'react';
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
      task={{ id: 'sone-id', markdown: 'This is a task', isDone: false }}
      isEditable={true}
    />
    <TaskItem
      task={{ id: 'sone-id', markdown: 'This is a **task**', isDone: true }}
    />
  </>
);

export default {
  title: 'Task Item',
  component: TaskItem,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
