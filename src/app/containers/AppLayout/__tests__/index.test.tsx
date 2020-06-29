import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

import { AppLayout } from '..';

const renderComponent = () =>
  render(
    <HelmetProvider>
      <AppLayout />
    </HelmetProvider>,
  );

describe('<AppLayout />', () => {
  it('should match the snapshot', () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
