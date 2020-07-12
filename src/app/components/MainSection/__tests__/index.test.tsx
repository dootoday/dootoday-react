import React from 'react';
import { render } from '@testing-library/react';

import { MainSection, TaskColumn } from '..';

describe('<MainSection  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <MainSection
        startIndex={0}
        startIndexMob={0}
        taskColumns={[] as TaskColumn[]}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
