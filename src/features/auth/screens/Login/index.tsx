import React from 'react';

import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {color} from '../../../../core/config/color';
import Icon from '../../../../core/components/Icon';
import Button from '../../../../core/components/Button';

type Props = {};
const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require('../../../../app/assets/img/logo.png')}
          resizeMode={'center'}
        />
        <Text style={styles.title}>Welcome!</Text>
        <Text
          style={{...styles.text, textAlign: 'center', paddingHorizontal: 35}}>
          Use the following credentials to log in to your account
        </Text>
      </View>
      <View style={{marginBottom: 16}}>
        <View style={styles.inputContainer}>
          <Icon name={'account'} size={34} />
          <TextInput
            placeholder={'Username'}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
      </View>

      <View style={{marginBottom: 16}}>
        <View style={styles.inputContainer}>
          <Icon name={'key'} size={34} />
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        <Text style={{...styles.text}}>Error</Text>
      </View>

      <Button title={'login'} />
      <Text style={{...styles.text, fontSize: 12, textAlign: 'center'}}>
        Don't have an account?
      </Text>
      <Button
        backgroundColor={color.primarySecondary}
        color={color.white}
        title={'Register'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: color.text,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: color.text,
  },
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: color.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Login;
