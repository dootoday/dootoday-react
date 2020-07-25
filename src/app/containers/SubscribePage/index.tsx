/**
 *
 * SubscribePage
 *
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useQueryParam } from 'use-query-params';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectSubscribePage } from './selectors';
import { subscribePageSaga } from './saga';
import {
  Theme,
  createMuiTheme,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import {
  userFetchedSelector,
  userSelector,
} from 'app/containers/AppLayout/selector';
import { plansSelector, promoValidSelector } from './selectors';
import { SubscriptionPlan } from 'app/components/SubscriptionPlan';
import { PlanResponse } from 'utils/datatypes';

interface Props {
  theme?: Theme;
}

export const SubscribePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: subscribePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscribePage = useSelector(selectSubscribePage);
  const userFetched = useSelector(userFetchedSelector);
  const userDetails = useSelector(userSelector);
  const plans = useSelector(plansSelector);
  const inValidPromo = useSelector(promoValidSelector);
  const dispatch = useDispatch();
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
  const [promoInp, setPromoInp] = useState<{
    value: string;
    submitting: boolean;
  }>({
    value: '',
    submitting: false,
  });

  const [promoInpError, setPromoInpError] = useState('');

  const promoInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handlePromoSubmit = () => {
    dispatch(actions.getPlansRequest(promoInputRef.current.value));
  };

  useEffect(() => {
    dispatch(actions.getPlansRequest(''));
  }, [dispatch]);

  useEffect(() => {
    setPromoInpError(inValidPromo ? 'This promo is invalid' : '');
  }, [inValidPromo]);

  const [cs, setCS] = useQueryParam('cs');

  useEffect(() => {
    if (!!cs) {
      setTimeout(() => setCS(undefined), 4000);
    }
  }, [cs, setCS]);

  return (
    <>
      <Helmet>
        <title>SubscribePage</title>
        <meta name="description" content="Description of SubscribePage" />
      </Helmet>
      <Div theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Grid container>
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
                {!!cs && (
                  <Grid container justify="center" spacing={0}>
                    <span
                      className={`subscribe-note ${
                        cs === 'true' ? 'success' : 'error'
                      }`}
                    >
                      <Typography>
                        {`Your subscription is${
                          cs === 'true' ? '' : ' not'
                        } successful.`}
                      </Typography>
                    </span>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  {plans.map(p => (
                    <Grid item key={p.plan.plan_id} className="promo-item">
                      <SubscriptionPlan
                        theme={theme}
                        plan={p}
                        onGetOrderDetails={(pl: PlanResponse) =>
                          dispatch(actions.getOrderRequest(pl.plan_id))
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  inputRef={promoInputRef}
                  size="small"
                  error={inValidPromo}
                  id="promo-input"
                  label="Promo"
                  autoComplete="off"
                  variant="outlined"
                  helperText={promoInpError}
                  value={promoInp.value}
                  className="promo-inp"
                  onKeyDown={e => e.key === 'Enter' && handlePromoSubmit()}
                  onBlur={e => handlePromoSubmit()}
                  onChange={v =>
                    setPromoInp({
                      ...promoInp,
                      ...{ value: v.target.value },
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className="promo-submit"
                  onClick={handlePromoSubmit}
                  disabled={promoInp.value === '' || promoInp.submitting}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  .subscribe-note {
    background-color: ${props => props.theme.palette.primary.light};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    &.warning {
      background-color: ${props => props.theme.palette.warning.light};
    }

    &.error {
      background-color: ${props => props.theme.palette.error.light};
    }

    &.success {
      background-color: ${props => props.theme.palette.success.light};
    }
  }

  .promo-error {
    color: ${props => props.theme.palette.error.main};
    margin-top: 10px;
  }
  .promo-item {
    width: 100%;
    @media (min-width: 48em) {
      width: 280px;
    }
  }
`;
