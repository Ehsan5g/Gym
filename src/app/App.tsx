import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import AppNavigation from 'app/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {color} from '../core/config/color';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
});

export default App;
