/**
 *
 * Asynchronously loads the component for MainSection
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MainSection = lazyLoad(
  () => import('./index'),
  module => module.MainSection,
);
