import React from 'react';
import { render } from '@testing-library/react';

import { TaskItem } from '..';

describe('<TaskItem  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <TaskItem
        task={{
          id: 'sone-id',
          markdown: 'This is a task',
          isDone: false,
          recurringID: '0',
        }}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
