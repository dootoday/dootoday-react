import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Column } from './types';
import { ColumnResponse } from 'utils/datatypes';
import { ColMapper } from 'utils/mappers';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  dailyTask: [] as Column[],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getDailyTaskRequest: state => state,
    getDailyTaksSuccess: {
      reducer: (state, action: PayloadAction<Column[]>) => {
        state.dailyTask = action.payload;
        return state;
      },
      prepare: (colTasks: ColumnResponse[]) => {
        return { payload: colTasks.map(c => ColMapper(c)) };
      },
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
