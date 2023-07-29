import axios from '../../../core/config/axios';

export type LoginParam = {
  username: string;
  password: string;
};

export type registerParam = {
  username: string;
  password: string;
  confirmPassword: string;
};

export async function login(body: LoginParam): Promise<any> {
  return axios
    .post('user/login/', {
      username: body.username,
      password: body.password,
    })
    .then(res => res?.data?.data);
}

export async function register(body: registerParam): Promise<any> {
  return axios
    .post(`user/register/`, {
      username: body?.username,
      password: body?.password,
      confirm_password: body?.confirmPassword,
    })
    .then(res => res?.data?.data);
}
