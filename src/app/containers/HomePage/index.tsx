/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { Theme, createMuiTheme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { MainSection } from 'app/components/MainSection/Loadable';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import {
  selectDailyTask,
  selectDailyTaskStart,
  selectColumnTask,
  selectColTaskStart,
} from './selectors';
import { homePageSaga } from './saga';
import { Today, MapDateToString } from 'utils/mappers';
import { dragNDropPayload } from './types';
import { IconButton } from '@material-ui/core';

interface Props {
  theme?: Theme;
}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();
  const dailyTaskCols = useSelector(selectDailyTask);
  const colTaskCols = useSelector(selectColumnTask);
  const dailyTaskStartPos = useSelector(selectDailyTaskStart);
  const colTaskStartPos = useSelector(selectColTaskStart);

  useEffect(() => {
    dispatch(actions.getDailyTaskRequest(Today()));
    dispatch(actions.getColumnTaskRequest(Today()));
  }, [dispatch]);

  const moveToHomeLocation = () => {
    const idx = dailyTaskCols.findIndex(col => col.active);
    if (idx > 0) {
      dispatch(actions.moveDailyTaskToHome(idx));
    } else {
      dispatch(actions.getDailyTaskRequest(Today()));
    }
  };

  const createTaskOnDate = (task, date) => {
    if (!!task) {
      dispatch(actions.createTaskRequest(task, date, '', false));
    }
  };

  const createTaskOnColumn = (task, col) => {
    if (!!task) {
      dispatch(actions.createTaskRequest(task, '', col, false));
    }
  };

  const updateTask = task => {
    const { markdown, isDone, id } = task;
    if (!!markdown) {
      dispatch(actions.updateTaskRequest(id, markdown, isDone));
    } else {
      dispatch(actions.deleteTaskRequest(id));
    }
  };

  const handleDragNDrop = (event: OnDragEndResponder) => {
    try {
      const payload: dragNDropPayload = {
        taskID: event.draggableId,
        source: {
          colID: event.source.droppableId,
          idx: event.source.index,
        },
        destination: {
          colID: event.destination.droppableId,
          idx: event.destination.index,
        },
      };
      const allTasks = [...dailyTaskCols, ...colTaskCols];
      let colIdx = allTasks.findIndex(c => c.id === payload.destination.colID);
      const ids = allTasks[colIdx].tasks.map(t => parseInt(t.id));
      // remove id from the source and the destination is same
      const finalids =
        payload.destination.colID === payload.source.colID
          ? ids.filter(i => i !== parseInt(payload.taskID))
          : ids;
      finalids.splice(payload.destination.idx, 0, parseInt(payload.taskID));
      dispatch(
        actions.reposRequest({ col: payload.destination.colID, ids: finalids }),
      );
      dispatch(actions.reposRequestLocal(payload));
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e);
      }
    }
  };

  const handleCreateColumn = () => {
    dispatch(actions.colCreateRequest('*Edit*'));
  };

  const handleColumnUpdate = (colID: string, title: string) => {
    dispatch(actions.colUpdateRequest(colID, title));
  };

  const handleColumnDelete = (colID: string) => {
    dispatch(actions.colDeleteRequest(colID));
  };

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Div theme={theme}>
        <DragDropContext onDragEnd={handleDragNDrop}>
          <MainSection
            taskColumns={dailyTaskCols}
            startIndex={dailyTaskStartPos.pc}
            startIndexMob={dailyTaskStartPos.mob}
            showDateNav={true}
            showHomeNav={true}
            theme={theme}
            onMoveRequest={move => dispatch(actions.moveDailyTask(move))}
            onHomeRequest={moveToHomeLocation}
            onMoveToDateRequest={move =>
              dispatch(actions.getDailyTaskRequest(MapDateToString(move)))
            }
            onTaskAdd={createTaskOnDate}
            onTaskUpdate={updateTask}
          ></MainSection>
          <div className="separator">
            <IconButton
              size="small"
              className="add-icon"
              onClick={handleCreateColumn}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <MainSection
            taskColumns={colTaskCols}
            startIndex={colTaskStartPos.pc}
            startIndexMob={colTaskStartPos.mob}
            theme={theme}
            colTitleEditable={true}
            colDeleteAllowed={true}
            onMoveRequest={move => dispatch(actions.moveColumnTask(move))}
            onTaskAdd={createTaskOnColumn}
            onTaskUpdate={updateTask}
            onColumnUpdate={handleColumnUpdate}
            onColumnDelete={handleColumnDelete}
          ></MainSection>
        </DragDropContext>
      </Div>
    </>
  );
});

const Div = styled.div<{ theme: Theme }>`
  .separator {
    height: 40px;
    background-color: ${props => props.theme.palette.primary.light};
    display: flex;
    justify-content: flex-end;

    .add-icon {
      margin-right: 12px;
    }
  }
`;
