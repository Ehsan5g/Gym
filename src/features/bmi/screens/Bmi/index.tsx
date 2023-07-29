import React, {useEffect, useState} from 'react';

import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {color} from '../../../../core/config/color';
import Button from '../../../../core/components/Button';
import {useUser} from '../../../../core/provider/UserProvider';

type Props = {};
const Bmi = () => {
  const {user} = useUser();

  const [height, setHeight] = useState<number | undefined>(
    user?.height != null ? user?.height : undefined,
  );
  const [weight, setWeight] = useState<number | undefined>(
    user?.weight != null ? user?.weight : undefined,
  );

  const [bmi, setBmi] = useState<number>(0);

  const [weightError, setWeightError] = useState<string | undefined>(undefined);
  const [heightError, setHeightError] = useState<string | undefined>(undefined);

  const validation = () => {
    let isValid = true;
    if (weight == undefined) {
      setWeightError('please enter weight');
      isValid = false;
    }
    if (height == undefined) {
      setHeightError('please enter Weight');
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    (async () => {
      if (
        user?.height != null &&
        user?.weight != null &&
        user?.weight != undefined &&
        user?.height != undefined
      ) {
        setBmi(
          Math.floor(
            user?.weight / ((user?.height / 100) * (user?.height / 100)),
          ),
        );
      }
    })();
  }, [user]);

  const onCalculat = async () => {
    const isValid = validation();
    if (!isValid) {
      return false;
    } else {
      setBmi(
        weight != undefined && height != undefined
          ? Math.floor(weight / ((height / 100) * (height / 100)))
          : 0,
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{marginBottom: 16}}>
        <Text style={{...styles.text}}>Weight (kg)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Weight'}
            onChangeText={text => {
              setWeightError(undefined);
              setWeight(Number(text));
            }}
            value={weight?.toString()}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        {weightError != undefined && (
          <Text style={{...styles.error}}>{weightError}</Text>
        )}
      </View>

      <View style={{marginBottom: 16}}>
        <Text style={{...styles.text}}>Height (cm)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Height'}
            onChangeText={text => {
              setHeightError(undefined);
              setHeight(Number(text));
            }}
            value={height?.toString()}
            placeholderTextColor={color.textSecondary}
            style={styles.input}
          />
        </View>
        {heightError != undefined && (
          <Text style={{...styles.error}}>{heightError}</Text>
        )}
      </View>

      <Button
        onPress={async () => {
          await onCalculat();
        }}
        backgroundColor={color.secondary}
        color={color.shadow}
        title={'Calculat'}
      />
      <View style={styles.footerContainer}>
        <View style={styles.circel}>
          <Text style={{...styles.text, fontSize: 32}}>your BMI is :</Text>
          <Text style={{...styles.text, fontSize: 32, color: color.secondary}}>
            {bmi}
          </Text>
        </View>
      </View>
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
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circel: {
    backgroundColor: color.textSecondary,
    borderRadius: 250,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  error: {
    fontSize: 16,
    fontWeight: '500',
    color: color.error,
    marginTop: 10,
  },
});

export default Bmi;
