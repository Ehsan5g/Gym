import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {color} from '../../../core/config/color';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {AppNavigationParam} from '../../../app/navigation/AppNavigation';
import {AppRouts} from '../../../app/navigation/routes';
import useStorageValue from '../../../core/hooks/useStorageValue';
import {tokenKey} from '../../../core/constants/localStorsge';

const SplashScreen = () => {
  const {navigate, dispatch} =
    useNavigation<NavigationProp<AppNavigationParam, AppRouts.SPLASH_SCREEN>>();

  const [token, loading] = useStorageValue(tokenKey);

  useEffect(() => {
    if (loading == false) {
      if (token != null) {
        setTimeout(() => {
          dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: AppRouts.TAB_NAVIGATOR}],
            }),
          );
        }, 2000);
      } else {
        setTimeout(() => {
          dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: AppRouts.AUTH}],
            }),
          );
        }, 2000);
      }
    }
  }, [token, loading]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../app/assets/img/logo.png')}
        resizeMode={'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
