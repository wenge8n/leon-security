import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

function goBack() {
  navigationRef.current.goBack();
}

function navigateInRoute(routeName, name, params) {
  navigationRef.current.navigate(routeName, {screen: name, params});
}

function resetRoute(routeName, params) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

export default {
  navigate,
  goBack,
  navigateInRoute,
  resetRoute,
};
