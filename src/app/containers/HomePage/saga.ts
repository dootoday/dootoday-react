import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import http from 'utils/httpcodes';
import { GetTaskOnDateAPI } from 'utils/api';
import { GetDateRange } from 'utils/mappers';

// export function* doSomething() {}

function* getDailyTasks(action) {
  const [startDate, endDate] = GetDateRange(action.payload.date);
  const { data, status } = yield call(GetTaskOnDateAPI, startDate, endDate);
  if (status === http.StatusOK) {
    yield put(actions.getDailyTaksSuccess(data));
  }
}

export function* homePageSaga() {
  yield all([takeLatest(actions.getDailyTaskRequest.type, getDailyTasks)]);
}
