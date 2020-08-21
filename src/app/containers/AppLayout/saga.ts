import { takeLatest, put, call, all } from 'redux-saga/effects';
import { actions } from './slice';
import { GetUserAPI, UpdateUserTimeZone } from 'utils/api';
import http from 'utils/httpcodes';

function* getUserDetails(action) {
  try {
    const { data, status } = yield call(GetUserAPI);
    if (status === http.StatusOK || status === http.StatusPartialContent) {
      // Check and update user's time zone offset
      const d = new Date();
      const tzOffset = d.getTimezoneOffset();
      if (tzOffset !== data.time_zone_offset) {
        yield put(actions.updateUserTimeZoneOffset(tzOffset));
      }
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
  } catch {
    yield put(actions.getUserDetailsFailure());
  }
}

function* updateUserTZOffset(action) {
  try {
    yield call(UpdateUserTimeZone, action.payload.offset);
  } catch (e) {
    console.log(e);
  }
}

export default function* appLayoutSaga() {
  yield all([
    takeLatest(actions.getUserDetailsRequest.type, getUserDetails),
    takeLatest(actions.updateUserTimeZoneOffset.type, updateUserTZOffset),
  ]);
}
