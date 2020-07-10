import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import http from 'utils/httpcodes';
import { GetTaskOnDateAPI } from 'utils/api';

// export function* doSomething() {}

function* getDailyTasks() {
  const { data, status } = yield call(
    GetTaskOnDateAPI,
    '2020-07-01',
    '2020-07-20',
  );
  if (status === http.StatusOK) {
    yield put(actions.getDailyTaksSuccess(data));
  }
}

export function* homePageSaga() {
  yield all([takeLatest(actions.getDailyTaskRequest.type, getDailyTasks)]);
}
