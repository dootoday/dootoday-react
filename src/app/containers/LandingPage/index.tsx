/**
 *
 * LandingPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PublicLayout } from 'app/components/PublicLayout';

interface Props {}

export function LandingPage(props: Props) {
  return (
    <>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Description of LandingPage" />
      </Helmet>
      <PublicLayout>
        <Div>This is the landing page</Div>
      </PublicLayout>
    </>
  );
}

const Div = styled.div``;
