import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { MainSection } from 'app/components/MainSection/Loadable';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskColumn } from 'app/components/MainSection';
import { Task } from 'app/components/TaskItem';
import { LoginManager } from 'app/components/LoginManager';

export function HomePage() {
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
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
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
        meta: `${date} ${months[month]}, ${year}`,
        active: thatDay.getTime() === today.getTime(),
        tasks: tasks,
      });
    }
    return output;
  };

  const taskCols = getTaskColumns();
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar variant="dense" style={{ minHeight: '34px' }}>
          <Typography variant="h6">DooToday</Typography>
          <LoginManager />
        </Toolbar>
      </AppBar>
      <div>
        <DragDropContext onDragEnd={e => console.log(e)}>
          <MainSection
            taskColumns={taskCols}
            startIndex={9}
            showDateNav={true}
            showHomeNav={true}
          ></MainSection>
        </DragDropContext>
      </div>
    </>
  );
}
