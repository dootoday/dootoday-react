import React from 'react';
import { render } from '@testing-library/react';

import { ThemePicker } from '..';
import { mockthemeresps } from 'utils/theme';

const inp = mockthemeresps;

describe('<ThemePicker  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ThemePicker themes={inp} selectedTheme={inp[2]} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
