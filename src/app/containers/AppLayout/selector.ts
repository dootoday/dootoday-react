import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

export const appSelector = (state: RootState) => state.applayout;

export const userSelector = createSelector(
  appSelector,
  state => state?.userDetails,
);

export const userFetchedSelector = createSelector(
  appSelector,
  state => state?.userfetched,
);

export const userAuthProblemSelector = createSelector(
  appSelector,
  state => state?.authProblem,
);
