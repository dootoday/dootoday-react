import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { mockthemeresps, GetStoredTheme } from 'utils/theme';
import { ThemeResponse } from 'utils/datatypes';

// The initial state of the ThemePage container
export const initialState: ContainerState = {
  themePresets: mockthemeresps,
  selectedTheme: GetStoredTheme(),
};

const themePageSlice = createSlice({
  name: 'themePage',
  initialState,
  reducers: {
    getThemes: state => state,
    getThemesSuccess: {
      reducer: (state, action: PayloadAction<ThemeResponse[]>) => {
        state.themePresets = action.payload;
        return state;
      },
      prepare: (themes: ThemeResponse[]) => {
        return { payload: themes };
      },
    },
    selectTheme: {
      reducer: (state, action: PayloadAction<ThemeResponse>) => {
        state.selectedTheme = action.payload;
        return state;
      },
      prepare: (theme: ThemeResponse) => {
        return { payload: theme };
      },
    },
  },
});

export const { actions, reducer, name: sliceKey } = themePageSlice;
