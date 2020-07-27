/**
 *
 * LandingPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PublicLayout } from 'app/components/PublicLayout';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {}

export function LandingPage(props: Props) {
  return (
    <>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Description of LandingPage" />
      </Helmet>
      <Div>
        <PublicLayout>
          <Container>
            <Grid container justify="center" direction="column" spacing={5}>
              <Grid item>
                <Typography variant="h5" align="center" className="heared1">
                  Simplest Daily Task Manager ever
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  We know we got a lot to do today! <br />
                  So, let's not waste time on any fancy Landing Page
                </Typography>
              </Grid>
              <Grid item className="signup-button">
                <Link to="/login">
                  <Button variant="contained" size="large" color="primary">
                    Let's Dive Right Into It
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  {`If you still love a fancy landing page, 
                  let us know. We'll add it to our task list.`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="center">
                  Not Important! But in case if you want to know, <br />
                  here is little something <Link to="/aboutus">About Us.</Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </PublicLayout>
      </Div>
    </>
  );
}

const Div = styled.div`
  .heared1 {
    text-transform: uppercase;
  }
  .signup-button {
    margin: auto;
    a {
      text-decoration: none;
    }
  }
`;
