import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ContainerState, UserDetails } from './types';

export const initialState: ContainerState = {
  userfetched: false,
  authProblem: false,
  userDetails: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    leftDays: 0,
    isAutoTaskMoveOn: false,
    isDailyEmailUpdateOn: false,
  },
};

const slice = createSlice({
  name: 'applayout',
  initialState,
  reducers: {
    getUserDetailsRequest: state => state,
    getUserDetailsSuccess: {
      reducer: (state, action: PayloadAction<UserDetails>) => {
        state.userfetched = true;
        state.userDetails = action.payload;
        state.authProblem = false;
        return state;
      },
      prepare: (userDetails: UserDetails) => {
        return { payload: userDetails };
      },
    },
    getUserDetailsFailure: state => {
      state.authProblem = true;
      return state;
    },
    updateLeftDays: {
      reducer: (state, action: PayloadAction<{ days: number }>) => {
        state.userDetails.leftDays += action.payload.days;
        return state;
      },
      prepare: (days: number) => {
        return { payload: { days } };
      },
    },
    deleteUserDetails: state => initialState,
    updateUserTimeZoneOffset: {
      reducer: state => state,
      prepare: (offset: number) => {
        return { payload: { offset } };
      },
    },
    updateTaskAutoMove: {
      prepare: (enable: boolean) => {
        return { payload: { enable } };
      },
      reducer: (
        state: ContainerState,
        action: PayloadAction<{ enable: boolean }>,
      ) => {
        state.userDetails.isAutoTaskMoveOn = action.payload.enable;
        return state;
      },
    },
    updateDailyEmailUpdate: {
      prepare: (enable: boolean) => {
        return { payload: { enable } };
      },
      reducer: (
        state: ContainerState,
        action: PayloadAction<{ enable: boolean }>,
      ) => {
        state.userDetails.isDailyEmailUpdateOn = action.payload.enable;
        return state;
      },
    },
  },
});

export const { actions, reducer, name: slicekey } = slice;
