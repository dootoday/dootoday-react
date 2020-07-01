import axios, { AxiosResponse } from 'axios';
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
  return Promise.resolve({
    status: 200,
    data: {
      first_name: 'Sudipta',
      last_name: 'Sen',
      avatar:
        'https://lh3.googleusercontent.com/ogw/ADGmqu_Kyb2t-HtuUkC-nlleRQFJ0RiCW6Ce1omDcvDv=s32-c-mo',
      email: 'sanborn.sen@gmail.com',
    },
  } as AxiosResponse);
};
