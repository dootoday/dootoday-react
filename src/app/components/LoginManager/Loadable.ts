/**
 *
 * Asynchronously loads the component for LoginManager
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LoginManager = lazyLoad(
  () => import('./index'),
  module => module.LoginManager,
);
