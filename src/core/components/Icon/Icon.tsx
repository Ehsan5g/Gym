import React from 'react';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconProps} from 'react-native-vector-icons/Icon';
import {color as pallet} from '../../config/color';

type Prop = IconProps;
const Icon = ({color, ...prop}: Prop): JSX.Element => {
  return <VectorIcon {...prop} color={color ?? pallet.white} />;
};

export default Icon;
