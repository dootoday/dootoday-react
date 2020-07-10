import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Column } from './types';
import { ColumnResponse, TaskResponse } from 'utils/datatypes';
import { ColMapper, Today, TaskMapper } from 'utils/mappers';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  dailyTask: [] as Column[],
  dailyTaskStart: 10,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getDailyTaskRequest: {
      reducer: state => state,
      prepare: (date: string) => {
        return { payload: { date } };
      },
    },
    getDailyTaksSuccess: {
      reducer: (state, action: PayloadAction<Column[]>) => {
        state.dailyTask = action.payload;
        state.dailyTaskStart = 10;
        return state;
      },
      prepare: (colTasks: ColumnResponse[]) => {
        return { payload: colTasks.map(c => ColMapper(c)) };
      },
    },
    moveDailyTask: {
      reducer: (state, action: PayloadAction<{ by: number }>) => {
        state.dailyTaskStart = state.dailyTaskStart + action.payload.by;
        return state;
      },
      prepare: (by: number) => {
        return { payload: { by } };
      },
    },
    createTaskRequest: {
      reducer: state => state,
      prepare: (
        markdown: string,
        date: string,
        column_id: string,
        is_done: boolean,
      ) => {
        if (date && !column_id) {
          const slectedDate = new Date(date).getTime();
          const today = new Date(Today()).getTime();
          is_done = slectedDate < today;
        }
        return { payload: { markdown, date, column_id, is_done } };
      },
    },
    createTaskSuccess: {
      reducer: (state, action: PayloadAction<TaskResponse>) => {
        const task = action.payload;
        if (task.date) {
          const idx = state.dailyTask.findIndex(t => t.id === task.date);
          if (idx > -1) {
            state.dailyTask[idx].tasks.push(TaskMapper(task));
          }
        }
        return state;
      },
      prepare: (task: TaskResponse) => ({ payload: task }),
    },

    updateTaskRequest: {
      reducer: state => state,
      prepare: (id: number, markdown: string, is_done: boolean) => {
        return { payload: { markdown, is_done, id } };
      },
    },
    updateTaskSuccess: {
      reducer: (state, action: PayloadAction<TaskResponse>) => {
        const task = action.payload;
        if (task.date) {
          const idx = state.dailyTask.findIndex(t => t.id === task.date);
          if (idx > -1) {
            const tidx = state.dailyTask[idx].tasks.findIndex(
              t => t.id === task.id.toString(),
            );
            state.dailyTask[idx].tasks[tidx] = TaskMapper(task);
          }
        }
        return state;
      },
      prepare: (task: TaskResponse) => ({ payload: task }),
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
