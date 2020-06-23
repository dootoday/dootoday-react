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
   * onTaskUpdate: Event for task update
   */
  onTaskUpdate?: (task: Task) => void;
}

export const TaskItem = memo((props: Props) => {
  const { task, isEditable, onTaskUpdate } = props;
  const [editing, setEditing] = useState(false);
  const [taskState, setTaskState] = useState<Task>(task);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleDoublieClick = () => {
    if (isEditable) {
      setEditing(true);
    }
  };
  const onBlur = (event: any) => {
    event.preventDefault();
    setEditing(false);
    onTaskUpdate && onTaskUpdate(taskState);
  };
  const onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current.blur();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setEditing(false);
      setTaskState(task);
    }
  };
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing, inputRef]);
  return (
    <Li>
      {!editing && (
        <Typography
          onDoubleClick={handleDoublieClick}
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
      {editing && (
        <input
          name="task"
          ref={inputRef}
          className="input"
          value={taskState.markdown}
          onChange={e =>
            setTaskState({ ...taskState, ...{ markdown: e.target.value } })
          }
          onBlur={onBlur}
          onKeyDown={onKeyPress}
        />
      )}
    </Li>
  );
});

const Li = styled.li`
  list-style: none;
  max-height: 20px;
  cursor: grab;

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
  }
  .md {
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
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
