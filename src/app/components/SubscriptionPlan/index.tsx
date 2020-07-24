/**
 *
 * SubscriptionPlan
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import { Plan } from 'app/containers/SubscribePage/types';
import { OrderResponse, PlanResponse } from 'utils/datatypes';
import { BASE_URL } from 'utils/api';

interface Props {
  // plan details
  plan: Plan;

  // onGetOrderDetails:
  onGetOrderDetails?: (plan: PlanResponse) => void;
}

export const SubscriptionPlan = memo((props: Props) => {
  const {
    onGetOrderDetails,
    plan: { plan, orderDetails },
  } = props;
  return (
    <Div>
      <Card>
        <CardHeader
          title={plan.name}
          subheader={plan.description}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          <Typography component="div" align="center">
            {plan.amount !== plan.offer_amount && (
              <Typography
                className="actual-price"
                variant="h4"
                color="textSecondary"
              >
                ₹{plan.amount / 100}
              </Typography>
            )}
            <Typography component="h2" variant="h3" color="textPrimary">
              ₹{plan.offer_amount / 100}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              for {plan.duration} days
            </Typography>
          </Typography>
        </CardContent>
        <CardActions>
          {!!!orderDetails && (
            <Button
              onClick={() => {
                onGetOrderDetails && onGetOrderDetails(plan);
              }}
              fullWidth
              variant={'outlined'}
              color="primary"
            >
              Get it
            </Button>
          )}
          {!!orderDetails &&
            orderDetails.amount > 0 &&
            renderPurchaseButton(orderDetails)}
          {!!orderDetails &&
            orderDetails.amount <= 0 &&
            renderFreePurchaseButton(orderDetails)}
        </CardActions>
      </Card>
    </Div>
  );
});

const renderPurchaseButton = (od: OrderResponse) => (
  <Form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
    <input type="hidden" name="key_id" value={od.key_id} />
    <input type="hidden" name="order_id" value={od.order_id} />
    <input type="hidden" name="name" value={od.name} />
    <input type="hidden" name="description" value={od.description} />
    <input type="hidden" name="image" value={od.image} />
    <input type="hidden" name="prefill[name]" value={od.user_full_name} />
    <input type="hidden" name="prefill[contact]" value={od.user_phone} />
    <input type="hidden" name="prefill[email]" value={od.user_email} />
    <input type="hidden" name="callback_url" value={od.callback_url} />
    <input type="hidden" name="cancel_url" value={od.cancel_url} />
    <Button fullWidth variant={'contained'} color="primary" type="submit">
      {'Purchase'}
    </Button>
  </Form>
);

const renderFreePurchaseButton = (od: OrderResponse) => (
  <Form method="POST" action={`${BASE_URL}/v1/payment-success`}>
    <input type="hidden" name="razorpay_order_id" value={od.order_id} />
    <input type="hidden" name="razorpay_payment_id" value={uuidv4()} />
    <input type="hidden" name="razorpay_signature" value={uuidv4()} />
    <Button fullWidth variant={'contained'} color="primary" type="submit">
      {'Get it now'}
    </Button>
  </Form>
);

const Div = styled.div`
  max-width: 300px;

  .actual-price {
    text-decoration: line-through;
  }
`;

const Form = styled.form`
  width: 100%;
`;
