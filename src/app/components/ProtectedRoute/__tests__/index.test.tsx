import React from 'react';
import { render } from '@testing-library/react';

import { ProtectedRoute } from '..';

describe('<ProtectedRoute  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ProtectedRoute />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
