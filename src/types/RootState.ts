import { AppLayoutState } from 'app/containers/AppLayout/types';
import { SubscribePageState } from 'app/containers/SubscribePage/types';
import { HomePageState } from 'app/containers/HomePage/types';
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  applayout?: AppLayoutState;
  subscribePage?: SubscribePageState;
  homePage?: HomePageState;
}
