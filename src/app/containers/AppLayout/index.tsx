/**
 *
 * AppLayout
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Avatar, IconButton } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { Logout as LogoutRequest } from 'utils/auth';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, slicekey, actions } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { userFetchedSelector, userSelector } from './selector';
import appLayoutSaga from './saga';

interface Props {}

export const AppLayout = memo((props: Props) => {
  // const { t, i18n } = useTranslation();
  useInjectReducer({ key: slicekey, reducer: reducer });
  useInjectSaga({ key: slicekey, saga: appLayoutSaga });
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (!userFetched) {
      dispatch(actions.getUserDetailsRequest());
    }
  }, [dispatch, userFetched]);

  return (
    <>
      <Helmet>
        <title>AppLayout</title>
        <meta name="description" content="Description of AppLayout" />
      </Helmet>
      <ThemeProvider theme={theme}>
        {userFetched && (
          <Div>
            <AppBar position="static" elevation={0}>
              <Toolbar variant="dense" className="tool-bar">
                <img
                  className="header-logo"
                  src="https://dootoday-assets.s3.ap-south-1.amazonaws.com/logo-bw-horiz.png"
                  alt="dootoday"
                />
                <IconButton onClick={handleLogout}>
                  <Avatar
                    variant="rounded"
                    className="avatar-logo"
                    alt={userDetails?.firstName}
                    src={userDetails?.avatar}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Route exact path="/" render={() => <HomePage theme={theme} />} />
          </Div>
        )}
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
    .avatar-logo {
      height: 20px;
      width: 20px;
    }
  }
`;
