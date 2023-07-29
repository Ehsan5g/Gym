import axios, {InternalAxiosRequestConfig} from 'axios';
import {getToken} from '../helpers/localStorage';

const axiosClient = axios.create({
  timeout: 10000,
  baseURL: 'http://fitness-app.ir/',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

axiosClient.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token !== null && request?.headers) {
      request.headers.Authorization = `${JSON.parse(token)}`;
    }
    console.log(request);
    return request;
  },
);

export default axiosClient;
