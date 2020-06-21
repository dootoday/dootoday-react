/**
 *
 * Asynchronously loads the component for TaskList
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TaskList = lazyLoad(
  () => import('./index'),
  module => module.TaskList,
);
