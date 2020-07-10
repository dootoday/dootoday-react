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
import { DragDropContext } from 'react-beautiful-dnd';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectDailyTask, selectDailyTaskStart } from './selectors';
import { homePageSaga } from './saga';
import { Today, MapDateToString } from 'utils/mappers';

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

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Div>
        <DragDropContext onDragEnd={e => console.log(e)}>
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
