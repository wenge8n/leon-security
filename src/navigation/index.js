import * as React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationRef} from './NavigationService';
import Login from '../screens/Login';
import Home from '../screens/Home';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="dark-content" />

        <Stack.Navigator>
          <Stack.Screen
            name="BookingHistoryScreen"
            component={BookingHistoryScreen}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
