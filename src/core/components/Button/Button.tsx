import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color, color as pallet} from '../../config/color';
import Icon from '../Icon';

export type ButtonProps = {
  title?: string;
  loading?: boolean;
  backgroundColor?: string;
  size?: number;
  ignoreTranslate?: boolean;
  transparent?: boolean;
  color?: string;
  borderRadius?: number | string;
  iconRight?: string;
  iconLeft?: string;
  opacityBackground?: number;
  onPress: () => void;
};

const Button = (prop: ButtonProps): JSX.Element => {
  const {
    title,
    loading,
    borderRadius,
    color,
    backgroundColor,
    ignoreTranslate,
    size,
    opacityBackground,
    iconLeft,
    transparent,
    iconRight,
    onPress,
    ...rest
  } = prop;

  const StyledButton = Platform.OS == 'ios' ? TouchableOpacity : Pressable;

  return (
    <StyledButton
      onPress={() => {
        onPress();
      }}
      style={{
        ...styles.button,
        backgroundColor: backgroundColor ?? pallet.secondary,
      }}>
      {loading ? (
        <ActivityIndicator
          color={backgroundColor ? pallet.primary : pallet.white}
        />
      ) : (
        <>
          {iconLeft && (
            <Icon name={iconLeft} size={25} color={color ?? pallet.white} />
          )}
          <Text
            style={{...styles.text, color: color ?? pallet.primarySecondary}}>
            {title}
          </Text>
          {iconRight && (
            <Icon name={iconRight} size={25} color={color ?? pallet.white} />
          )}
        </>
      )}
    </StyledButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginVertical: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: color.text,
  },
});
export default Button;
