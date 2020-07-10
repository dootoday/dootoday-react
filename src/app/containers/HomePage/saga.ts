import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import http from 'utils/httpcodes';
import {
  GetTaskOnDateAPI,
  CreateTaskAPI,
  UpdateTaskAPI,
  DeleteTaskAPI,
  ReposTaskAPI,
} from 'utils/api';
import { GetDateRange } from 'utils/mappers';

// export function* doSomething() {}

function* getDailyTasks(action) {
  const [startDate, endDate] = GetDateRange(action.payload.date);
  const { data, status } = yield call(GetTaskOnDateAPI, startDate, endDate);
  if (status === http.StatusOK) {
    yield put(actions.getDailyTaksSuccess(data));
  }
}

function* createTask(action) {
  const { markdown, date, column_id, is_done } = action.payload;
  const { data, status } = yield call(
    CreateTaskAPI,
    markdown,
    date,
    column_id,
    is_done,
  );
  if (status === http.StatusOK) {
    yield put(actions.createTaskSuccess(data));
  }
}

function* updateTask(action) {
  const { markdown, id, is_done } = action.payload;
  const { data, status } = yield call(UpdateTaskAPI, id, markdown, is_done);
  if (status === http.StatusOK) {
    yield put(actions.updateTaskSuccess(data));
  }
}

function* deleteTask(action) {
  const { id } = action.payload;
  const { status } = yield call(DeleteTaskAPI, id);
  if (status === http.StatusOK) {
    yield put(actions.deleteTaskSuccess(id));
  }
}

function* reposTask(action) {
  yield call(ReposTaskAPI, action.payload);
}

export function* homePageSaga() {
  yield all([
    takeLatest(actions.getDailyTaskRequest.type, getDailyTasks),
    takeLatest(actions.createTaskRequest.type, createTask),
    takeLatest(actions.updateTaskRequest.type, updateTask),
    takeLatest(actions.deleteTaskRequest.type, deleteTask),
    takeLatest(actions.reposRequest.type, reposTask),
  ]);
}
