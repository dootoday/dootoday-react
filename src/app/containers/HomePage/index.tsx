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
import { MainSection } from 'app/components/MainSection/Loadable';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectDailyTask, selectDailyTaskStart } from './selectors';
import { homePageSaga } from './saga';
import { Today, MapDateToString } from 'utils/mappers';
import { dragNDropPayload } from './types';

interface Props {
  theme?: Theme;
}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();
  const taskCols = useSelector(selectDailyTask);
  const dailyTaskStartPos = useSelector(selectDailyTaskStart);

  useEffect(() => {
    dispatch(actions.getDailyTaskRequest(Today()));
  }, [dispatch]);

  const moveToHomeLocation = () => {
    const idx = taskCols.findIndex(col => col.active);
    if (idx > 0) {
      dispatch(actions.moveDailyTask(idx - 1 - dailyTaskStartPos));
    } else {
      dispatch(actions.getDailyTaskRequest(Today()));
    }
  };

  const createTaskOnDate = (task, date) => {
    if (!!task) {
      dispatch(actions.createTaskRequest(task, date, '', false));
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
    const colIdx = taskCols.findIndex(c => c.id === payload.destination.colID);
    const ids = taskCols[colIdx].tasks.map(t => parseInt(t.id));
    ids.splice(payload.destination.idx, 0, parseInt(payload.taskID));
    dispatch(
      actions.reposRequest({ col: payload.destination.colID, ids: ids }),
    );
    dispatch(actions.reposRequestLocal(payload));
  };

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Div>
        <DragDropContext onDragEnd={handleDragNDrop}>
          <MainSection
            taskColumns={taskCols}
            startIndex={dailyTaskStartPos}
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
        </DragDropContext>
      </Div>
    </>
  );
});

const Div = styled.div``;
