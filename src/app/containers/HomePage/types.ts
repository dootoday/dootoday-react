/* --- STATE --- */

import { Task as ITask } from 'app/components/TaskItem';
import { TaskColumn } from 'app/components/MainSection';

// This is the column response
export type Column = TaskColumn;
export type Task = ITask;

export interface HomePageState {
  dailyTask: Column[];
  columnTask: Column[];
  dailyTaskStart: number;
  dailyTaskStartMob: number;
  columnTaskStart: number;
  columnTaskStartMob: number;
}

export interface dragNDropPayload {
  taskID: string;
  source: { colID: string; idx: number };
  destination: { colID: string; idx: number };
}

export type ContainerState = HomePageState;
