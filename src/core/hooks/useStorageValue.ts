import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStorageValue<T> = [value: T | null, loading: boolean];

export default function useStorageValue<V>(key: string): UseStorageValue<V> {
  const [value, setValue] = useState<V | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(item => {
        if (item) {
          setValue(JSON.parse(item));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return [value, loading];
}
