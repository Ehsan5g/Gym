import AsyncStorage from '@react-native-async-storage/async-storage';
import {emailKey, fcmToken, tokenKey} from '../constants/localStorsge';

export const getToken = (): Promise<string | null> => {
  return AsyncStorage.getItem(tokenKey);
};

export const getEmail = (): Promise<string | null> => {
  return AsyncStorage.getItem(emailKey);
};

export const getFcmToken = (): Promise<string | null> => {
  return AsyncStorage.getItem(fcmToken);
};
