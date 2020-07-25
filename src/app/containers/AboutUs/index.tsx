/**
 *
 * AboutUs
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Typography, Container } from '@material-ui/core';
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
              About Us
            </Typography>
          </Container>
        </Div>
      </PublicLayout>
    </>
  );
}

const Div = styled.div``;
