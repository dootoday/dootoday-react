/**
 *
 * TaskItem
 *
 */
import React, { memo } from 'react';
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
}

export const TaskItem = memo((props: Props) => {
  const { task } = props;
  return (
    <Li>
      <Typography variant={'caption'} className={task.isDone ? 'done' : ''}>
        <ReactMarkdown
          disallowedTypes={['heading', 'break']}
          linkTarget={'_blank'}
          source={task.markdown}
        />
      </Typography>
    </Li>
  );
});

const Li = styled.li`
  list-style: none;
  .done {
    text-decoration: line-through;
  }
`;
