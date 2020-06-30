/**
 *
 * AppLayout
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { Logout as LogoutRequest } from 'utils/auth';

interface Props {}

export const AppLayout = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleLogout = () => {
    LogoutRequest();
    history.push('/login');
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0d6c8c',
        dark: '#073646',
        light: '#2dbceb',
      },
    },
  });

  return (
    <>
      <Helmet>
        <title>AppLayout</title>
        <meta name="description" content="Description of AppLayout" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Div>
          <AppBar position="static" elevation={0}>
            <Toolbar variant="dense" className="tool-bar">
              <img
                className="header-logo"
                src="https://dootoday-assets.s3.ap-south-1.amazonaws.com/logo-bw-horiz.png"
                alt="dootoday"
              />
              <Button onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Route exact path="/" render={() => <HomePage theme={theme} />} />
        </Div>
      </ThemeProvider>
    </>
  );
});

const Div = styled.div`
  .tool-bar {
    min-height: 34px;
    display: flex;
    justify-content: space-between;

    .header-logo {
      height: 25px;
    }
  }
`;
