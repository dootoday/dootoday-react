/**
 *
 * AppLayout
 *
 */

import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
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
import { RefreshToken } from 'utils/auth';
import { SubscribePage } from 'app/containers/SubscribePage/Loadable';

interface Props {}

export const AppLayout = memo((props: Props) => {
  // const { t, i18n } = useTranslation();
  useInjectReducer({ key: slicekey, reducer: reducer });
  useInjectSaga({ key: slicekey, saga: appLayoutSaga });
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    LogoutRequest();
    history.push('/login');
  }, [history]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0d6c8c',
        dark: '#073646',
        light: '#2dbceb',
      },
    },
  });

  const [refreshToken, setRefreshToken] = useState(false);
  const refreshTimer = useRef(0);
  const refreshTokenInterval = useCallback(
    (userFetched: boolean) => {
      RefreshToken().then(refreshed => {
        if (refreshed) {
          if (!userFetched) {
            dispatch(actions.getUserDetailsRequest());
          }
        } else {
          handleLogout();
        }
      });
      refreshTimer.current = setTimeout(
        refreshTokenInterval,
        30 * 60 * 1000,
        true,
      );
    },
    [dispatch, handleLogout],
  );

  useEffect(() => {
    if (!refreshToken) {
      refreshTokenInterval(!!userFetched);
      setRefreshToken(true);
    }
  }, [refreshToken, refreshTokenInterval, userFetched]);

  // This is equivalent to componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      dispatch(actions.deleteUserDetails());
      clearTimeout(refreshTimer.current);
    };
  }, [dispatch]);

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
              {userFetched && (
                <IconButton onClick={handleLogout}>
                  <Avatar
                    variant="rounded"
                    className="avatar-logo"
                    alt={userDetails?.firstName}
                    src={userDetails?.avatar}
                  />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
          <Route exact path="/" render={() => <HomePage theme={theme} />} />
          <Route
            exact
            path="/subscribe"
            component={() => <SubscribePage theme={theme} />}
          />
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
    .avatar-logo {
      height: 20px;
      width: 20px;
      border: 1px solid #fff;
    }
  }
`;
