/**
 *
 * AboutUs
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Typography, Container, Divider, Grid } from '@material-ui/core';
import { PublicLayout } from 'app/components/PublicLayout';

interface Props {}

export function AboutUs(props: Props) {
  return (
    <>
      <Helmet>
        <title>AboutUs</title>
        <meta name="description" content="Description of AboutUs" />
      </Helmet>
      <PublicLayout>
        <Div>
          <Container>
            <Typography component="h2" variant="h4">
              ABOUT US
            </Typography>
            <Divider />
            <div className="about-us-body">
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    ALIGN YOUR DAILY TASKS WITH YOUR LONG TERM GOALS
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    You can accomplish your goals if you break it down in
                    smaller smaller steps. But how do you go from a big long
                    term goal to those smaller steps or simple tasks you can
                    complete in a day? Hence your Daily Tasking is simplified
                    here with the help of DooToday.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="button">
                    What are the purposes that we cater to?
                  </Typography>
                </Grid>
                <Grid item>
                  <ul>
                    <Typography component="li" variant="body1">
                      Simple. We will help you feel organized without the
                      effort.
                    </Typography>
                    <Typography component="li" variant="body1">
                      You can create, review, breakdown and check in your own
                      schedule and voila, track your own progress both before
                      and after.
                    </Typography>
                    <Typography component="li" variant="body1">
                      With our core objective under our belt of planning your 24
                      hours , you can also create and edit lists through our
                      app. That would definitely make up for a piece of paper
                      and the odds of losing it.
                    </Typography>
                  </ul>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    So let us make your day-to-day a little more sorted out!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="p" variant="body1">
                    Happy to DOO-ing !
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
  .about-us-body {
    margin-top: 30px;
  }
`;
