/**
 *
 * SubscribePage
 *
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { v4 as uuidv4 } from 'uuid';
import { useQueryParam } from 'use-query-params';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectSubscribePage } from './selectors';
import { subscribePageSaga } from './saga';
import {
  Theme,
  createMuiTheme,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import {
  userFetchedSelector,
  userSelector,
} from 'app/containers/AppLayout/selector';
import { plansSelector, promoValidSelector } from './selectors';
import { BASE_URL } from 'utils/api';

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
    error: string;
    submitting: boolean;
  }>({
    value: '',
    error: '',
    submitting: false,
  });

  const promoInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handlePromoSubmit = () => {
    dispatch(actions.getPlansRequest(promoInputRef.current.value));
  };

  useEffect(() => {
    dispatch(actions.getPlansRequest(''));
  }, [dispatch]);

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
              <Grid container justify="center" spacing={0}>
                <Card className="promo-card">
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <Typography variant="h6">Use your promo code</Typography>
                      <TextField
                        inputRef={promoInputRef}
                        error={!!promoInp.error}
                        fullWidth={true}
                        id="promo-input"
                        label="Promo"
                        autoComplete="off"
                        variant="outlined"
                        helperText={promoInp.error}
                        value={promoInp.value}
                        className="promo-inp"
                        onKeyDown={e =>
                          e.key === 'Enter' && handlePromoSubmit()
                        }
                        onBlur={e => handlePromoSubmit()}
                        onChange={v =>
                          setPromoInp({
                            ...promoInp,
                            ...{ value: v.target.value },
                          })
                        }
                      />
                      {inValidPromo && (
                        <span className={`promo-error`}>
                          <Typography>
                            This is an invalid promo code.
                          </Typography>
                        </span>
                      )}
                      <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        size="large"
                        className="promo-submit"
                        onClick={handlePromoSubmit}
                        disabled={promoInp.value === '' || promoInp.submitting}
                      >
                        Apply
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={0}>
                <Card className="promo-card">
                  <CardContent>
                    {plans.map(p => {
                      const { plan, orderDetails } = p;
                      return (
                        <div key={plan.plan_id}>
                          {!!!orderDetails && (
                            <Button
                              fullWidth
                              color="secondary"
                              onClick={() =>
                                dispatch(actions.getOrderRequest(plan.plan_id))
                              }
                            >
                              {`Subscribe - ${plan.name} - ${
                                plan.offer_amount / 100
                              }`}
                            </Button>
                          )}
                          {!!orderDetails && orderDetails.amount > 0 && (
                            <form
                              method="POST"
                              action="https://api.razorpay.com/v1/checkout/embedded"
                            >
                              <input
                                type="hidden"
                                name="key_id"
                                value={orderDetails.key_id}
                              />
                              <input
                                type="hidden"
                                name="order_id"
                                value={orderDetails.order_id}
                              />
                              <input
                                type="hidden"
                                name="name"
                                value={orderDetails.name}
                              />
                              <input
                                type="hidden"
                                name="description"
                                value={orderDetails.description}
                              />
                              <input
                                type="hidden"
                                name="image"
                                value={orderDetails.image}
                              />
                              <input
                                type="hidden"
                                name="prefill[name]"
                                value={orderDetails.user_full_name}
                              />
                              <input
                                type="hidden"
                                name="prefill[contact]"
                                value={orderDetails.user_phone}
                              />
                              <input
                                type="hidden"
                                name="prefill[email]"
                                value={orderDetails.user_email}
                              />
                              <input
                                type="hidden"
                                name="callback_url"
                                value={orderDetails.callback_url}
                              />
                              <input
                                type="hidden"
                                name="cancel_url"
                                value={orderDetails.cancel_url}
                              />
                              <Button fullWidth color="primary" type="submit">
                                {`Purchase - ${plan.name} - ${
                                  plan.offer_amount / 100
                                }`}
                              </Button>
                            </form>
                          )}
                          {!!orderDetails && orderDetails.amount <= 0 && (
                            <form
                              method="POST"
                              action={`${BASE_URL}/v1/payment-success`}
                            >
                              <input
                                type="hidden"
                                name="razorpay_order_id"
                                value={orderDetails.order_id}
                              />
                              <input
                                type="hidden"
                                name="razorpay_payment_id"
                                value={uuidv4()}
                              />
                              <input
                                type="hidden"
                                name="razorpay_signature"
                                value={uuidv4()}
                              />
                              <Button fullWidth color="primary" type="submit">
                                {`Get it - ${plan.name}`}
                              </Button>
                            </form>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>
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

  .promo-card {
    width: 100%;
    .promo-inp {
      margin-top: 20px;
    }
    .promo-submit {
      margin-top: 10px;
    }
    .promo-error {
      color: ${props => props.theme.palette.error.main};
      margin-top: 10px;
    }
    @media (min-width: 48em) {
      width: 370px;
      width: 370px;
    }
  }
`;
