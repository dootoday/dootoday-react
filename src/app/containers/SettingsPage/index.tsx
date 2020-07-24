/**
 *
 * SettingsPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

import { SubscribePage } from 'app/containers/SubscribePage';
import { ThemePage } from 'app/containers/ThemePage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectSettingsPage } from './selectors';
import { settingsPageSaga } from './saga';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  createMuiTheme,
} from '@material-ui/core';

interface Props {
  theme?: Theme;
}

export const SettingsPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: settingsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const settingsPage = useSelector(selectSettingsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();

  return (
    <>
      <Helmet>
        <title>SettingsPage</title>
        <meta name="description" content="Description of SettingsPage" />
      </Helmet>
      <Container maxWidth="lg">
        <Div theme={theme}>
          <Grid container spacing={1} direction="row">
            <Grid item container md={3} lg={3} sm={12}>
              <List component="nav" className="nav-list" aria-label="settings">
                <NavLink
                  exact
                  to="/me"
                  className="nav-link"
                  activeClassName="active"
                >
                  <ListItem button className="nav-item">
                    <ListItemText primary="Profile" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/me/subscription"
                  className="nav-link"
                  activeClassName="active"
                >
                  <ListItem button className="nav-item">
                    <ListItemText primary="Subscription" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/me/theme"
                  className="nav-link"
                  activeClassName="active"
                >
                  <ListItem button className="nav-item">
                    <ListItemText primary="Theme" />
                  </ListItem>
                </NavLink>
              </List>
            </Grid>
            <Grid item container md={9} lg={9} sm={12}>
              <Switch>
                <Route
                  exact
                  path="/me/subscription"
                  component={() => <SubscribePage theme={theme} />}
                />
                <Route exact path="/me/theme" component={() => <ThemePage />} />
              </Switch>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
  min-height: calc(100vh - 127px);

  .nav-list {
    width: 100%;
    .nav-link {
      text-decoration: none;
      color: ${props => props.theme.palette.primary.dark};
      &.active {
        .nav-item {
          background-color: ${props => props.theme.palette.primary.main};
          color: #ffffff;
        }
      }
    }
  }
`;
