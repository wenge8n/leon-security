/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {enableScreens} from 'react-native-screens';

import RootNavigation from './navigation';

enableScreens();

const App = () => {
  return (
    <>
      <RootNavigation />
    </>
  );
};

export default App;
