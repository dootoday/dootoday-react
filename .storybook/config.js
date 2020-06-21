import React from "react";
import { StylesProvider } from "@material-ui/styles";
import { addDecorator, configure } from '@storybook/react';

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    {storyFn()}
  </StylesProvider>
);

addDecorator(StylesDecorator);

import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});