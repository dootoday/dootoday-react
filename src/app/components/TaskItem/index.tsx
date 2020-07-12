/**
 *
 * TaskItem
 *
 */
import React, { memo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames';

export interface Task {
  id: string;
  markdown: string;
  isDone: boolean;
}

interface Props {
  /**
   * task: this property is a task object contains the task item
   */
  task: Task;

  /**
   * isEditable: if this is true the item is editable
   */
  isEditable?: boolean;

  /**
   * isJustInput: If this is true then this component will work
   * as an input field for a task item
   */
  isJustInput?: boolean;

  /**
   * placeHolder: should only be provided if isJustInput is true
   * else it'll be ignored
   */
  placeHolder?: string;

  /**
   * highlight: should items be highlighted
   */
  highlight?: boolean;

  /**
   * theme: Theme object of material UI
   */
  theme?: Theme;

  /**
   * onTaskUpdate: Event for task update
   */
  onTaskUpdate?: (task: Task) => void;
}

export const TaskItem = memo((props: Props) => {
  const { task, isEditable, isJustInput, placeHolder, onTaskUpdate } = props;
  const theme = props.theme || createMuiTheme();
  const highlight = !!props.highlight;
  const [editing, setEditing] = useState(!!isJustInput);
  const justEditingTaskState: Task = {
    id: task.id,
    markdown: '',
    isDone: false,
  };
  const [taskState, setTaskState] = useState<Task>(
    isJustInput ? justEditingTaskState : task,
  );
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  let timeouts: number[] = [];
  const handleDoublieClick = () => {
    if (timeouts.length) {
      timeouts.forEach(to => {
        clearTimeout(to);
      });
      timeouts = [];
    }
    if (isEditable) {
      setEditing(true);
    }
  };
  const handleClick = () => {
    timeouts.push(
      setTimeout(() => {
        const newState = { ...taskState, ...{ isDone: !taskState.isDone } };
        setTaskState(newState);
        onTaskUpdate && onTaskUpdate(newState);
      }, 400),
    );
  };
  const onBlur = (event: any) => {
    event.preventDefault();
    onTaskUpdate && onTaskUpdate({ ...taskState });
    if (isJustInput) {
      setTaskState(justEditingTaskState);
    } else {
      setEditing(false);
    }
  };
  const handleDelete = () => {
    const newState = { ...taskState, ...{ markdown: '' } };
    onTaskUpdate && onTaskUpdate(newState);
  };
  const onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isJustInput) {
        onTaskUpdate && onTaskUpdate({ ...taskState });
        setTaskState(justEditingTaskState);
      } else {
        inputRef.current.blur();
      }
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setEditing(!!isJustInput);
      setTaskState(isJustInput ? justEditingTaskState : task);
    }
  };
  useEffect(() => {
    if (editing && !isJustInput) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing, inputRef, isJustInput]);
  return (
    <>
      <Div {...{ theme, highlight }}>
        {!editing && (
          <div className="task-item">
            <Typography
              onDoubleClick={handleDoublieClick}
              onClick={handleClick}
              variant={'caption'}
              className={cx({ done: taskState.isDone })}
            >
              <ReactMarkdown
                className="md"
                disallowedTypes={['break', 'delete']}
                linkTarget={'_blank'}
                source={taskState.markdown}
              />
            </Typography>
            {taskState.isDone && (
              <IconButton
                aria-label="delete"
                className={cx('icon-button', 'icon-button-delete')}
                onClick={handleDelete}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
            {!taskState.isDone && (
              <IconButton
                aria-label="delete"
                className={cx('icon-button', 'edit-icon-button')}
                onClick={handleDoublieClick}
              >
                <CreateIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        )}
        {(editing || isJustInput) && (
          <input
            name="task"
            ref={inputRef}
            className="input"
            value={taskState.markdown || ''}
            placeholder={!!isJustInput ? placeHolder : ''}
            autoComplete="off"
            onChange={e =>
              setTaskState({ ...taskState, ...{ markdown: e.target.value } })
            }
            onBlur={onBlur}
            onKeyDown={onKeyPress}
          />
        )}
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme; highlight: boolean }>`
  height: 25px;
  margin-bottom: 0px;
  margin-top: 0px;
  color: ${props =>
    props.highlight
      ? props.theme.palette.primary.dark
      : props.theme.palette.secondary.dark};

  .done {
    text-decoration: line-through;
  }
  .input {
    font-size: 0.75rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    outline: none;
    border: none;
    padding: 0px;
    height: auto;
    width: 100%;
    padding-left: 2px;
    color: ${props =>
      props.highlight
        ? props.theme.palette.primary.dark
        : props.theme.palette.secondary.dark};
  }
  .icon-button {
    padding: 0;
    font-size: 16px;
    position: absolute;
    right: 0;
    top: 1px;
  }
  .task-item {
    position: relative;
    .icon-button-delete {
      display: none;
    }
    :hover {
      background-color: ${props => props.theme.palette.primary.light};
      .icon-button-delete {
        display: block;
      }
    }
  }
  .edit-icon-button {
    display: none;
  }
  .md {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 2px;
    :hover {
      overflow: visible;
      text-overflow: unset;
      white-space: initial;
      cursor: grab;
      position: relative;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 0.75rem;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.66;
      letter-spacing: 0.03333em;
      margin: 0px;
    }
    p {
      margin: 0px;
    }
    ul {
      margin: 0px;
      padding: 0px;
      li {
        list-style: none;
        padding: 0px;
      }
    }
  }

  @media (max-width: 48.0625em) {
    margin-bottom: 0px;
    margin-top: 10px;
    height: 37px;
    .input {
      font-size: 0.95rem;
    }
    .md {
      font-size: 0.95rem;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 0.95rem;
        line-height: 1.66;
      }
      p {
        font-size: 0.95rem;
      }
      li {
        font-size: 0.95rem;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .icon-button {
      right: 1px;
      top: 5px;
    }
    .task-item {
      .icon-button-delete {
        display: block;
      }
      .edit-icon-button {
        display: block;
      }
    }
  }
`;
