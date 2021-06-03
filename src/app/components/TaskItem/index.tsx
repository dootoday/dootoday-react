/**
 *
 * TaskItem
 *
 */
import React, {
  memo,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components/macro';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import emoji from 'emoji-dictionary';
import { blue } from '@material-ui/core/colors';

export interface Task {
  id: string;
  markdown: string;
  isDone: boolean;
  recurringID: string;
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

export const TaskItem = memo(
  forwardRef((props: Props, ref) => {
    const { task, isEditable, isJustInput, placeHolder, onTaskUpdate } = props;
    const theme = props.theme || createMuiTheme();
    const highlight = !!props.highlight;
    const [editing, setEditing] = useState(!!isJustInput);
    const justEditingTaskState: Task = {
      id: task.id,
      markdown: '',
      isDone: false,
      recurringID: task.recurringID,
    };
    const [taskState, setTaskState] = useState<Task>(
      isJustInput ? justEditingTaskState : task,
    );
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleDoublieClick = () => {
      if (isEditable) {
        setEditing(true);
      }
    };
    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();
      const newState = { ...taskState, ...{ isDone: !taskState.isDone } };
      setTaskState(newState);
      onTaskUpdate && onTaskUpdate(newState);
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
      if (editing && !isJustInput) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [editing, inputRef, isJustInput]);
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current.focus();
        inputRef.current.select();
      },
      blurInput: () => {
        inputRef.current.blur();
      },
    }));
    const LinkRenderer = props => {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          {props.children}
        </a>
      );
    };
    const emojiSupport = text =>
      text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name) || name);

    const calcTaskText = (task: Task) => {
      // adding repeat emoji if it's a recurring task
      return `${task.recurringID !== '0' ? ':repeat:' : ''} ${task.markdown}`;
    };

    useEffect(() => {
      setTaskState(task);
    }, [task]);

    return (
      <>
        <Div {...{ theme, highlight }}>
          {!editing && (
            <>
              <Typography
                onClick={handleClick}
                variant={'caption'}
                className={taskState.isDone ? 'done' : ''}
              >
                <ReactMarkdown
                  className={'md'}
                  disallowedTypes={['break', 'delete']}
                  source={calcTaskText(taskState)}
                  renderers={{ link: LinkRenderer, text: emojiSupport }}
                />
              </Typography>
              <div className="edit-icon" onClick={handleDoublieClick}>
                <EditIcon style={{ fontSize: '0.75rem' }} />
              </div>
            </>
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
  }),
);

const Div = styled.div<{ theme: Theme; highlight: boolean }>`
  height: 25px;
  margin-bottom: 0px;
  margin-top: 0px;
  position: relative;
  color: ${props =>
    props.highlight
      ? props.theme.palette.primary.dark
      : props.theme.palette.secondary.dark};

  .done {
    text-decoration: line-through;
    color: ${props =>
      props.highlight
        ? props.theme.palette.primary.light
        : props.theme.palette.secondary.light};
    .md {
      a {
        color: ${blue[200]};
      }
    }
    :hover {
      color: ${props =>
        props.highlight
          ? props.theme.palette.primary.dark
          : props.theme.palette.secondary.dark};
      .md {
        a {
          color: ${blue[400]};
        }
      }
    }
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
  .md {
    width: calc(100% - 20px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 2px;

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
    a {
      text-decoration: none;
      color: ${blue[400]};
    }
  }

  .edit-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :hover {
    .md {
      overflow: visible;
      text-overflow: unset;
      white-space: initial;
      background-color: ${props => props.theme.palette.primary.light};
      cursor: grab;
      position: relative;
      z-index: 2;
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
`;
