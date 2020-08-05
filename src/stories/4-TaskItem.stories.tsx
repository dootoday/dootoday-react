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
      task={{
        id: 'some-id',
        markdown: 'This is a task',
        isDone: false,
        recurringID: '0',
      }}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />
    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is a **non editable** task',
        isDone: true,
        recurringID: '0',
      }}
    />
    <TaskItem
      task={{
        id: 'some-id',
        markdown:
          'This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text.',
        isDone: false,
        recurringID: '0',
      }}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />

    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is highlighted task',
        isDone: false,
        recurringID: '0',
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
        recurringID: '0',
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
        recurringID: '0',
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
        recurringID: '0',
      }}
      highlight={true}
      isJustInput={true}
      placeHolder="Add a new task here"
      onTaskUpdate={action('task added')}
    />

    <TaskItem
      task={{
        id: 'some-id',
        markdown: 'This is a tsak with emoji :smiley:',
        isDone: false,
        recurringID: '0',
      }}
      theme={theme}
      isEditable={true}
      onTaskUpdate={action('task updated')}
    />
  </>
);

export default {
  title: 'Task Item',
  component: TaskItem,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
