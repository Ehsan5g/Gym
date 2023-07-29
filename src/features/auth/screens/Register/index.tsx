import React, {useState} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {color} from '../../../../core/config/color';
import Icon from '../../../../core/components/Icon';
import Button from '../../../../core/components/Button';
import {register} from '../../api/auth';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {AppRouts} from '../../../../app/navigation/routes';
import {useUser} from '../../../../core/provider/UserProvider';
import {AppNavigationParam} from '../../../../app/navigation/AppNavigation';

type Props = {};
const Register = () => {
  const {setUser, setToken} = useUser();

  const {dispatch} = useNavigation<NavigationProp<AppNavigationParam>>();

  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined,
  );

  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined,
  );
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setLoading(true);
    try {
      const data = await register({
        username: username as string,
        password: password as string,
        confirmPassword: confirmPassword as string,
      });
      await setUser({
        id: data?.id,
        height: data.height,
        birthdate: data.birthdate,
        username: data?.username,
        weight: data?.weight,
      });
      await setToken(data?.token);
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: AppRouts.TAB_NAVIGATOR}],
        }),
      );
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const validation = () => {
    let isValid = true;
    if (username == undefined || username?.length == 0) {
      setUsernameError('please enter username');
      isValid = false;
    }
    if (password == undefined || password?.length == 0) {
      setPasswordError('please enter password');
      isValid = false;
    }
    if (password != confirmPassword) {
      setConfirmPasswordError('password and confirm password is not matching');
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validation();
    if (!isValid) {
      return false;
    } else {
      await onRegister();
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require('../../../../app/assets/img/logo.png')}
          resizeMode={'center'}
        />
        <Text style={styles.title}>Register</Text>
        <Text
          style={{...styles.text, textAlign: 'center', paddingHorizontal: 35}}>
          Please create a username and password for yourself
        </Text>
      </View>
      <View style={{marginBottom: 16}}>
        <View style={styles.inputContainer}>
          <Icon name={'account'} size={34} />
          <TextInput
            placeholder={'Username'}
            onChangeText={text => {
              setUsernameError(undefined);
              setUsername(text);
            }}
            value={username}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        {usernameError != undefined && (
          <Text style={{...styles.error}}>{usernameError}</Text>
        )}
      </View>

      <View style={{marginBottom: 16}}>
        <View style={styles.inputContainer}>
          <Icon name={'key'} size={34} />
          <TextInput
            placeholder={'Password'}
            onChangeText={text => {
              setPasswordError(undefined);
              setPassword(text);
            }}
            secureTextEntry={true}
            value={password}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        {passwordError != undefined && (
          <Text style={{...styles.error}}>{passwordError}</Text>
        )}
      </View>

      <View style={{marginBottom: 16}}>
        <View style={styles.inputContainer}>
          <Icon name={'key'} size={34} />
          <TextInput
            placeholder={'Confirm password'}
            onChangeText={text => {
              setConfirmPasswordError(undefined);
              setConfirmPassword(text);
            }}
            secureTextEntry={true}
            value={confirmPassword}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        {confirmPasswordError != undefined && (
          <Text style={{...styles.error}}>{confirmPasswordError}</Text>
        )}
      </View>
      <Button
        onPress={async () => {
          await onSubmit();
        }}
        loading={loading}
        backgroundColor={color.primarySecondary}
        color={color.white}
        title={'Register'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: color.text,
  },
  error: {
    fontSize: 16,
    fontWeight: '500',
    color: color.error,
    marginTop: 10,
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
    color: color.white,
  },
});

export default Register;
