// AppLayout state slice

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  leftDays: number;
  isAutoTaskMoveOn: boolean;
}

export interface AppLayoutState {
  userfetched: boolean;
  userDetails: UserDetails;
  authProblem: boolean;
}

export type ContainerState = AppLayoutState;
