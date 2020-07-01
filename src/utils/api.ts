import axios, { AxiosResponse } from 'axios';
import { GetAuthToken } from './auth';
import {
  LoginResponse,
  LoginRequest,
  RefreshResponse,
  RefreshRequest,
  UserResponse,
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
