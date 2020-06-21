import React from 'react';
import { render } from '@testing-library/react';

import { MainSection } from '..';

describe('<MainSection  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<MainSection />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
