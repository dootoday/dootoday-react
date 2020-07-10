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
import { selectDailyTask } from './selectors';
import { homePageSaga } from './saga';

interface Props {
  theme?: Theme;
}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });
  const dispatch = useDispatch();
  const theme = props.theme || createMuiTheme();
  const taskCols = useSelector(selectDailyTask);

  useEffect(() => {
    dispatch(actions.getDailyTaskRequest());
  }, [dispatch]);

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
            startIndex={1}
            showDateNav={true}
            showHomeNav={true}
            theme={theme}
          ></MainSection>
        </DragDropContext>
      </Div>
    </>
  );
});

const Div = styled.div``;
