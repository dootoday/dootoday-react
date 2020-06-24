/**
 *
 * MainSection
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { IconButton } from '@material-ui/core';
import { Task } from '../TaskItem';
import { TaskList } from '../TaskList';
import {
  PlayArrow,
  FastForward,
  Home,
  CalendarToday,
} from '@material-ui/icons';

export interface TaskColumn {
  id: string;
  title: string;
  meta?: string;
  tasks: Task[];
  active?: boolean;
}

interface Props {
  /**
   * taskColumns: This is the columns for the task
   */
  taskColumns: TaskColumn[];

  /**
   * startIndex: This is the starting point in the screen
   * default value is 0
   */
  startIndex?: number;

  /**
   * colTitleEditable: If the column titles are editable
   */
  colTitleEditable?: boolean;
}

export const MainSection = memo((props: Props) => {
  const { taskColumns, colTitleEditable, startIndex } = props;
  return (
    <Section>
      <nav className="main-nav left">
        <IconButton
          className="icon"
          color="primary"
          aria-label="move one day back"
          component="span"
        >
          <PlayArrow className="left primary-arrow" />
        </IconButton>
        <IconButton
          className="icon"
          color="primary"
          aria-label="move five days back"
          component="span"
        >
          <FastForward className="left secondary-arrow" />
        </IconButton>
        <IconButton
          className="icon"
          color="primary"
          aria-label="go to current date"
          component="span"
        >
          <Home className="tertiary-arrow" />
        </IconButton>
      </nav>
      <div className="main-content">
        <ol className="grid" role="row">
          {!!taskColumns.length &&
            taskColumns.map(taskColumn => {
              return (
                <li className="grid_item" key={taskColumn.id}>
                  <TaskList
                    id={taskColumn.id}
                    title={taskColumn.title}
                    meta={taskColumn.meta || ''}
                    tasks={taskColumn.tasks}
                    titleEditable={!!colTitleEditable}
                  />
                </li>
              );
            })}
        </ol>
      </div>
      <nav className="main-nav right">
        <IconButton
          className="icon"
          color="primary"
          aria-label="move one day ahead"
          component="span"
        >
          <PlayArrow className="primary-arrow" />
        </IconButton>
        <IconButton
          className="icon"
          color="primary"
          aria-label="move five days ahead"
          component="span"
        >
          <FastForward className="secondary-arrow" />
        </IconButton>
        <IconButton
          className="icon"
          color="primary"
          aria-label="select a date"
          component="span"
        >
          <CalendarToday className="tertiary-arrow" />
        </IconButton>
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
      margin-top: 0px;
      display: grid;
      list-style-type: none;
      grid-auto-columns: calc(20 * 1%);
      grid-template-rows: 100%;
      padding-left: 0;
      min-height: 25.1111111111rem;
      transition: transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
      z-index: 0;
      position: relative;

      @media (max-width: 48.0625em) {
        grid-auto-columns: calc(100 * 1%);
      }

      .grid_item {
        border-right: 1px solid rgba(0, 0, 0, 0.08);
        grid-row: 1/-1;
        position: relative;
        padding: 0px 15px;
      }
    }
  }

  .main-nav {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .icon {
      padding: 0;
      .left {
        transform: rotate(180deg);
      }
      .primary-arrow {
        font-size: 1.8em;
      }
      .secondary-arrow {
        font-size: 1em;
        margin-top: 10px;
      }
      .tertiary-arrow {
        font-size: 0.6em;
        margin-top: 10px;
        opacity: 0.5;
      }
      .secondary-arrow .tertiary-arrow {
        opacity: 0.5;
      }
    }

    &.left {
      left: 0;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
    }
    &.right {
      right: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 48em) {
      padding: 0 0.5555555556rem;
      position: absolute;
      top: 0.1111111111rem;
      z-index: 2;

      .icon {
        .secondary-arrow,
        .tertiary-arrow {
          display: none;
        }
      }

      &.left,
      &.right {
        border: none;
      }
    }
  }
`;
