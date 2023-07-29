import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateStorage<V> = [value: V, setState: (newValue: V) => Promise<void>];

export default function useStateStorage<T>(
  key: string,
  defaultValue: T,
): UseStateStorage<T> {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(state => {
      try {
        if (state != null) {
          setValue(JSON.parse(state));
        }
      } catch {
        AsyncStorage.removeItem(key).then(() => {});
      }
    });
  }, []);

  const setState = useCallback(
    async (newValue: T) => {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    },
    [key],
  );

  return [value, setState];
}
