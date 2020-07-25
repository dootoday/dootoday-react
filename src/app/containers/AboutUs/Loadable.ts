/**
 *
 * Asynchronously loads the component for AboutUs
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AboutUs = lazyLoad(
  () => import('./index'),
  module => module.AboutUs,
);
