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
  Divider,
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
        <Grid container className="sub-container" spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container justify="center" spacing={3}>
              {plans.map(p => (
                <Grid item key={p.plan.plan_id} className="plan-item">
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

          <Grid item xs={12} sm={12} md={4} lg={4} className="promo">
            <div className="sub-note">
              {userFetched && (
                <Typography
                  component="div"
                  align="center"
                  className={`subscribe-note ${calcLeftDaysClass(
                    userDetails?.leftDays,
                  )}`}
                >
                  <strong>Note:</strong>
                  {` You have ${userDetails?.leftDays} days left on your subscription.`}
                </Typography>
              )}
            </div>
            <Divider />
            <div className="promo-action">
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
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="promo-submit"
                onClick={handlePromoSubmit}
                disabled={promoInp.value === '' || promoInp.submitting}
              >
                Apply
              </Button>
            </div>
            <div className={`sub-note ${!!cs ? 'show' : 'hide'}`}>
              <div
                className={`subscribe-note ${
                  cs === 'true' ? 'success' : 'error'
                }`}
              >
                <Typography>
                  {`Your subscription is${
                    cs === 'true' ? '' : ' not'
                  } successful.`}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  .sub-container {
    @media (max-width: 48em) {
      flex-direction: column-reverse;
    }
    .promo {
      .promo-submit {
        margin: 0px 0px 0px 5px;
        height: 40px;
      }
      .promo-action {
        margin: 15px 0px;
        display: flex;
        justify-content: center;
      }
      .sub-note {
        margin-bottom: 15px;
        &.hide {
          opacity: 0;
        }
        &.show {
          opacity: 1;
        }
        .subscribe-note {
          background-color: ${props => props.theme.palette.primary.light};
          padding: 10px;
          border-radius: 5px;
          max-width: 500px;
          margin: auto;

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
      }
    }

    .plan-item {
      width: 100%;
      @media (min-width: 48em) {
        width: 280px;
      }
    }
  }
`;
