import axios from '../../../core/config/axios';

export type registerParam = {
  username: string;
  password: string;
  confirmPassword: string;
};

export async function category(): Promise<any> {
  return axios.get('gym/category/?is_home=1').then(res => res?.data?.data);
}

export async function categoryProgram(id: number): Promise<any> {
  return axios
    .get(`gym/category-program/?cat_id=${id}`)
    .then(res => res?.data?.data);
}
