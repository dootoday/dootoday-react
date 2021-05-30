/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { actions, reducer, sliceKey } from './slice';
import profilePageSaga from './saga';
import {
  Avatar,
  Theme,
  createMuiTheme,
  Grid,
  Paper,
  Typography,
  Container,
  Switch,
} from '@material-ui/core';
import { userSelector } from 'app/containers/AppLayout/selector';
import { selectProfilePage } from './selectors';

interface Props {
  theme?: Theme;
}

export const ProfilePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profilePageSaga });

  const userDetails = useSelector(userSelector);
  const profilePage = useSelector(selectProfilePage);
  const dispatch = useDispatch();

  const theme = props.theme || createMuiTheme();

  return (
    <>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Div theme={theme}>
        <Container>
          <Grid container spacing={4}>
            <Grid item lg={1} sm={2} xs={3}>
              <Paper elevation={0} className="user-image">
                <Avatar
                  alt=""
                  style={{ height: theme.spacing(7), width: theme.spacing(7) }}
                  src={userDetails?.avatar}
                />
              </Paper>
            </Grid>
            <Grid item lg={11} sm={10} xs={9}>
              <Typography variant="h5">
                {`${userDetails?.firstName} ${userDetails?.lastName}`}
              </Typography>
              <Typography variant="body1">{`${userDetails?.email}`}</Typography>
            </Grid>
          </Grid>
          <hr />
          <Typography variant="h6">Settings</Typography>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="body2">
                Move undone tasks to today
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                disabled={profilePage.autoTaskMoveSubmitting}
                checked={userDetails?.isAutoTaskMoveOn}
                onChange={() => {
                  dispatch(
                    actions.updateAutoTaskMove(!userDetails?.isAutoTaskMoveOn),
                  );
                }}
                color="primary"
                name="auto-task-move"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
          </Grid>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="body2">
                Receive daily email update
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                disabled={profilePage.emailUpdateSubmitting}
                checked={userDetails?.isDailyEmailUpdateOn}
                onChange={() => {
                  dispatch(
                    actions.updateDailyEmailUpdate(
                      !userDetails?.isDailyEmailUpdateOn,
                    ),
                  );
                }}
                color="primary"
                name="auto-task-move"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Grid>
          </Grid>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Typography color="error" variant="caption">
                {profilePage.error}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  color: ${props => props.theme.palette.primary.dark};
`;
