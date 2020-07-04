// AppLayout state slice

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  leftDays: number;
}

export interface AppLayoutState {
  userfetched: boolean;
  userDetails: UserDetails;
}

export type ContainerState = AppLayoutState;
