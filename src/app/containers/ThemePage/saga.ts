import { call, put, takeLatest } from 'redux-saga/effects';
import { GetThemesAPI } from 'utils/api';
import http from 'utils/httpcodes';
import { actions } from './slice';

export function* getThemes() {
  const { data, status } = yield call(GetThemesAPI);
  if (status === http.StatusOK) {
    yield put(actions.getThemesSuccess(data));
  }
}

export function* themePageSaga() {
  yield takeLatest(actions.getThemes.type, getThemes);
}
