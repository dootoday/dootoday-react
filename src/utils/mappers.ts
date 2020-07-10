import { ColumnResponse, TaskResponse } from './datatypes';
import { Column } from 'app/containers/HomePage/types';
import { Task } from 'app/components/TaskItem';

export const Months = [
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

export const ColMapper = (col: ColumnResponse): Column => {
  return {
    id: col.id,
    title: col.name,
    meta: DateMapper(col.meta),
    tasks: col.tasks.map(t => TaskMapper(t)),
  };
};

export const TaskMapper = (task: TaskResponse): Task => {
  return {
    id: task.id.toString(),
    markdown: task.markdown,
    isDone: task.is_done,
  };
};

export const DateMapper = (d: string): string => {
  const thatDay = new Date(d);
  if (thatDay.toString() === 'Invalid Date') {
    return d;
  }
  const date = thatDay.getDate();
  const month = thatDay.getMonth();
  const year = thatDay.getFullYear();
  return `${date} ${Months[month]}, ${year}`;
};
