import { ThemeResponse } from 'utils/datatypes';

/* --- STATE --- */
export interface ThemePageState {
  themePresets: ThemeResponse[];
  selectedTheme: ThemeResponse;
}

export type ContainerState = ThemePageState;
