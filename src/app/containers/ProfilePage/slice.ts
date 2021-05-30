import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ProfilePage container
export const initialState: ContainerState = {
  error: '',
  autoTaskMoveSubmitting: false,
  emailUpdateSubmitting: false,
};

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    updateAutoTaskMove: {
      reducer: state => {
        state.error = '';
        state.autoTaskMoveSubmitting = true;
        return state;
      },
      prepare: (enable: boolean) => {
        return { payload: { enable } };
      },
    },
    autoTaskMoveSuccess: state => {
      state.error = '';
      state.autoTaskMoveSubmitting = false;
      return state;
    },
    autoTaskMoveFailure: {
      reducer: (
        state: ContainerState,
        action: PayloadAction<{ error: string }>,
      ) => {
        state.error = action.payload.error;
        state.autoTaskMoveSubmitting = false;
        return state;
      },
      prepare: (error: string) => {
        return { payload: { error } };
      },
    },
    updateDailyEmailUpdate: {
      reducer: state => {
        state.error = '';
        state.emailUpdateSubmitting = true;
        return state;
      },
      prepare: (enable: boolean) => {
        return { payload: { enable } };
      },
    },
    updateDailyEmailUpdateSuccess: state => {
      state.error = '';
      state.emailUpdateSubmitting = false;
      return state;
    },
    updateDailyEmailUpdateFailure: {
      reducer: (
        state: ContainerState,
        action: PayloadAction<{ error: string }>,
      ) => {
        state.error = action.payload.error;
        state.emailUpdateSubmitting = false;
        return state;
      },
      prepare: (error: string) => {
        return { payload: { error } };
      },
    },
  },
});

export const { actions, reducer, name: sliceKey } = profilePageSlice;
