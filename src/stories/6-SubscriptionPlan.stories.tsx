import React from 'react';
import { SubscriptionPlan } from 'app/components/SubscriptionPlan';
import { Grid } from '@material-ui/core';

const Container = ({ children }) => (
  <Grid container spacing={3}>
    {children}
  </Grid>
);

export const subscriptionPlan = () => (
  <>
    <Grid item>
      <SubscriptionPlan
        plan={{
          plan: {
            plan_id: 2,
            name: 'Yearly Plan',
            description: 'Add a year to your subscription',
            amount: 20000,
            offer_amount: 10000,
            duration: 365,
          },
          orderDetails: {
            key_id: 'some-key-id',
            order_id: 'some-order-id',
            name: 'DooToday',
            description: 'Simple task management',
            image: 'some-image.jpg',
            user_full_name: 'Sudipta Sen',
            user_email: 'sen@doo.today',
            user_phone: '9066258469',
            callback_url: 'some-callback-url',
            cancel_url: 'some-cancel-url',
            amount: 10000,
          },
        }}
      />
    </Grid>
    <Grid item>
      <SubscriptionPlan
        plan={{
          plan: {
            plan_id: 2,
            name: 'Yearly Plan',
            description: 'Add a year to your subscription',
            amount: 20000,
            offer_amount: 10000,
            duration: 365,
          },
        }}
      />
    </Grid>
    <Grid item>
      <SubscriptionPlan
        plan={{
          plan: {
            plan_id: 2,
            name: 'Yearly Plan',
            description: 'Add a year to your subscription',
            amount: 20000,
            offer_amount: 20000,
            duration: 365,
          },
        }}
      />
    </Grid>
    <Grid item>
      <SubscriptionPlan
        plan={{
          plan: {
            plan_id: 2,
            name: 'Yearly Plan',
            description: 'Add a year to your subscription',
            amount: 10000,
            offer_amount: 0,
            duration: 30,
          },
          orderDetails: {
            key_id: 'some-key-id',
            order_id: 'some-order-id',
            name: 'DooToday',
            description: 'Simple task management',
            image: 'some-image.jpg',
            user_full_name: 'Sudipta Sen',
            user_email: 'sen@doo.today',
            user_phone: '9066258469',
            callback_url: 'some-callback-url',
            cancel_url: 'some-cancel-url',
            amount: 0,
          },
        }}
      />
    </Grid>
  </>
);

export default {
  title: 'Subscription Plan',
  component: SubscriptionPlan,
  decorators: [storyFn => <Container>{storyFn()}</Container>],
};
