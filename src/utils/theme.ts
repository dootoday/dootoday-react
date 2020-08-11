import { get, set } from 'local-storage';
import { ThemeResponse } from './datatypes';
import * as colors from '@material-ui/core/colors';

const THEME_LS_KEY = 'dootoday_theme';

const themesFromMaterialUI = (startID: number): ThemeResponse[] => {
  var output: ThemeResponse[] = [];
  for (var key in colors) {
    if (key !== 'common') {
      output.push({
        id: startID,
        name: key,
        theme: {
          palette: {
            primary: {
              main: colors[key]['800'],
              dark: colors[key]['900'],
              light: colors[key]['200'],
            },
            secondary: {
              main: '#262626',
              dark: '#404040',
              light: '#b2b2b2',
            },
          },
        },
      } as ThemeResponse);
      startID = startID + 1;
    }
  }
  return output;
};

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

export const mockthemeresps = [
  {
    id: 1,
    name: 'Red',
    theme: themepresets.red,
  },
  {
    id: 2,
    name: 'Brown',
    theme: themepresets.brown,
  },
  {
    id: 3,
    name: 'Default',
    theme: themepresets.default,
  },
  {
    id: 4,
    name: 'Pink',
    theme: themepresets.pink,
  },
  {
    id: 5,
    name: 'Green',
    theme: themepresets.green,
  },
  ...themesFromMaterialUI(6),
];

export const GetStoredTheme = (): ThemeResponse => {
  let theme = get<ThemeResponse>(THEME_LS_KEY);
  if (!theme) {
    theme = mockthemeresps[2];
    set(THEME_LS_KEY, theme);
  }
  ChangeMetaTheme(theme.theme.palette.primary.main);
  return theme;
};

export const SetStoredTheme = (theme: ThemeResponse | undefined): void => {
  if (theme) {
    ChangeMetaTheme(theme.theme.palette.primary.main);
    set(THEME_LS_KEY, theme);
  }
};

export const ChangeMetaTheme = (color: string): void => {
  var metaThemeColor = document.querySelector('meta[name=theme-color]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
};
