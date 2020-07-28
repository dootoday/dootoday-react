/**
 *
 * ContactPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PublicLayout } from 'app/components/PublicLayout';
import { Container, Typography, Divider, Grid } from '@material-ui/core';

interface Props {}

export function ContactPage(props: Props) {
  return (
    <>
      <Helmet>
        <title>ContactPage</title>
        <meta name="description" content="Description of ContactPage" />
      </Helmet>
      <PublicLayout>
        <Div>
          <Container>
            <Typography component="h2" variant="h4">
              CONTACT US
            </Typography>
            <Divider />
            <div className="contact-us-body">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    EMAIL
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    <a href="mailto:contact@doo.today">contact@doo.today</a>
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography component="h4" variant="h6">
                    PHONE
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    +91 80 4302 8912
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container>
        </Div>
      </PublicLayout>
      <Div></Div>
    </>
  );
}

const Div = styled.div`
  .contact-us-body {
    margin-top: 30px;
  }
`;
