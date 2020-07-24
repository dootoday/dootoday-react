import React from 'react';
import { render } from '@testing-library/react';

import { SubscriptionPlan } from '..';
import { Plan } from 'app/containers/SubscribePage/types';

describe('<SubscriptionPlan  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SubscriptionPlan plan={{} as Plan} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
