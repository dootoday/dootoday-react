// AppLayout state slice

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface AppLayoutState {
  userfetched: boolean;
  userDetails: UserDetails;
}

export type ContainerState = AppLayoutState;
