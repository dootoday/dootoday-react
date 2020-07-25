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
import { useHistory, Redirect } from 'react-router-dom';
import { Theme, Typography } from '@material-ui/core';
import { Route, Switch, Link } from 'react-router-dom';
import { HomePage } from 'app/containers/HomePage';
import { Logout as LogoutRequest } from 'utils/auth';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, slicekey, actions } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { userFetchedSelector, userSelector } from './selector';
import appLayoutSaga from './saga';
import { RefreshToken } from 'utils/auth';
import { AppFooter } from 'app/components/AppFooter';
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

  useEffect(() => {
    if (!!userDetails && !!userDetails.email && !!!userDetails.leftDays) {
      history.push('/me/subscription');
    }
  }, [history, userDetails]);

  return (
    <>
      <Helmet>
        <title>AppLayout</title>
        <meta name="description" content="Description of AppLayout" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Div theme={theme}>
          <AppHeader
            theme={theme}
            userFetched={userFetched}
            userDetails={userDetails}
            handleLogout={handleLogout}
          />
          {userFetched && !!userDetails && userDetails.leftDays < 10 && (
            <Typography
              component="div"
              variant="caption"
              align="center"
              className="sub-warn"
            >
              {`Your subscription is ${
                userDetails.leftDays > 0 ? 'about to' : ''
              } end.`}{' '}
              <Link to="/me/subscription">Click here</Link> to renew now.
            </Typography>
          )}
          {!!userDetails && !!userDetails.email && (
            <Switch>
              <Route
                exact
                path="/"
                render={props => {
                  if (!!userDetails.leftDays) {
                    return <HomePage userFetched={userFetched} theme={theme} />;
                  } else {
                    return (
                      <Redirect
                        to={{
                          pathname: '/me/subscription',
                          state: { from: props.location.pathname },
                        }}
                      />
                    );
                  }
                }}
              />
              <Route
                path="/me"
                component={() => <SettingsPage theme={theme} />}
              />
            </Switch>
          )}
          <AppFooter theme={theme} />
        </Div>
      </ThemeProvider>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  .sub-warn {
    background-color: ${props => props.theme.palette.warning.light};
  }
`;
