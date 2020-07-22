// AppLayout state slice

import { AppTheme } from 'utils/datatypes';

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  leftDays: number;
  theme?: AppTheme;
}

export interface AppLayoutState {
  userfetched: boolean;
  userDetails: UserDetails;
}

export type ContainerState = AppLayoutState;
