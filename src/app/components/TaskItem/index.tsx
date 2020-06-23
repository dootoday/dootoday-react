/**
 *
 * TaskItem
 *
 */
import React, { memo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

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
   * onTaskUpdate: Event for task update
   */
  onTaskUpdate?: (task: Task) => void;
}

export const TaskItem = memo((props: Props) => {
  const { task, isEditable, isJustInput, placeHolder, onTaskUpdate } = props;
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
    if (editing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing, inputRef]);
  return (
    <>
      <Li>
        {!editing && (
          <Typography
            onDoubleClick={handleDoublieClick}
            onClick={handleClick}
            variant={'caption'}
            className={taskState.isDone ? 'done' : ''}
          >
            <ReactMarkdown
              className={'md'}
              disallowedTypes={['break', 'delete']}
              linkTarget={'_blank'}
              source={taskState.markdown}
            />
          </Typography>
        )}
        {(editing || isJustInput) && (
          <input
            name="task"
            ref={inputRef}
            className="input"
            value={taskState.markdown}
            placeholder={!!isJustInput ? placeHolder : ''}
            onChange={e =>
              setTaskState({ ...taskState, ...{ markdown: e.target.value } })
            }
            onBlur={onBlur}
            onKeyDown={onKeyPress}
          />
        )}
      </Li>
    </>
  );
});

const Li = styled.li`
  list-style: none;
  max-height: 20px;
  margin-bottom: 5px;
  margin-top: 3px;

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
    padding-left: 5px;
  }
  .md {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    :hover {
      overflow: visible;
      text-overflow: unset;
      white-space: initial;
      background-color: #fddddb;
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
`;
