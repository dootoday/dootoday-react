import React from 'react';
import { render } from '@testing-library/react';

import { TaskList } from '..';

describe('<TaskList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TaskList />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
