import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ContainerState, UserDetails } from './types';
import { GetStoredTheme } from 'utils/theme';

export const initialState: ContainerState = {
  userfetched: false,
  userDetails: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    leftDays: 0,
    theme: GetStoredTheme(),
  },
};

const slice = createSlice({
  name: 'applayout',
  initialState,
  reducers: {
    getUserDetailsRequest: state => state,
    getUserDetailsSuccess: {
      reducer: (state, action: PayloadAction<UserDetails>) => {
        return {
          userfetched: true,
          userDetails: { ...state.userDetails, ...action.payload },
        };
      },
      prepare: (userDetails: UserDetails) => {
        return { payload: userDetails };
      },
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
