/**
 *
 * Asynchronously loads the component for SubscribePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SubscribePage = lazyLoad(
  () => import('./index'),
  module => module.SubscribePage,
);
