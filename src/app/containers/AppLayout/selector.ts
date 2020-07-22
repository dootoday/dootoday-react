import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';
import { createMuiTheme } from '@material-ui/core';
import { SetStoredTheme } from 'utils/theme';

export const appSelector = (state: RootState) => state.applayout;

export const userSelector = createSelector(
  appSelector,
  state => state?.userDetails,
);

export const userFetchedSelector = createSelector(
  appSelector,
  state => state?.userfetched,
);

export const userThemeSelector = createSelector(userSelector, state => {
  SetStoredTheme(state?.theme);
  return createMuiTheme(state?.theme);
});
