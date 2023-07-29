import React, {useCallback, useEffect, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {color} from '../../../../core/config/color';
import Icon from '../../../../core/components/Icon';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {HomeNavigationParam} from '../../navigation/HomeNavigation';
import {categoryProgram} from '../../api/home';
import {HomeRouts} from '../../navigation/routes';

type Exercise = {
  exercise_duration: 2;
  id: number;
  image: string;
  name: string;
  number_of_sets: number;
};
type Data = {
  end_date: string;
  exercise: Exercise[];
  id: number;
  name: string;
  start_date: string;
  user: null;
};

const WorkoutScreen = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Data | undefined>(undefined);

  const {goBack} = useNavigation<NavigationProp<HomeNavigationParam>>();
  const {params} =
    useRoute<RouteProp<HomeNavigationParam, HomeRouts.WORKOUT>>();

  const fetchResult = async (id: number) => {
    setLoading(true);
    try {
      const data = await categoryProgram(id);
      setResult(data?.[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchResult(params.id);
    })();
  }, []);

  const renderItem = useCallback(({item}: {item: Exercise}) => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.imageItem}
          source={{uri: 'http://fitness-app.ir' + item?.image}}
        />
        <View>
          <Text style={styles.itemTitle}>{item?.name}</Text>
          <Text style={styles.description}>
            number of set : {item?.number_of_sets}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require('../../../../app/assets/img/header.png')}
        />
        <Pressable
          onPress={() => {
            goBack();
          }}
          style={styles.back}>
          <Icon name={'chevron-left'} color={'#000'} size={50} />
        </Pressable>
      </View>
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator color={color.secondary} />
        ) : (
          <>
            <FlatList
              data={result?.exercise}
              renderItem={renderItem}
              keyExtractor={item => item?.id.toString()}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles.title}>Exercises {result?.name}</Text>
                </>
              )}
            />
          </>
        )}
      </View>
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
    color: color.secondary,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '700',
    color: color.text,
    marginBottom: 16,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: color.card,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text,
  },
  description: {
    fontSize: 14,
    fontWeight: '700',
    color: color.textSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  body: {
    flex: 1,
    backgroundColor: color.primary,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -30,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageItem: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },

  header: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: color.text,
    alignItems: 'center',
    justifyContent: 'center',
    left: 16,
    top: 16,
    borderRadius: 5,
    position: 'absolute',
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

export default WorkoutScreen;
