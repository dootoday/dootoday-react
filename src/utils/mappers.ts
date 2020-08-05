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
  const meta = DateMapper(col.meta);
  return {
    id: col.id,
    title: col.name,
    meta: meta,
    tasks: col.tasks.map(t => TaskMapper(t)),
    active: col.meta === MapDateToString(new Date()),
  };
};

export const TaskMapper = (task: TaskResponse): Task => {
  return {
    id: task.id.toString(),
    markdown: task.markdown,
    isDone: task.is_done,
    recurringID: task.recurring_id.toString(),
  };
};

// For the components
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

// For the APIs
export const MapDateToString = (d: Date): string => {
  var dd: string | number = d.getDate();
  var mm: string | number = d.getMonth() + 1;
  var yyyy = d.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};

export const Today = (): string => {
  return MapDateToString(new Date());
};

export const GetDateRange = (start: string): string[] => {
  const d = new Date(start);
  const startDay = d.toString() === 'Invalid Date' ? new Date() : d;
  return [
    MapDateToString(GetDateByDays(startDay, -11)),
    MapDateToString(GetDateByDays(startDay, 11)),
  ];
};

export const GetDateByDays = (startDate: Date, addDay: number): Date => {
  return new Date(new Date(startDate).setDate(startDate.getDate() + addDay));
};
