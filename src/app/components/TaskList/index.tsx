/**
 *
 * TaskList
 *
 */
import React, { memo, useState, useEffect, useRef } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components/macro';
import { Task, TaskItem } from '../TaskItem';

interface Props {
  /**
   * Unique identifier for the task section
   * on that page
   */
  id: string;

  /**
   * This is the title of the task list
   * For the main section this is the day
   * of the week
   */
  title: string;

  /**
   * This is the meta text of the task list
   * For the main section this is the date
   */
  meta?: string;

  /**
   * This is a flag to determine if title is
   * editable.
   * If that is true then onTitleChange will be
   * triggered on edit
   */
  titleEditable?: boolean;

  /**
   * Task list is the list of the tasks
   */
  tasks?: Task[];

  /**
   * highlight: should items be highlighted
   */
  highlight?: boolean;

  /**
   * allowDelete: is the column allowed to be deleted
   */
  allowDelete?: boolean;

  /**
   * theme: Theme object of material UI
   */
  theme?: Theme;

  /** Events **/
  /**
   * Should be provided if title is editabe
   * If not provided title value will be rest on edit
   */
  onTitleChange?: (title: string) => void;

  /**
   * This event is called when a new task is added for the
   * list
   */
  onTaskAdd?: (task: string, listID: string) => void;

  /**
   * This event is called when an existing task is
   * updated on the list
   */
  onTaskUpdate?: (task: Task, listID: string) => void;

  /**
   * This event is called when a list is requested to delete
   */
  onListDelete?: () => void;
}

export const TaskList = memo((props: Props) => {
  const {
    id,
    title,
    meta,
    titleEditable,
    tasks,
    allowDelete,
    onTitleChange,
    onTaskAdd,
    onTaskUpdate,
    onListDelete,
  } = props;
  const theme = props.theme || createMuiTheme();
  const highlight = !!props.highlight;
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, chageTitleValue] = useState(title);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const newTaskRef = useRef() as React.MutableRefObject<{
    focusInput: () => void;
    blurInput: () => void;
  }>;
  const onClickTitle = (event: any) => {
    event.preventDefault();
    if (titleEditable) {
      setEditingTitle(true);
    }
  };
  const onBlurTitle = (event: any) => {
    event.preventDefault();
    setEditingTitle(false);
    onTitleChange && onTitleChange(titleValue);
  };
  const onKeyPressTitle = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current.blur();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setEditingTitle(false);
      chageTitleValue(title);
    }
  };
  const handleTaskAdd = (task: Task) => {
    onTaskAdd && onTaskAdd(task.markdown, id);
  };
  const handleTaskUpdate = (task: Task) => {
    onTaskUpdate && onTaskUpdate(task, id);
  };
  const handleBodyClick = () => {
    newTaskRef.current.focusInput();
  };
  useEffect(() => {
    if (editingTitle) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingTitle, inputRef]);
  return (
    <Div {...{ theme, highlight }}>
      <section>
        <header className="header">
          {allowDelete && (
            <IconButton
              size="small"
              className="del-icon"
              onClick={() => allowDelete && onListDelete && onListDelete()}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          {!editingTitle && (
            <Typography variant="h6" onClick={onClickTitle}>
              {titleValue}
            </Typography>
          )}
          {titleEditable && editingTitle && (
            <div>
              <input
                ref={inputRef}
                className="title_editor"
                name="title"
                autoComplete="off"
                value={titleValue || ''}
                onChange={e => chageTitleValue(e.target.value)}
                onBlur={onBlurTitle}
                onKeyDown={onKeyPressTitle}
              />
            </div>
          )}
          <Typography variant="caption">{meta}</Typography>
        </header>
      </section>
      <section className="body" onClick={handleBodyClick}>
        <Droppable droppableId={id}>
          {provided => (
            <ul
              onClick={e => e.stopPropagation()}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {!!tasks &&
                !!tasks.length &&
                tasks.map((task, index) => (
                  <Draggable
                    draggableId={task.id}
                    isDragDisabled={!!task.recurringID}
                    index={index}
                    key={task.id}
                  >
                    {provided => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={task}
                          theme={theme}
                          highlight={highlight}
                          onTaskUpdate={handleTaskUpdate}
                          isEditable={true}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              <li>
                <TaskItem
                  task={{} as Task}
                  theme={theme}
                  highlight={highlight}
                  onTaskUpdate={handleTaskAdd}
                  isJustInput={true}
                  ref={newTaskRef}
                />
              </li>
            </ul>
          )}
        </Droppable>
      </section>
    </Div>
  );
});

const Div = styled.div<{ theme: Theme; highlight: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props =>
    props.highlight
      ? props.theme.palette.primary.dark
      : props.theme.palette.secondary.dark};

  &:hover {
    .header {
      .del-icon {
        opacity: 0.8;
      }
    }
  }

  .header {
    left: 0;
    margin-bottom: 2.7777777778em;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100%;

    .del-icon {
      opacity: 0;
      position: absolute;
      right: -15px;

      @media (max-width: 48.0625em) {
        display: none;
      }
    }

    h6 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title_editor {
      border: none;
      font-size: 1.25rem;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      text-transform: uppercase;
      text-align: center;
      outline: none;
      width: 100%;
      color: ${props =>
        props.highlight
          ? props.theme.palette.primary.dark
          : props.theme.palette.secondary.dark};
    }

    @media (min-width: 48.0625em) {
      position: relative;
    }
  }

  .body {
    background-image: repeating-linear-gradient(
      transparent,
      transparent 44px,
      rgba(0, 0, 0, 0.08) 44px,
      rgba(0, 0, 0, 0.08) 45px,
      transparent 45px,
      transparent 47px
    );
    flex: 1 1 100%;

    @media (min-width: 48.0625em) {
      background-image: repeating-linear-gradient(
        transparent,
        transparent 22px,
        rgba(0, 0, 0, 0.08) 22px,
        rgba(0, 0, 0, 0.08) 23.23px,
        transparent 23.23px,
        transparent 25px
      );
    }

    ul {
      padding: 0px;
      margin: 0px;
      li {
        list-style: none;
      }
    }
  }
`;
