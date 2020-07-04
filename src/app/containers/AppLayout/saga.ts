import { takeLatest, put, call, all } from 'redux-saga/effects';
import { actions } from './slice';
import { GetUserAPI } from 'utils/api';
import http from 'utils/httpcodes';

function* getUserDetails() {
  const { data, status } = yield call(GetUserAPI);
  if (status === http.StatusOK) {
    yield put(
      actions.getUserDetailsSuccess({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        avatar: data.avatar,
        leftDays: data.left_days,
      }),
    );
  }
}

export default function* appLayoutSaga() {
  yield all([takeLatest(actions.getUserDetailsRequest.type, getUserDetails)]);
}
