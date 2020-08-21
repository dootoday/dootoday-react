import axios, { AxiosResponse } from 'axios';
import { GetAuthToken } from './auth';
import {
  LoginResponse,
  LoginRequest,
  RefreshResponse,
  RefreshRequest,
  UserResponse,
  ColumnResponse,
  TaskResponse,
  OrderResponse,
  PlanResponse,
  ThemeResponse,
  LastUpdateResponse,
} from './datatypes';
import { mockthemeresps } from './theme';
import { log } from './log';

export const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const Login = (
  tokenID: string,
): Promise<AxiosResponse<LoginResponse>> => {
  log('API: making request to login..');
  const url = BASE_URL + '/v1/login';
  const data: LoginRequest = { id_token: tokenID };
  return axios.post(url, data);
};

export const Refresh = (
  refreshToken: string,
): Promise<AxiosResponse<RefreshResponse>> => {
  log('API: making request to refresh token..');
  const url = BASE_URL + '/v1/refresh';
  const data: RefreshRequest = { refresh_token: refreshToken };
  return axios.post(url, data);
};

export const GetUserAPI = (): Promise<AxiosResponse<UserResponse>> => {
  log('API: making request to get user details..');
  const url = BASE_URL + '/v1/user';
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const GetTasksOnDateAPI = (
  fromdate: string,
  todate: string,
): Promise<AxiosResponse<ColumnResponse>> => {
  log('API: making request get tasks on date..');
  const url = `${BASE_URL}/v1/tasks?from=${fromdate}&to=${todate}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const GetTasksOnColumnAPI = (): Promise<
  AxiosResponse<ColumnResponse>
> => {
  log('API: making request get tasks on column..');
  const url = `${BASE_URL}/v1/columns`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const CreateTaskAPI = (
  markdown: string,
  date: string,
  column_id: string,
  is_done: boolean,
): Promise<AxiosResponse<TaskResponse>> => {
  log('API: making request creating task..');
  const url = `${BASE_URL}/v1/task`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { markdown, date, column_id, is_done }, { headers });
};

export const UpdateTaskAPI = (
  id: string,
  markdown: string,
  is_done: boolean,
  recurring_id: number,
): Promise<AxiosResponse<TaskResponse>> => {
  log('API: making request updating task..');
  const url = `${BASE_URL}/v1/task/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { markdown, is_done, recurring_id }, { headers });
};

export const DeleteTaskAPI = (id: string): Promise<AxiosResponse> => {
  log('API: making request deleting task..');
  const url = `${BASE_URL}/v1/task/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.delete(url, { headers });
};

export const ReposTaskAPI = (data): Promise<AxiosResponse> => {
  log('API: making request respos task..');
  const url = `${BASE_URL}/v1/repos`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, data, { headers });
};

export const UpdateColumnAPI = (
  id: string,
  name: string,
): Promise<AxiosResponse<TaskResponse>> => {
  log('API: making request updating column..');
  const url = `${BASE_URL}/v1/column/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { name }, { headers });
};

export const CreateColumnAPI = (
  name: string,
): Promise<AxiosResponse<TaskResponse>> => {
  log('API: making request for creating new column..');
  const url = `${BASE_URL}/v1/column`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { name }, { headers });
};

export const DeleteColumnAPI = (
  id: string,
): Promise<AxiosResponse<TaskResponse>> => {
  log('API: making request deleting column..');
  const url = `${BASE_URL}/v1/column/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.delete(url, { headers });
};

export const PlansAPI = (
  code: string = '',
): Promise<AxiosResponse<PlanResponse[]>> => {
  log('API: making request to get plans..');
  const url = `${BASE_URL}/v1/plans?code=${code}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const SubscribeAPI = (
  planId: string,
): Promise<AxiosResponse<OrderResponse>> => {
  log('API: making request to subscribe..');
  const url = `${BASE_URL}/v1/subscribe/${planId}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, {}, { headers });
};

export const GetThemesAPI = (): Promise<AxiosResponse<ThemeResponse[]>> => {
  return Promise.resolve({
    status: 200,
    data: [...mockthemeresps],
  } as AxiosResponse);
};

export const GetLastUpdateAPI = (): Promise<
  AxiosResponse<LastUpdateResponse>
> => {
  log('API: making request to get last update..');
  const url = `${BASE_URL}/v1/last_update`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const UpdateUserTimeZone = (offset: number): Promise<AxiosResponse> => {
  log('API: making request to update the user timezone..');
  const url = `${BASE_URL}/v1/user/updatetz`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { time_zone_offset: offset }, { headers });
};
