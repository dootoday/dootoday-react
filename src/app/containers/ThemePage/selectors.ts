import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { createMuiTheme } from '@material-ui/core';
import { SetStoredTheme } from 'utils/theme';

const selectDomain = (state: RootState) => state.themePage || initialState;

export const selectThemePage = createSelector(
  [selectDomain],
  themePageState => themePageState,
);

export const selectThemePresets = createSelector(
  selectThemePage,
  state => state.themePresets,
);

export const selectSelectedThemeResponse = createSelector(
  selectThemePage,
  state => {
    SetStoredTheme(state.selectedTheme);
    return state.selectedTheme;
  },
);

export const selectSelectedTheme = createSelector(
  selectSelectedThemeResponse,
  state => createMuiTheme(state.theme),
);
