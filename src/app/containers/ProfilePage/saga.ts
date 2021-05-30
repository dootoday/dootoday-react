import { call, put, all, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as appActions } from './../AppLayout/slice';
import { UpdateAutoTaskMove, UpdateDailyEmail } from 'utils/api';
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
    yield put(actions.autoTaskMoveFailure('We could not update'));
  }
}

function* updateDailyEmail(action: PayloadAction<{ enable: boolean }>) {
  try {
    const { status } = yield call(UpdateDailyEmail, action.payload.enable);
    if (status === http.StatusOK || status === http.StatusPartialContent) {
      yield put(appActions.updateDailyEmailUpdate(action.payload.enable));
      yield put(actions.updateDailyEmailUpdateSuccess());
    } else {
      const newLocal = '';
      throw newLocal;
    }
  } catch (e) {
    yield put(actions.updateDailyEmailUpdateFailure('We could not update'));
  }
}

export default function* profilePageSaga() {
  yield all([takeLatest(actions.updateAutoTaskMove.type, autoTaskMove)]);
  yield all([
    takeLatest(actions.updateDailyEmailUpdate.type, updateDailyEmail),
  ]);
}
