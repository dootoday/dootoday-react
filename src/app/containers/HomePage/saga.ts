import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import http from 'utils/httpcodes';
import {
  GetTasksOnDateAPI,
  CreateTaskAPI,
  UpdateTaskAPI,
  DeleteTaskAPI,
  ReposTaskAPI,
  GetTasksOnColumnAPI,
  UpdateColumnAPI,
  CreateColumnAPI,
  DeleteColumnAPI,
} from 'utils/api';
import { GetDateRange } from 'utils/mappers';

// export function* doSomething() {}

function* getDailyTasks(action) {
  const [startDate, endDate] = GetDateRange(action.payload.date);
  const { data, status } = yield call(GetTasksOnDateAPI, startDate, endDate);
  if (status === http.StatusOK) {
    yield put(actions.getDailyTaksSuccess(data));
  }
}

function* getColumnTasks() {
  const { data, status } = yield call(GetTasksOnColumnAPI);
  if (status === http.StatusOK) {
    yield put(actions.getColumnTaksSuccess(data));
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
  const { status } = yield call(ReposTaskAPI, action.payload);
  if (status === http.StatusOK) {
    yield put(actions.reposSuccess());
  }
}

function* updateColumn(action) {
  const { id, name } = action.payload;
  const { status } = yield call(UpdateColumnAPI, id, name);
  if (status === http.StatusOK) {
    yield put(actions.colUpdateSuccess(id, name));
  }
}

function* createColumn(action) {
  const { name } = action.payload;
  const { status, data } = yield call(CreateColumnAPI, name);
  if (status === http.StatusOK) {
    yield put(actions.colCreateSuccess(data));
  }
}

function* deleteColumn(action) {
  const { id } = action.payload;
  const { status } = yield call(DeleteColumnAPI, id);
  if (status === http.StatusOK) {
    yield put(actions.colDeleteSuccess(id));
  }
}

export function* homePageSaga() {
  yield all([
    takeLatest(actions.getDailyTaskRequest.type, getDailyTasks),
    takeLatest(actions.getColumnTaskRequest.type, getColumnTasks),
    takeLatest(actions.createTaskRequest.type, createTask),
    takeLatest(actions.updateTaskRequest.type, updateTask),
    takeLatest(actions.deleteTaskRequest.type, deleteTask),
    takeLatest(actions.reposRequest.type, reposTask),
    takeLatest(actions.colUpdateRequest.type, updateColumn),
    takeLatest(actions.colCreateRequest.type, createColumn),
    takeLatest(actions.colDeleteRequest.type, deleteColumn),
  ]);
}
