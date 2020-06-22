/**
 *
 * TaskList
 *
 */
import React, { memo, useState } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

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
  onTaskAdd?: (task: string) => void;

  /**
   * This event is called when an existing task is
   * updated on the list
   */
  onTaskUpdate?: (id: string, task: string) => void;
}

export const TaskList = memo((props: Props) => {
  const { title, meta, titleEditable, onTitleChange, onTaskAdd } = props;
  const [editingTitle, setEditingTitle] = useState(false);
  return (
    <Div>
      <section>
        <header className="header">
          {!editingTitle && (
            <Typography variant="h6" onClick={() => setEditingTitle(true)}>
              {title}
            </Typography>
          )}
          {titleEditable && editingTitle && (
            <div>
              <input className="title_editor" name="title" value={title} />
            </div>
          )}
          <Typography variant="caption">{meta}</Typography>
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
    left: 0;
    margin-bottom: 2.7777777778em;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100%;

    .title_editor {
      border: none;
      font-size: 1.25rem;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      text-transform: uppercase;
      text-align: center;
    }

    @media (min-width: 48.0625em) {
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
