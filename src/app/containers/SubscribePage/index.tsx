/**
 *
 * SubscribePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectSubscribePage } from './selectors';
import { subscribePageSaga } from './saga';
import { Theme, createMuiTheme } from '@material-ui/core';
import { userFetchedSelector } from 'app/containers/AppLayout/selector';

interface Props {
  theme?: Theme;
  show?: boolean;
}

export const SubscribePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: subscribePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscribePage = useSelector(selectSubscribePage);
  const userFetched = useSelector(userFetchedSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = props.theme || createMuiTheme();

  return (
    <>
      <Helmet>
        <title>SubscribePage</title>
        <meta name="description" content="Description of SubscribePage" />
      </Helmet>
      {userFetched && <Div>Hello this is subscribe page</Div>}
    </>
  );
});

const Div = styled.div`
  margin-top: 50px;
`;
