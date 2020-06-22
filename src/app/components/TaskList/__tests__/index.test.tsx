import React from 'react';
import { render } from '@testing-library/react';

import { TaskList } from '..';

describe('<TaskList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <TaskList id={'some_id'} title={'Monday'} meta={'June 21, 2020'} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
