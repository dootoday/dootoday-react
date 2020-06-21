/**
 *
 * TaskList
 *
 */
import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

interface Props {}

export const TaskList = memo((props: Props) => {
  return (
    <Div>
      <section>
        <header className="header">
          <Typography variant="h6">Sunday</Typography>
          <Typography variant="caption">June 21, 2020</Typography>
        </header>
      </section>
      <section className="body"></section>
    </Div>
  );
});

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    font-size: 2.8888888889em;
    left: 0;
    line-height: 1;
    margin-bottom: 2.7777777778em;
    position: static;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100%;

    @media (min-width: 48.0625em) {
      font-size: 1em;
      position: absolute;
    }
  }

  .body {
    background-image: repeating-linear-gradient(
      transparent,
      transparent 22px,
      rgba(0, 0, 0, 0.08) 22px,
      rgba(0, 0, 0, 0.08) 23.23px,
      transparent 23.23px,
      transparent 25px
    );
    flex: 1 1 100%;
  }
`;
