import React from 'react';
import { render } from '@testing-library/react';
import { RouteComponentProps } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Login } from '..';

const renderComponent = () =>
  render(
    <HelmetProvider>
      <Login {...({} as RouteComponentProps)} />
    </HelmetProvider>,
  );

describe('<Login />', () => {
  it('should match the snapshot', () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
