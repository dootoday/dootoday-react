import { get, set } from 'local-storage';
import { AppTheme } from './datatypes';

const THEME_LS_KEY = 'dootoday_theme';

export const themepresets = {
  default: {
    palette: {
      primary: {
        main: '#0d6c8c',
        dark: '#257b98',
        light: '#c2dae2',
      },
      secondary: {
        main: '#262626',
        dark: '#404040',
        light: '#b2b2b2',
      },
    },
  },
  red: {
    palette: {
      primary: {
        main: '#ff0000',
        dark: '#e60000',
        light: '#ffb3b3',
      },
      secondary: {
        main: '#262626',
        dark: '#404040',
        light: '#b2b2b2',
      },
    },
  },
  green: {
    palette: {
      primary: {
        main: '#00b3b3',
        dark: '#008080',
        light: '#00e6e6',
      },
      secondary: {
        main: '#262626',
        dark: '#404040',
        light: '#b2b2b2',
      },
    },
  },
  pink: {
    palette: {
      primary: {
        main: '#cc0099',
        dark: '#990073',
        light: '#ff66d9',
      },
      secondary: {
        main: '#262626',
        dark: '#404040',
        light: '#b2b2b2',
      },
    },
  },
  brown: {
    palette: {
      primary: {
        main: '#b37700',
        dark: '#805500',
        light: '#ffb31a',
      },
      secondary: {
        main: '#262626',
        dark: '#404040',
        light: '#b2b2b2',
      },
    },
  },
};

export const GetStoredTheme = (): AppTheme => {
  let theme = get<AppTheme>(THEME_LS_KEY);
  if (!theme) {
    theme = themepresets.brown;
    set(THEME_LS_KEY, theme);
  }
  return theme;
};

export const SetStoredTheme = (theme: AppTheme | undefined): void => {
  if (theme) {
    set(THEME_LS_KEY, theme);
  }
};
