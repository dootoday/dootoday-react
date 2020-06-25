import React from 'react';
import { render } from '@testing-library/react';

import { LoginManager } from '..';

describe('<LoginManager  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LoginManager />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
