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
} from './datatypes';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const Login = (
  tokenID: string,
): Promise<AxiosResponse<LoginResponse>> => {
  console.log('API: making request to login..');
  const url = BASE_URL + '/v1/login';
  const data: LoginRequest = { id_token: tokenID };
  return axios.post(url, data);
};

export const Refresh = (
  refreshToken: string,
): Promise<AxiosResponse<RefreshResponse>> => {
  console.log('API: making request to refresh token..');
  const url = BASE_URL + '/v1/refresh';
  const data: RefreshRequest = { refresh_token: refreshToken };
  return axios.post(url, data);
};

export const GetUserAPI = (): Promise<AxiosResponse<UserResponse>> => {
  console.log('API: making request to get user details..');
  const url = BASE_URL + '/v1/user';
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const ApplyPromoAPI = (code: string): Promise<AxiosResponse> => {
  console.log('API: making request to apply promo..');
  const url = BASE_URL + '/v1/apply-promo';
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { code }, { headers });
};

export const GetTaskOnDateAPI = (
  fromdate: string,
  todate: string,
): Promise<AxiosResponse<ColumnResponse>> => {
  console.log('API: making request get tasks..');
  const url = `${BASE_URL}/v1/tasks?from=${fromdate}&to=${todate}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.get(url, { headers });
};

export const CreateTaskAPI = (
  markdown: string,
  date: string,
  column_id: string,
  is_done: boolean,
): Promise<AxiosResponse<TaskResponse>> => {
  console.log('API: making request creating task..');
  const url = `${BASE_URL}/v1/task`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { markdown, date, column_id, is_done }, { headers });
};

export const UpdateTaskAPI = (
  id: string,
  markdown: string,
  is_done: boolean,
): Promise<AxiosResponse<TaskResponse>> => {
  console.log('API: making request updating task..');
  const url = `${BASE_URL}/v1/task/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, { markdown, is_done }, { headers });
};

export const DeleteTaskAPI = (id: string): Promise<AxiosResponse> => {
  console.log('API: making request deleting task..');
  const url = `${BASE_URL}/v1/task/${id}`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.delete(url, { headers });
};

export const ReposTaskAPI = (data): Promise<AxiosResponse> => {
  console.log('API: making request respos task..');
  const url = `${BASE_URL}/v1/repos`;
  const headers = { Authorization: 'Bearer ' + GetAuthToken() };
  return axios.post(url, data, { headers });
};
