import React from 'react';
import { action } from '@storybook/addon-actions';
import { TaskItem } from 'app/components/TaskItem';
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[400],
      dark: red[600],
      light: red[100],
    },
  },
});

export const taskItem = () => (
  <>
    <TaskItem
      task={{ id: 'some-id', markdown: 'This is a task', isDone: false }}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />
    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is a **non editable** task',
        isDone: true,
      }}
    />
    <TaskItem
      task={{
        id: 'some-id',
        markdown:
          'This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text.',
        isDone: false,
      }}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />

    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is highlighted task',
        isDone: false,
      }}
      highlight={true}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />

    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is highlighted task with theme',
        isDone: false,
      }}
      theme={theme}
      highlight={true}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />

    <TaskItem
      task={{
        id: '0',
        markdown: 'hello',
        isDone: false,
      }}
      isJustInput={true}
      placeHolder="Add a new task here"
      onTaskUpdate={action('task added')}
    />

    <TaskItem
      task={{
        id: '0',
        markdown: 'hello',
        isDone: false,
      }}
      highlight={true}
      isJustInput={true}
      placeHolder="Add a new task here"
      onTaskUpdate={action('task added')}
    />
  </>
);

export default {
  title: 'Task Item',
  component: TaskItem,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
