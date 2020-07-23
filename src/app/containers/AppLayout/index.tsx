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
import { useHistory, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Theme,
} from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from 'app/containers/HomePage';
import { Logout as LogoutRequest } from 'utils/auth';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, slicekey, actions } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  userFetchedSelector,
  userSelector,
  userThemeSelector,
} from './selector';
import appLayoutSaga from './saga';
import { RefreshToken } from 'utils/auth';
import AppFooter from 'app/components/AppFooter';
import { SettingsPage } from 'app/containers/SettingsPage/Loadable';

interface Props {}

export const AppLayout = memo((props: Props) => {
  // const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  useInjectReducer({ key: slicekey, reducer: reducer });
  useInjectSaga({ key: slicekey, saga: appLayoutSaga });
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  const theme = useSelector(userThemeSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

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
        <Div theme={theme}>
          <AppBar position="static" elevation={0}>
            <Toolbar variant="dense" className="tool-bar">
              <Link to="/">
                <img
                  className="header-logo"
                  src="https://dootoday-assets.s3.ap-south-1.amazonaws.com/logo-bw-horiz.png"
                  alt="dootoday"
                />
              </Link>
              {userFetched && (
                <>
                  <IconButton
                    onClick={handleToggle}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                  >
                    <Avatar
                      variant="rounded"
                      className="avatar-logo"
                      alt={userDetails?.firstName}
                      src={userDetails?.avatar}
                    />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{
                      zIndex: 3,
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <Link
                                to="/me"
                                className="menu-item"
                                onClick={handleClose}
                              >
                                <MenuItem>Profile</MenuItem>
                              </Link>
                              <Link
                                to="/me/subscription"
                                className="menu-item"
                                onClick={handleClose}
                              >
                                <MenuItem>Subscription</MenuItem>
                              </Link>
                              <MenuItem
                                className="menu-item"
                                onClick={handleLogout}
                              >
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              )}
            </Toolbar>
          </AppBar>
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
