/**
 *
 * AppLayout
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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

  return (
    <>
      <Helmet>
        <title>AppLayout</title>
        <meta name="description" content="Description of AppLayout" />
      </Helmet>
      <Div>
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense" className="tool-bar">
            <Typography variant="h6">DooToday</Typography>
            <Button onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={HomePage} />
      </Div>
    </>
  );
});

const Div = styled.div`
  .tool-bar {
    min-height: 34px;
    display: flex;
    justify-content: space-between;
  }
`;
