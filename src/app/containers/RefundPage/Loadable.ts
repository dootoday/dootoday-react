/**
 *
 * Asynchronously loads the component for RefundPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RefundPage = lazyLoad(
  () => import('./index'),
  module => module.RefundPage,
);
