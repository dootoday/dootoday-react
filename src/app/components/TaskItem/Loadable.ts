/**
 *
 * Asynchronously loads the component for TaskItem
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TaskItem = lazyLoad(
  () => import('./index'),
  module => module.TaskItem,
);
