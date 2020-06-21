/**
 *
 * MainSection
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { TaskList } from '../TaskList';

interface Props {}

export const MainSection = memo((props: Props) => {
  return (
    <Section>
      <nav className="main-nav left">
        <button>{'Prev'}</button>
        <button>{'Prevv'}</button>
        <button>{'Home'}</button>
      </nav>
      <div className="main-content">
        <ol className="grid" role="row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <li className="grid_item" key={i}>
                <TaskList></TaskList>
              </li>
            );
          })}
        </ol>
      </div>
      <nav className="main-nav right">
        <button>{'Next'}</button>
        <button>{'Nextt'}</button>
        <button>{'Cal'}</button>
      </nav>
    </Section>
  );
});

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 50px;
  position: relative;

  @media (min-width: 48.0625em) {
    grid-template-columns: 3.5555555556rem 1fr 3.5555555556rem;
    margin-top: 80px;
  }

  .main-content {
    overflow: hidden;
    position: relative;
    z-index: 1;

    .grid {
      display: grid;
      list-style-type: none;
      grid-auto-columns: calc(20 * 1%);
      grid-template-rows: 100%;
      padding-left: 0;
      min-height: 25.1111111111rem;
      transition: transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
      z-index: 0;
      position: relative;

      .grid_item {
        border-right: 1px solid rgba(0, 0, 0, 0.08);
        grid-row: 1/-1;
        position: relative;
        padding: 80px 10px 0px 10px;
      }
    }
  }

  .main-nav {
    overflow: hidden;
    padding: 0 1.1111111111rem;

    @media (max-width: 48em) {
      padding: 0 0.5555555556rem;
      position: absolute;
      top: 0.1111111111rem;
      z-index: 2;
    }

    &.left {
      left: 0;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
    }
    &.right {
      right: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
`;
