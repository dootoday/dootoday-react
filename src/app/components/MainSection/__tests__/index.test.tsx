import React from 'react';
import { render } from '@testing-library/react';

import { MainSection, TaskColumn } from '..';

describe('<MainSection  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <MainSection taskColumns={[] as TaskColumn[]} startIndex={0} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
