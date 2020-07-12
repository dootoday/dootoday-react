import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.homePage || initialState;

export const selectHomePage = createSelector(
  [selectDomain],
  homePageState => homePageState,
);

export const selectDailyTask = createSelector(
  [selectHomePage],
  state => state.dailyTask,
);

export const selectColumnTask = createSelector(
  [selectHomePage],
  state => state.columnTask,
);

export const selectDailyTaskStart = createSelector([selectHomePage], state => ({
  pc: state.dailyTaskStart,
  mob: state.dailyTaskStartMob,
}));

export const selectColTaskStart = createSelector([selectHomePage], state => ({
  pc: state.columnTaskStart,
  mob: state.columnTaskStartMob,
}));
