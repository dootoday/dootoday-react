/**
 *
 * PublicLayout
 *
 */
import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppHeader } from 'app/components/AppHeader';
import { AppFooter } from 'app/components/AppFooter';
import { createMuiTheme } from '@material-ui/core';
import { themepresets } from 'utils/theme';

interface Props {
  children: ReactNode;
  className?: string;
}

const theme = createMuiTheme(themepresets.default);

export function PublicLayout(props: Props) {
  const { className } = props;
  return (
    <ThemeProvider theme={theme}>
      <Div className={className}>
        <AppHeader theme={theme} />
        <div className="public-container">{props.children}</div>
        <AppFooter theme={theme} />
      </Div>
    </ThemeProvider>
  );
}

const Div = styled.div`
  .public-container {
    min-height: calc(100vh - 104px);
    padding: 30px 0px;
  }
`;
