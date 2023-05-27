import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {color} from '../../../core/config/color';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthNavigationParam} from '../../../app/navigation/AppNavigation';
import {AppRouts} from '../../../app/navigation/routes';

const SplashScreen = () => {
  const {navigate} =
    useNavigation<
      NavigationProp<AuthNavigationParam, AppRouts.SPLASH_SCREEN>
    >();

  useEffect(() => {
    setTimeout(() => {
      navigate(AppRouts.AUTH);
    }, 2000);
  }, []);
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
