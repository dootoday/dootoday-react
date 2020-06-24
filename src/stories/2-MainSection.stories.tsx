import React from 'react';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { MainSection, TaskColumn } from 'app/components/MainSection';
import { Task } from 'app/components/TaskItem';

const Container = ({ children }) => (
  <div>
    <DragDropContext onDragEnd={action('on drag drop')}>
      {children}
    </DragDropContext>
  </div>
);

const getTaskColumns = (): TaskColumn[] => {
  const today = new Date();
  const startDay = new Date(new Date().setDate(today.getDate() - 10));
  const endDay = new Date(new Date().setDate(today.getDate() + 10));
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let output: TaskColumn[] = [];
  for (var d = startDay; d <= endDay; d.setDate(d.getDate() + 1)) {
    const thatDay = new Date(d);
    const title = days[thatDay.getDay()];
    const date = thatDay.getDate();
    const month = thatDay.getMonth();
    const year = thatDay.getFullYear();
    const id = `${date < 10 ? '0' + date : date}${
      month < 10 ? '0' + month : month
    }${year}`;
    const taskCount = Math.floor(Math.random() * 10);
    let tasks: Task[] = [];
    for (var i = 0; i < taskCount; i++) {
      tasks.push({
        id: 'some-id-' + id + i,
        markdown: 'This is task ' + id + i,
        isDone: false,
      });
    }
    output.push({
      id: id,
      title: title,
      meta: 'Some text',
      tasks: tasks,
    });
  }
  return output;
};

export const MainSec = () => (
  <div style={{ height: '500px' }}>
    <MainSection
      taskColumns={getTaskColumns()}
      onTaskAdd={action('task add')}
      onTaskUpdate={action('task update')}
    ></MainSection>
  </div>
);

export default {
  title: 'Main Section',
  component: MainSection,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
