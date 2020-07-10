/**
 *
 * MainSection
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { IconButton } from '@material-ui/core';
import { Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
   */
  startIndex: number;

  /**
   * colTitleEditable: If the column titles are editable
   */
  colTitleEditable?: boolean;

  /**
   * showHomeNav: Should show the home button in nav
   */
  showHomeNav?: boolean;

  /**
   * showDateNav: Should show the date button in nav
   */
  showDateNav?: boolean;

  /**
   * theme: Theme object of material UI
   */
  theme?: Theme;

  /**
   * onTaskAdd: Event on task add
   */
  onTaskAdd?: (task: string, colID: string) => void;

  /**
   * onTaskUpdate: Event on task add
   */
  onTaskUpdate?: (task: Task) => void;

  /**
   * onMoveRequest: Event on task add
   */
  onMoveRequest?: (moveby: number) => void;

  /**
   * onHomeRequest: This is an event on click the home button
   * in nav
   */
  onHomeRequest?: () => void;

  /**
   * onMoveToDateRequest: Move to a date request
   */
  onMoveToDateRequest?: (d: Date) => void;

  /**
   * onColumnUpdate: Column title change
   */
  onColumnUpdate?: (colID: string, title: string) => void;
}

export const MainSection = memo((props: Props) => {
  const {
    taskColumns,
    colTitleEditable,
    startIndex,
    showHomeNav,
    showDateNav,
    onTaskAdd,
    onTaskUpdate,
    onMoveRequest,
    onHomeRequest,
    onMoveToDateRequest,
    onColumnUpdate,
  } = props;
  const theme = props.theme || createMuiTheme();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const calculateStartIndex = (startIndex: number, mobile: boolean): number => {
    const screenlimit = mobile ? 1 : 5;
    if (startIndex > taskColumns.length - screenlimit) {
      return taskColumns.length - screenlimit;
    }
    if (startIndex < 0) {
      return 0;
    }
    return startIndex;
  };

  const handleDateChange = (date: any) => {
    onMoveToDateRequest && onMoveToDateRequest(date as Date);
    setDatePickerOpen(false);
  };

  return (
    <Section
      startIndex={calculateStartIndex(startIndex, false)}
      startIndexMob={calculateStartIndex(startIndex, true) + 1}
      totalLength={taskColumns.length}
    >
      <nav className="main-nav left">
        <ThemeProvider theme={theme}>
          <IconButton
            onClick={() => onMoveRequest && onMoveRequest(-1)}
            className="icon"
            color="primary"
            aria-label="move one day back"
            component="span"
          >
            <PlayArrow className="left primary-arrow" />
          </IconButton>
          <IconButton
            onClick={() => onMoveRequest && onMoveRequest(-5)}
            className="icon"
            color="primary"
            aria-label="move five days back"
            component="span"
          >
            <FastForward className="left secondary-arrow" />
          </IconButton>
          {showHomeNav && (
            <IconButton
              onClick={() => onHomeRequest && onHomeRequest()}
              className="icon"
              color="primary"
              aria-label="go to current date"
              component="span"
            >
              <Home className="tertiary-arrow" />
            </IconButton>
          )}
        </ThemeProvider>
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
                    highlight={!!taskColumn.active}
                    theme={theme}
                    titleEditable={!!colTitleEditable}
                    onTaskAdd={onTaskAdd}
                    onTaskUpdate={onTaskUpdate}
                    onTitleChange={(title: string) =>
                      onColumnUpdate && onColumnUpdate(taskColumn.id, title)
                    }
                  />
                </li>
              );
            })}
        </ol>
      </div>
      <nav className="main-nav right">
        <ThemeProvider theme={theme}>
          <IconButton
            onClick={() => onMoveRequest && onMoveRequest(1)}
            className="icon"
            color="primary"
            aria-label="move one day ahead"
            component="span"
          >
            <PlayArrow className="right primary-arrow" />
          </IconButton>
          <IconButton
            onClick={() => onMoveRequest && onMoveRequest(5)}
            className="icon"
            color="primary"
            aria-label="move five days ahead"
            component="span"
          >
            <FastForward className="right secondary-arrow" />
          </IconButton>
          {showDateNav && (
            <>
              <IconButton
                onClick={() => setDatePickerOpen(true)}
                className="icon"
                color="primary"
                aria-label="select a date"
                component="span"
              >
                <CalendarToday className="right tertiary-arrow" />
              </IconButton>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  open={datePickerOpen}
                  value={new Date()}
                  onChange={handleDateChange}
                  onClose={() => setDatePickerOpen(false)}
                  TextFieldComponent={() => <span />}
                />
              </MuiPickersUtilsProvider>
            </>
          )}
        </ThemeProvider>
      </nav>
    </Section>
  );
});

const Section = styled.section<{
  startIndex: number;
  startIndexMob: number;
  totalLength: number;
}>`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 50px;
  position: relative;

  @media (min-width: 48.0625em) {
    grid-template-columns: 3.5555555556rem 1fr 3.5555555556rem;
    margin-top: 50px;
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
      transition: all 0.5s ease-in-out, -webkit-all 0.5s ease-in-out;
      z-index: 0;
      position: relative;
      left: ${props => -(props.startIndex * 20)}%;

      @media (max-width: 48.0625em) {
        grid-auto-columns: calc(100 * 1%);
        left: ${props => -(props.startIndexMob * 100)}%;
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
        font-size: 2em;
      }
      .secondary-arrow {
        font-size: 1em;
        margin-top: 10px;
      }

      .primary-arrow,
      .secondary-arrow {
        &.left {
          display: ${props => (props.startIndex === 0 ? 'none' : '')};
        }
        &.right {
          display: ${props =>
            props.startIndex === props.totalLength - 5 ? 'none' : ''};
          @media (max-width: 48em) {
            display: ${props =>
              props.startIndexMob === props.totalLength - 1 ? 'none' : ''};
          }
        }
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
        .secondary-arrow {
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
