/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
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
import { dragNDropPayload, Task } from './types';
import { IconButton } from '@material-ui/core';
import { GetLastUpdateAPI } from 'utils/api';
import http from 'utils/httpcodes';
import { GetLastUpdated, SetLastUpdated } from 'utils/auth';
import { differenceInSeconds } from 'date-fns/esm';

interface Props {
  theme?: Theme;
  userFetched?: boolean;
}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();
  const { userFetched } = props;
  const dailyTaskCols = useSelector(selectDailyTask);
  const colTaskCols = useSelector(selectColumnTask);
  const dailyTaskStartPos = useSelector(selectDailyTaskStart);
  const colTaskStartPos = useSelector(selectColTaskStart);
  const [currentLoc, setCurrentLoc] = useState(Today());

  const refreshTimer = useRef(0);
  const refreshTaskList = useCallback(() => {
    GetLastUpdateAPI().then(resp => {
      if (resp.status === http.StatusOK) {
        const lastUpdatedInClientInString = GetLastUpdated();
        if (!!!lastUpdatedInClientInString) {
          SetLastUpdated(resp.data.last_updated);
        } else {
          const lastUpdatedInServer = new Date(resp.data.last_updated);
          const lastUpdatedInClient = new Date(lastUpdatedInClientInString);
          const diff = differenceInSeconds(
            lastUpdatedInServer,
            lastUpdatedInClient,
          );
          if (diff > 0) {
            SetLastUpdated(lastUpdatedInServer.toString());
            dispatch(actions.getDailyTaskRequest(currentLoc));
            dispatch(actions.getColumnTaskRequest());
          }
        }
      }
    });
    refreshTimer.current = setTimeout(refreshTaskList, 60 * 1000, true);
  }, [currentLoc, dispatch]);

  useEffect(() => {
    if (userFetched) {
      dispatch(actions.getDailyTaskRequest(currentLoc));
    }
  }, [dispatch, userFetched, currentLoc]);

  useEffect(() => {
    if (userFetched) {
      dispatch(actions.getColumnTaskRequest());
      refreshTaskList();
    }
  }, [dispatch, userFetched, refreshTaskList]);

  // This is equivalent to componentWillUnmount
  useEffect(() => {
    return function cleanup() {
      clearTimeout(refreshTimer.current);
      // this produce a flicker on view change
      // dispatch(actions.clearAllTask());
    };
  }, [dispatch]);

  const moveToHomeLocation = () => {
    const idx = dailyTaskCols.findIndex(col => col.active);
    if (idx > 0) {
      dispatch(actions.moveDailyTaskToHome(idx));
    } else {
      setCurrentLoc(Today());
      // dispatch(actions.getDailyTaskRequest(Today()));
    }
  };

  const createTaskOnDate = (task, date) => {
    if (!!!task) {
      return;
    }
    const inp = task.trim();
    if (!!inp) {
      dispatch(actions.createTaskRequest(inp, date, '', false, currentLoc));
    }
  };

  const createTaskOnColumn = (task, col) => {
    if (!!!task) {
      return;
    }
    const inp = task.trim();
    if (!!inp) {
      dispatch(actions.createTaskRequest(inp, '', col, false, currentLoc));
    }
  };

  const updateTask = (task: Task) => {
    const { markdown, recurringID, isDone, id } = task;
    const inp = markdown.trim();
    if (!!inp) {
      dispatch(
        actions.updateTaskRequest(id, inp, recurringID, isDone, currentLoc),
      );
    } else {
      dispatch(actions.deleteTaskRequest(id, recurringID !== '0', currentLoc));
    }
  };

  const handleDragNDrop = (event: OnDragEndResponder) => {
    try {
      const taskID = event.draggableId.split('-')[0];
      const recurringID = event.draggableId.split('-')[1];

      // If it's a recurring task then inter column
      // drop is not allowed
      if (
        recurringID !== '0' &&
        event.source.droppableId !== event.destination.droppableId
      ) {
        return;
      }
      const payload: dragNDropPayload = {
        taskID: taskID,
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
              setCurrentLoc(MapDateToString(moment(move)))
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
