import { ColumnResponse, TaskResponse } from './datatypes';
import { Column } from 'app/containers/HomePage/types';
import { Task } from 'app/components/TaskItem';
import moment, { Moment } from 'moment';

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
  const sortedTasks = col.tasks
    .sort((t1, t2) => t1.order - t2.order)
    .map(t => TaskMapper(t));
  return {
    id: col.id,
    title: col.name,
    meta: meta,
    tasks: sortedTasks,
    active: col.meta === MapDateToString(moment().parseZone()),
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
  const thatDay = moment(d).parseZone();
  if (thatDay.toString() === 'Invalid Date') {
    return d;
  }
  const date = thatDay.date();
  const month = thatDay.month();
  const year = thatDay.year();
  return `${date} ${Months[month]}, ${year}`;
};

// For the APIs
export const MapDateToString = (d: Moment): string => {
  var dd: string | number = d.date();
  var mm: string | number = d.month() + 1;
  var yyyy = d.year();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};

export const Today = (): string => {
  return MapDateToString(moment().parseZone());
};

export const GetDateRange = (start: string): string[] => {
  const d = moment(start).parseZone();
  const startDay = d.toString() === 'Invalid Date' ? moment().parseZone() : d;
  return [
    MapDateToString(GetDateByDays(startDay, -11)),
    MapDateToString(GetDateByDays(startDay, 11)),
  ];
};

export const GetDateByDays = (startDate: Moment, addDay: number): Moment => {
  return moment(startDate).add(addDay, 'days');
};
