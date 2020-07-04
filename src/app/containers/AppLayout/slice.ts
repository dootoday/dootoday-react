import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ContainerState, UserDetails } from './types';

export const initialState: ContainerState = {
  userfetched: false,
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
        return { userfetched: true, userDetails: { ...action.payload } };
      },
      prepare: (userDetails: UserDetails) => {
        return { payload: userDetails };
      },
    },
    deleteUserDetails: state => initialState,
  },
});

export const { actions, reducer, name: slicekey } = slice;
