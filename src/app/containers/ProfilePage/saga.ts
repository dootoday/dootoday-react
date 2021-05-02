import { call, put, all, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as appActions } from './../AppLayout/slice';
import { UpdateAutoTaskMove } from 'utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import http from 'utils/httpcodes';

function* autoTaskMove(action: PayloadAction<{ enable: boolean }>) {
  try {
    const { status } = yield call(UpdateAutoTaskMove, action.payload.enable);
    if (status === http.StatusOK || status === http.StatusPartialContent) {
      yield put(appActions.updateTaskAutoMove(action.payload.enable));
      yield put(actions.autoTaskMoveSuccess());
    } else {
      const newLocal = '';
      throw newLocal;
    }
  } catch (e) {
    yield put(actions.autoTaskMoveFailure('We could not turn auto task move'));
  }
}

export default function* profilePageSaga() {
  yield all([takeLatest(actions.updateAutoTaskMove.type, autoTaskMove)]);
}
