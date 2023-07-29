import React from 'react';
import Icon from '../Icon';
import {Text, View} from 'react-native';
import {color} from '../../config/color';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'shadow',
}

type Prop = {
  title: string | undefined;
  description: string | undefined;
  type?: ToastType;
};

const Toast = (prop: Prop): JSX.Element => {
  const {title, type, description} = prop;
  return (
    <View
      style={{
        width: '100%',
        padding: 16,
        backgroundColor:
          type == ToastType.ERROR
            ? color.error
            : type == ToastType.SUCCESS
            ? color.success
            : color?.warning,
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Icon
          name={
            type === ToastType.SUCCESS
              ? 'check-circle'
              : type === ToastType.ERROR
              ? 'alert-circle'
              : 'alert'
          }
          size={24}
          color={color.white}
        />
        <View style={{flex: 1, marginLeft: 16}}>
          <Text
            style={{
              fontSize: 14,
              color: color.white,
              fontWeight: 'bold',
            }}>
            {title ?? ''}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: color.white,
            }}>
            {description ?? ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Toast;
