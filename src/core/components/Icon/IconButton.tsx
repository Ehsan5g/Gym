import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';

type Prop = IconProps & {
  loading?: boolean;
};

const IconButton = (prop: Prop): JSX.Element => {
  const {size, name, color, loading, ...res} = prop;

  // const {palette} = useTheme();
  return (
    <></>
    // <UnStyledButton {...res}>
    //   {loading ? (
    //     <ActivityIndicator color={palette.card} />
    //   ) : (
    //     <Icon name={name} size={size} color={color} />
    //   )}
    // </UnStyledButton>
  );
};

export default IconButton;
