import { call, put, all, takeLatest } from 'redux-saga/effects';
import { PlansAPI, SubscribeAPI } from 'utils/api';
import { actions } from './slice';
import http from 'utils/httpcodes';

export function* getPlans(action) {
  const { data, status } = yield call(PlansAPI, action.payload.promo_code);
  if (status === http.StatusOK) {
    yield put(actions.getPlansSuccess(data));
  }
}

export function* getOrder(action) {
  const { data, status } = yield call(SubscribeAPI, action.payload.plan_id);
  if (status === http.StatusOK) {
    yield put(actions.getOrderSuccess(action.payload.plan_id, data));
  }
}

export function* subscribePageSaga() {
  yield all([takeLatest(actions.getPlansRequest.type, getPlans)]);
  yield all([takeLatest(actions.getOrderRequest.type, getOrder)]);
}
