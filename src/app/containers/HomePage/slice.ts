import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Column } from './types';
import { ColumnResponse } from 'utils/datatypes';
import { ColMapper } from 'utils/mappers';

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
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
