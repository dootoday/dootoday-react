import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Column, dragNDropPayload } from './types';
import { ColumnResponse, TaskResponse } from 'utils/datatypes';
import { ColMapper, Today, TaskMapper } from 'utils/mappers';
import { Task } from 'app/components/TaskItem';
import { SetLastUpdated } from 'utils/auth';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  dailyTask: [] as Column[],
  columnTask: [] as Column[],
  dailyTaskStart: 10,
  dailyTaskStartMob: 11,
  columnTaskStart: 0,
  columnTaskStartMob: 0,
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
        state.dailyTaskStartMob = 11;
        return state;
      },
      prepare: (colTasks: ColumnResponse[]) => {
        return { payload: colTasks.map(c => ColMapper(c)) };
      },
    },
    getColumnTaskRequest: state => state,
    getColumnTaksSuccess: {
      reducer: (state, action: PayloadAction<Column[]>) => {
        state.columnTask = action.payload;
        state.columnTaskStart = 0;
        return state;
      },
      prepare: (colTasks: ColumnResponse[]) => {
        return { payload: colTasks.map(c => ColMapper(c)) };
      },
    },
    moveDailyTaskToHome: {
      reducer: (state, action: PayloadAction<{ idx: number }>) => {
        const idx = action.payload.idx;
        state.dailyTaskStartMob = idx;
        state.dailyTaskStart = idx - 1;
        if (idx > state.dailyTask.length - 5) {
          state.dailyTaskStart = state.dailyTask.length - 5;
        }
        return state;
      },
      prepare: (idx: number) => {
        return { payload: { idx } };
      },
    },
    moveDailyTask: {
      reducer: (state, action: PayloadAction<{ by: number }>) => {
        state.dailyTaskStart = state.dailyTaskStart + action.payload.by;
        if (state.dailyTaskStart > state.dailyTask.length - 5) {
          state.dailyTaskStart = state.dailyTask.length - 5;
        }
        if (state.dailyTaskStart < 0) {
          state.dailyTaskStart = 0;
        }
        state.dailyTaskStartMob = state.dailyTaskStartMob + action.payload.by;
        if (state.dailyTaskStartMob > state.dailyTask.length - 1) {
          state.dailyTaskStartMob = state.dailyTask.length - 1;
        }
        if (state.dailyTaskStartMob < 0) {
          state.dailyTaskStartMob = 0;
        }
        return state;
      },
      prepare: (by: number) => {
        return { payload: { by } };
      },
    },
    moveColumnTask: {
      reducer: (state, action: PayloadAction<{ by: number }>) => {
        state.columnTaskStart = state.columnTaskStart + action.payload.by;
        if (state.columnTaskStart > state.columnTask.length - 5) {
          state.columnTaskStart = state.columnTask.length - 5;
        }
        if (state.columnTaskStart < 0) {
          state.columnTaskStart = 0;
        }
        state.columnTaskStartMob = state.columnTaskStartMob + action.payload.by;
        if (state.columnTaskStartMob > state.columnTask.length - 1) {
          state.columnTaskStartMob = state.columnTask.length - 1;
        }
        if (state.columnTaskStartMob < 0) {
          state.columnTaskStartMob = 0;
        }
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
        SetLastUpdated('');
        const task = action.payload;
        if (task.date) {
          const idx = state.dailyTask.findIndex(t => t.id === task.date);
          if (idx > -1) {
            state.dailyTask[idx].tasks.push(TaskMapper(task));
          }
        } else {
          const idx = state.columnTask.findIndex(t => t.id === task.column_id);
          if (idx > -1) {
            state.columnTask[idx].tasks.push(TaskMapper(task));
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
        SetLastUpdated('');
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
    deleteTaskRequest: {
      reducer: state => state,
      prepare: (id: number) => {
        return { payload: { id } };
      },
    },
    deleteTaskSuccess: {
      reducer: (state, action: PayloadAction<{ taskID: number }>) => {
        SetLastUpdated('');
        const { taskID } = action.payload;
        for (let i = 0; i < state.dailyTask.length; i++) {
          for (let j = 0; j < state.dailyTask[i].tasks.length; j++) {
            if (state.dailyTask[i].tasks[j].id === taskID.toString()) {
              state.dailyTask[i].tasks = state.dailyTask[i].tasks.filter(
                (_, idx) => idx !== j,
              );
              break;
            }
          }
        }
        for (let i = 0; i < state.columnTask.length; i++) {
          for (let j = 0; j < state.columnTask[i].tasks.length; j++) {
            if (state.columnTask[i].tasks[j].id === taskID.toString()) {
              state.columnTask[i].tasks = state.columnTask[i].tasks.filter(
                (_, idx) => idx !== j,
              );
              break;
            }
          }
        }
        return state;
      },
      prepare: (taskID: number) => ({ payload: { taskID } }),
    },
    reposRequestLocal: {
      reducer: (state, action: PayloadAction<dragNDropPayload>) => {
        const { source, destination } = action.payload;
        let task = {} as Task;
        for (let i = 0; i < state.dailyTask.length; i++) {
          if (state.dailyTask[i].id === source.colID) {
            task = state.dailyTask[i].tasks[source.idx];
            state.dailyTask[i].tasks = state.dailyTask[i].tasks.filter(
              (_, index) => index !== source.idx,
            );
            break;
          }
        }
        for (let i = 0; i < state.columnTask.length; i++) {
          if (state.columnTask[i].id === source.colID) {
            task = state.columnTask[i].tasks[source.idx];
            state.columnTask[i].tasks = state.columnTask[i].tasks.filter(
              (_, index) => index !== source.idx,
            );
            break;
          }
        }
        for (let i = 0; i < state.dailyTask.length; i++) {
          if (state.dailyTask[i].id === destination.colID) {
            state.dailyTask[i].tasks.splice(destination.idx, 0, task);
            break;
          }
        }
        for (let i = 0; i < state.columnTask.length; i++) {
          if (state.columnTask[i].id === destination.colID) {
            state.columnTask[i].tasks.splice(destination.idx, 0, task);
            break;
          }
        }
        return state;
      },
      prepare: (data: dragNDropPayload) => {
        return { payload: data };
      },
    },

    reposRequest: {
      reducer: state => state,
      prepare: (data: { col: string; ids: number[] }) => {
        const { col, ids } = data;
        if (new Date(col).toString() !== 'Invalid Date') {
          return { payload: { date: col, task_ids: ids } };
        } else {
          return { payload: { column_id: col, task_ids: ids } };
        }
      },
    },

    reposSuccess: state => {
      SetLastUpdated('');
      return state;
    },

    colUpdateRequest: {
      reducer: state => state,
      prepare: (id: string, name: string) => {
        return { payload: { id, name } };
      },
    },

    colUpdateSuccess: {
      reducer: (state, action: PayloadAction<{ id: string; name: string }>) => {
        SetLastUpdated('');
        const idx = state.columnTask.findIndex(c => c.id === action.payload.id);
        if (idx > -1) {
          state.columnTask[idx].title = action.payload.name;
        }
        return state;
      },
      prepare: (id: string, name: string) => {
        return { payload: { id, name } };
      },
    },

    colCreateRequest: {
      reducer: state => state,
      prepare: (name: string) => {
        return { payload: { name } };
      },
    },

    colCreateSuccess: {
      reducer: (state, action: PayloadAction<Column>) => {
        SetLastUpdated('');
        state.columnTask.push(action.payload);
        state.columnTaskStartMob = state.columnTask.length - 1;
        state.columnTaskStart = state.columnTask.length - 5;
        return state;
      },
      prepare: (colTask: ColumnResponse) => {
        return { payload: ColMapper(colTask) };
      },
    },

    colDeleteRequest: {
      reducer: state => state,
      prepare: (id: string) => {
        return { payload: { id } };
      },
    },

    colDeleteSuccess: {
      reducer: (state, action: PayloadAction<{ id: string }>) => {
        SetLastUpdated('');
        state.columnTask = state.columnTask.filter(
          c => c.id !== action.payload.id,
        );
        return state;
      },
      prepare: (id: string) => {
        return { payload: { id } };
      },
    },
    clearAllTask: state => initialState,
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
