/* --- STATE --- */

import { Task as ITask } from 'app/components/TaskItem';
import { TaskColumn } from 'app/components/MainSection';

// This is the column response
export type Column = TaskColumn;
export type Task = ITask;

export interface HomePageState {
  dailyTask: Column[];
  dailyTaskStart: number;
}

export type ContainerState = HomePageState;
