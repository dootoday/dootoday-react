/**
 *
 * SubscribePage
 *
 */

import React, { memo, useState, useRef } from 'react';
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
  Card,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import {
  userFetchedSelector,
  userSelector,
} from 'app/containers/AppLayout/selector';
import { ApplyPromoAPI } from 'utils/api';

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
  const [promoInp, setPromoInp] = useState<{
    value: string;
    error: string;
    submitting: boolean;
  }>({
    value: '',
    error: '',
    submitting: false,
  });

  const [successMessage, setSuccessMessage] = useState<string>('');
  const promoInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handlePromoSubmit = () => {
    setPromoInp({ ...promoInp, ...{ submitting: true } });
    ApplyPromoAPI(promoInp.value)
      .then(resp => {
        setPromoInp({
          ...promoInp,
          ...{ submitting: false, error: '', value: '' },
        });
        promoInputRef.current.blur();
        // give some message that the promo is applied
        setSuccessMessage('Your promo is applied successfully!');
      })
      .catch(err => {
        setPromoInp({
          ...promoInp,
          ...{ submitting: false, error: err.response.data.error },
        });
      });
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
                        onChange={v =>
                          setPromoInp({
                            ...promoInp,
                            ...{ value: v.target.value },
                          })
                        }
                      />
                      {!!successMessage && (
                        <span className={`promo-success`}>
                          <Typography>{successMessage}</Typography>
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

  .promo-card {
    min-width: 370px;
    .promo-inp {
      margin-top: 20px;
    }
    .promo-submit {
      margin-top: 10px;
    }
    .promo-success {
      color: ${props => props.theme.palette.success.main};
      margin-top: 10px;
    }
  }
`;
