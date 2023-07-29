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
import {category} from '../../api/home';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeNavigationParam} from '../../navigation/HomeNavigation';
import {HomeRouts} from '../../navigation/routes';

type Data = {
  id: number;
  image: string;
  is_home: boolean;
  program: number[];
  title: string;
  weekly_days: number;
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Data[] | []>([]);

  const {navigate} = useNavigation<NavigationProp<HomeNavigationParam>>();

  const fetchResult = async () => {
    setLoading(true);
    try {
      const data = await category();
      console.log(data);
      setResult(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchResult();
    })();
  }, []);

  const renderItem = useCallback(({item}: {item: Data}) => {
    return (
      <Pressable
        onPress={() => {
          navigate(HomeRouts.WORKOUT, {id: item?.id});
        }}>
        <View
          style={{
            width: '100%',

            height: 171,
            flex: 1,
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 50,
            position: 'relative',
          }}>
          <Image
            style={styles.image}
            source={{uri: 'http://fitness-app.ir' + item?.image}}
          />
          <View style={{position: 'absolute', left: 16, bottom: 16}}>
            <Text style={styles.itemTitle}>
              {item?.program?.[0] + ` Workouts for ` + item?.title}
            </Text>
            <Text style={styles.description}>{item?.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={color.secondary} />
      ) : (
        <FlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
          ListHeaderComponent={() => (
            <>
              <Text
                style={
                  styles.title
                }>{`Discover How \n To Shape The \n Body`}</Text>
              <Text style={styles.subTitle}>Workout Categories</Text>
            </>
          )}
        />
      )}
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
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '700',
    color: color.text,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: color.text,
    borderLeftColor: color.error,
    borderLeftWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 13,
    borderRadius: 100,
    backgroundColor: '#E0FE10',
    paddingHorizontal: 17,
    fontWeight: '700',
    color: color.shadow,
    alignSelf: 'flex-start',
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
    width: '100%',
    height: '100%',
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

export default Home;
