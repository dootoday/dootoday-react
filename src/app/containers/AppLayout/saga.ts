import { takeLatest, put, call, all } from 'redux-saga/effects';
import { actions } from './slice';
import { GetUserAPI } from 'utils/api';

function* getUserDetails() {
  console.log('#####-1');
  const { data, status } = yield call(GetUserAPI);
  if (status === 200) {
    yield put(
      actions.getUserDetailsSuccess({
        firstName: data.first_name,
        lastName: data.lkast_name,
        email: data.email,
        avatar: data.avatar,
      }),
    );
  }
}

export default function* appLayoutSaga() {
  console.log('#####-0.11');
  yield all([takeLatest(actions.getUserDetailsRequest.type, getUserDetails)]);
}
