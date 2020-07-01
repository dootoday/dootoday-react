import { AppLayoutState } from 'app/containers/AppLayout/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  applayout?: AppLayoutState;
}
