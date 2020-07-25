import React from 'react';
import { render } from '@testing-library/react';

import { AppHeader } from '..';

describe('<AppHeader  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AppHeader />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
