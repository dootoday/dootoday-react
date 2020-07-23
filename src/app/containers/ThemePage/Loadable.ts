/**
 *
 * Asynchronously loads the component for ThemePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ThemePage = lazyLoad(
  () => import('./index'),
  module => module.ThemePage,
);
