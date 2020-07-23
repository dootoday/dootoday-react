/**
 *
 * ThemePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectThemePage } from './selectors';
import { themePageSaga } from './saga';
import { Theme, createMuiTheme, Container, Grid } from '@material-ui/core';

interface Props {
  theme?: Theme;
}

export const ThemePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: themePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const themePage = useSelector(selectThemePage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();

  return (
    <>
      <Helmet>
        <title>ThemePage</title>
        <meta name="description" content="Description of ThemePage" />
      </Helmet>
      <Div theme={theme}>
        <Container>
          <Grid container>This is the theme page</Grid>
        </Container>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
`;
