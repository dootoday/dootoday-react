/**
 * This is Auth utils
 */

import { get } from 'local-storage';
import Cookies from 'js-cookie';
import { Refresh as RefreshAPI } from 'utils/api';

const AUTH_COOKIE_NAME = 'dootoday_auth_token';
const REFRESH_LS_KEY = 'dootoday_refresh_token';
const DAY_LEFT_KEY = 'dootoday_days_left';
const EXPIRE_IN_DAYS = 1;

// RefreshToken :
// This function refresh the auth token
export const RefreshToken = (): Promise<boolean> => {
  // Check if refresh token exists in localstorage
  const rt = get<string>(REFRESH_LS_KEY);

  // If exists then fetch the auth token and store it to
  // Auth cookie along with day left
  // In case of invalid reponse return promise false
  // If not exists then also return promise false
  // Either of the cases user will have to login again
  if (rt) {
    return RefreshAPI(rt)
      .then(resp => {
        if (resp.status === 200) {
          const data = resp.data;
          Cookies.set(AUTH_COOKIE_NAME, data.access_token, {
            expires: EXPIRE_IN_DAYS,
          });
          Cookies.set(DAY_LEFT_KEY, data.left_days, {
            expires: EXPIRE_IN_DAYS,
          });
        } else {
          console.error(resp.status);
          throw new Error('Refresh token is not valid');
        }
      })
      .then(() => true)
      .catch(err => false);
  } else {
    return Promise.resolve(false);
  }
};

class Auth {
  private authenticted;

  constructor() {
    this.authenticted = false;
  }

  login(cb) {
    this.authenticted = true;
    cb();
  }

  logout(cb) {
    this.authenticted = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticted;
  }
}

export default new Auth();
