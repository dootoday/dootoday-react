/**
 *
 * AppLayout
 *
 */

import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Theme } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from 'app/containers/HomePage';
import { Logout as LogoutRequest } from 'utils/auth';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, slicekey, actions } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { userFetchedSelector, userSelector } from './selector';
import appLayoutSaga from './saga';
import { RefreshToken } from 'utils/auth';
import AppFooter from 'app/components/AppFooter';
import { SettingsPage } from 'app/containers/SettingsPage/Loadable';
import { selectSelectedTheme } from 'app/containers/ThemePage/selectors';
import { AppHeader } from 'app/components/AppHeader';

interface Props {}

export const AppLayout = memo((props: Props) => {
  // const { t, i18n } = useTranslation();
  useInjectReducer({ key: slicekey, reducer: reducer });
  useInjectSaga({ key: slicekey, saga: appLayoutSaga });
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  const theme = useSelector(selectSelectedTheme);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    LogoutRequest();
    history.push('/login');
  }, [history]);

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
        24 * 60 * 60 * 1000,
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
        <Div theme={theme}>
          <AppHeader
            userFetched={userFetched}
            userDetails={userDetails}
            handleLogout={handleLogout}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage userFetched={userFetched} theme={theme} />
              )}
            />
            <Route
              path="/me"
              component={() => <SettingsPage theme={theme} />}
            />
          </Switch>
          <AppFooter />
        </Div>
      </ThemeProvider>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
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

    .menu-item {
      text-decoration: none;
      color: ${props => props.theme.palette.primary.dark};
    }
  }
`;
