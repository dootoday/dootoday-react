import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.subscribePage || initialState;

export const selectSubscribePage = createSelector(
  [selectDomain],
  subscribePageState => subscribePageState,
);

export const plansSelector = createSelector(
  [selectSubscribePage],
  state => state.plans,
);

export const promoValidSelector = createSelector(
  [selectSubscribePage],
  state => state.invalidPromo,
);
