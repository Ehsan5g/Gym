import React, {useState} from 'react';

import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {color} from '../../../../core/config/color';
import Button from '../../../../core/components/Button';
import {useUser} from '../../../../core/provider/UserProvider';
import {updateProfile} from '../../api/profile';
import Toast from 'react-native-toast-message';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {TabNavigationParam} from '../../../TabNavigator/navigation/TabNavigation';
import {AppRouts} from '../../../../app/navigation/routes';

type Props = {};
const Profile = () => {
  const {user, setUser, logout} = useUser();

  const {dispatch} = useNavigation<NavigationProp<TabNavigationParam>>();

  const [birth, setBirth] = useState<string | undefined>(
    user?.birthdate != null ? user?.birthdate : undefined,
  );
  const [weight, setWeight] = useState<number | undefined>(
    user?.weight != null ? user?.weight : undefined,
  );
  const [height, setHeight] = useState<number | undefined>(
    user?.height != null ? user?.height : undefined,
  );

  const [loading, setLoading] = useState(false);

  const onUpdate = async () => {
    setLoading(true);
    try {
      const data = await updateProfile({
        weight: weight,
        height: height,
        birthdate: birth,
      });
      await setUser({
        weight: data?.weight,
        height: data?.height,
        birthdate: data?.birthdate,
        username: user?.username as string,
        id: user?.id as number,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully update profile',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'some thing wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  // const validation = () => {
  //   let isValid = true;
  //   if (birth == undefined || birth?.length == 0) {
  //     setBirthError('please enter Birth');
  //     isValid = false;
  //   }
  //   if (weight == undefined || weight?.length == 0) {
  //     setWeightError('please enter Weight');
  //     isValid = false;
  //   }
  //   if (password != confirmPassword) {
  //     setConfirmPasswordError('password and confirm password is not matching');
  //     isValid = false;
  //   }
  //
  //   return isValid;
  // };

  const onSubmit = async () => {
    // const isValid = validation();
    // if (!isValid) {
    //   return false;
    // } else {
    await onUpdate();
  };
  return (
    <ScrollView style={styles.container}>
      {/*<View style={styles.headerContainer}>*/}
      {/*  <Pressable>*/}
      {/*    <Image*/}
      {/*      style={styles.image}*/}
      {/*      source={require('../../../../app/assets/img/user.png')}*/}
      {/*    />*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
      <View style={{marginBottom: 16}}>
        <Text style={{...styles.text}}>username</Text>
        <View style={{...styles.inputContainer, backgroundColor: color.border}}>
          <TextInput
            placeholder={'Username'}
            editable={false}
            value={user?.username}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
      </View>

      <View style={{marginBottom: 16}}>
        <Text style={{...styles.text}}>Birth</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Birth'}
            onChangeText={text => {
              setBirth(text);
            }}
            keyboardType={'numbers-and-punctuation'}
            value={birth}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
      </View>

      <View style={{marginBottom: 16, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{...styles.text}}>Height </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Height'}
              onChangeText={text => {
                setHeight(Number(text));
              }}
              keyboardType={'decimal-pad'}
              value={height?.toString()}
              placeholderTextColor={color.textSecondary}
              style={styles.input}
            />
          </View>
        </View>
        <View style={{width: 16}} />
        <View style={{flex: 1}}>
          <Text style={{...styles.text}}>Weight</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Weight'}
              onChangeText={text => {
                setWeight(Number(text));
              }}
              keyboardType={'decimal-pad'}
              value={weight?.toString()}
              placeholderTextColor={color.textSecondary}
              style={styles.input}
            />
          </View>
        </View>
      </View>
      <Button
        onPress={async () => {
          await onSubmit();
        }}
        backgroundColor={color.secondary}
        color={color.shadow}
        title={'Upload'}
        loading={loading}
      />
      <Button
        onPress={async () => {
          dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: AppRouts.AUTH}],
            }),
          );
          await logout();
        }}
        title={'Log out'}
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
    width: 150,
    height: 150,
  },
  inputContainer: {
    backgroundColor: color.textSecondary,
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

export default Profile;
