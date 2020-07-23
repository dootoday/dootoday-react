import React from 'react';
import { action } from '@storybook/addon-actions';
import { ThemePicker } from 'app/components/ThemePicker';
import { mockthemeresps } from 'utils/theme';

const Container = ({ children }) => <div style={{}}>{children}</div>;

const inp = mockthemeresps;

export const taskItem = () => (
  <>
    <ThemePicker
      themes={inp}
      selectedTheme={inp[2]}
      onSelectTheme={action('theme selected')}
    />
  </>
);

export default {
  title: 'Theme Picker',
  component: ThemePicker,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
