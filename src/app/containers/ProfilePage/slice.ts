import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ProfilePage container
export const initialState: ContainerState = {
  autoTaskMoveError: '',
  autoTaskMoveSubmitting: false,
};

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    updateAutoTaskMove: {
      reducer: state => {
        state.autoTaskMoveError = '';
        state.autoTaskMoveSubmitting = true;
        return state;
      },
      prepare: (enable: boolean) => {
        return { payload: { enable } };
      },
    },
    autoTaskMoveSuccess: state => {
      state.autoTaskMoveError = '';
      state.autoTaskMoveSubmitting = false;
      return state;
    },
    autoTaskMoveFailure: {
      reducer: (
        state: ContainerState,
        action: PayloadAction<{ error: string }>,
      ) => {
        state.autoTaskMoveError = action.payload.error;
        state.autoTaskMoveSubmitting = false;
        return state;
      },
      prepare: (error: string) => {
        return { payload: { error } };
      },
    },
  },
});

export const { actions, reducer, name: sliceKey } = profilePageSlice;
