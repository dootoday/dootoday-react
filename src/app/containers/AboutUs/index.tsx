/**
 *
 * AboutUs
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';

interface Props {}

export function AboutUs(props: Props) {
  return (
    <>
      <Helmet>
        <title>AboutUs</title>
        <meta name="description" content="Description of AboutUs" />
      </Helmet>
      <Div>
        <Typography component="h2" variant="h3">
          About US
        </Typography>
      </Div>
    </>
  );
}

const Div = styled.div``;
