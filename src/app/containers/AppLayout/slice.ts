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
  },
});

export const { actions, reducer, name: slicekey } = slice;
