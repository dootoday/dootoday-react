/**
 *
 * RefundPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PublicLayout } from 'app/components/PublicLayout';
import { Container, Typography, Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {}

export function RefundPage(props: Props) {
  return (
    <>
      <Helmet>
        <title>PrivacyPage</title>
        <meta name="description" content="Description of PrivacyPage" />
      </Helmet>
      <PublicLayout>
        <Div>
          <Container>
            <Typography component="h2" variant="h4">
              REFUND POLICY
            </Typography>
            <Divider />
            <div className="refund-body">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    REFUND ON SUBSCRIPTION
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If you want to cacnel a subscription please{' '}
                    <Link to="/contact">contact us</Link> at{' '}
                    <a href="mailto:contact@doo.today">contact@doo.today</a>{' '}
                    within 12 hours of the purchase. We'll initiate a refund and
                    cancel your newly purchased subscription.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    If you haven’t received a refund yet, first check your bank
                    account again. Then contact your credit card company, it may
                    take some time before your refund is officially posted. Next
                    contact your bank. There is often some processing time
                    before a refund is posted. If you’ve done all of this and
                    you still have not received your refund yet, please{' '}
                    <Link to="/contact">contact us</Link> at{' '}
                    <a href="mailto:contact@doo.today">contact@doo.today</a>.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Div>
      </PublicLayout>
    </>
  );
}

const Div = styled.div`
  .refund-body {
    margin-top: 30px;
  }
`;
