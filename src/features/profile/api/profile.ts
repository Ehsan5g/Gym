import axios from '../../../core/config/axios';

export type UpdateProfileParam = {
  birthdate?: string;
  weight?: number;
  height?: number;
};

export async function updateProfile(body: UpdateProfileParam): Promise<any> {
  return axios
    .post('/user/profile/', {
      birthdate: body.birthdate,
      weight: body.weight,
      height: body.height,
    })
    .then(res => res?.data?.data);
}
