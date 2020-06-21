import React from 'react';
import { TaskList } from 'app/components/TaskList';

export const taskList = () => (
  <div
    style={{
      height: '500px',
      width: '200px',
      padding: '80px 10px 0px 10px',
      position: 'relative',
      fontSize: '12px',
    }}
  >
    <TaskList></TaskList>
  </div>
);

export default {
  title: 'Task List',
  component: TaskList,
};
