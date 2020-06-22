import React from 'react';
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

export const taskList = () => (
  <TaskList
    id={'some_id'}
    title={'Monday'}
    meta={'June 21, 2020'}
    titleEditable={true}
  />
);

export default {
  title: 'Task List',
  component: TaskList,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
