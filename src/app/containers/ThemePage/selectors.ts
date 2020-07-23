import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.themePage || initialState;

export const selectThemePage = createSelector(
  [selectDomain],
  themePageState => themePageState,
);
