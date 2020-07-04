/**
 *
 * SubscribePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectSubscribePage } from './selectors';
import { subscribePageSaga } from './saga';
import {
  Theme,
  createMuiTheme,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  userFetchedSelector,
  userSelector,
} from 'app/containers/AppLayout/selector';

interface Props {
  theme?: Theme;
  show?: boolean;
}

export const SubscribePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: subscribePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscribePage = useSelector(selectSubscribePage);
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = props.theme || createMuiTheme();
  const calcLeftDaysClass = (leftDays: number | undefined) => {
    leftDays = leftDays || 0;
    if (leftDays <= 15) {
      return 'warning';
    }
    if (leftDays <= 5) {
      return 'error';
    }
    return '';
  };
  return (
    <>
      <Helmet>
        <title>SubscribePage</title>
        <meta name="description" content="Description of SubscribePage" />
      </Helmet>
      <Div theme={theme}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {userFetched && (
                <Grid container justify="center" spacing={0}>
                  <span
                    className={`subscribe-note ${calcLeftDaysClass(
                      userDetails?.leftDays,
                    )}`}
                  >
                    <Typography>
                      <strong>Note:</strong>
                      {` You have ${userDetails?.leftDays} days left on your subscription.`}
                    </Typography>
                  </span>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 50px;

  .subscribe-note {
    background-color: ${props => props.theme.palette.primary.light};
    padding: 10px;
    border-radius: 5px;

    &.warning {
      background-color: ${props => props.theme.palette.warning.light};
    }

    &.error {
      background-color: ${props => props.theme.palette.error.light};
    }
  }
`;
