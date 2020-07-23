/**
 *
 * ThemePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectThemePresets, selectSelectedThemeResponse } from './selectors';
import { themePageSaga } from './saga';
import { Theme, createMuiTheme, Container } from '@material-ui/core';
import { ThemePicker } from 'app/components/ThemePicker';
import { ThemeResponse } from 'utils/datatypes';

interface Props {
  theme?: Theme;
}

export const ThemePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: themePageSaga });

  const themes = useSelector(selectThemePresets);
  const selectedTheme = useSelector(selectSelectedThemeResponse);
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();
  const handleSelectTheme = (theme: ThemeResponse) =>
    dispatch(actions.selectTheme(theme));

  useEffect(() => {
    dispatch(actions.getThemes());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>ThemePage</title>
        <meta name="description" content="Description of ThemePage" />
      </Helmet>
      <Div theme={theme}>
        <Container>
          <ThemePicker
            themes={themes}
            selectedTheme={selectedTheme}
            onSelectTheme={handleSelectTheme}
          ></ThemePicker>
        </Container>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
`;
