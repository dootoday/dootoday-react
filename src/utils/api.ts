import axios, { AxiosResponse } from 'axios';
import {
  LoginResponse,
  LoginRequest,
  RefreshResponse,
  RefreshRequest,
} from './datatypes';

const BASE_URL = 'http://localhost:9060';

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
