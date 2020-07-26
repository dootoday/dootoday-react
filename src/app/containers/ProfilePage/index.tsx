/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { profilePageSaga } from './saga';
import {
  Theme,
  createMuiTheme,
  Grid,
  Paper,
  Typography,
  Container,
} from '@material-ui/core';
import { userSelector } from 'app/containers/AppLayout/selector';

interface Props {
  theme?: Theme;
}

export const ProfilePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profilePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userDetails = useSelector(userSelector);
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
            <Grid item>
              <Paper elevation={0} className="user-image">
                <img src={userDetails?.avatar} alt="profile" />
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {`${userDetails?.firstName} ${userDetails?.lastName}`}
              </Typography>
              <Typography variant="body1">{`${userDetails?.email}`}</Typography>
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
  color: ${props => props.theme.palette.primary.dark};
`;