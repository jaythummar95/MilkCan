import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screen/SplashScreen';
import {DashboardScreen} from '../screen/DashboardScreen';
import {StartEndDateFilterScreen} from '../screen/StartEndDateFilterScreen';

export type StackParamList = {
  SplashScreen: undefined;
  DashboardScreen: undefined;
  StartEndDateFilterScreen: undefined;
};
const Stack = createStackNavigator<StackParamList>();

export enum Route {
  Splash = 'SplashScreen',
  Dashboard = 'DashboardScreen',
  StartEndDateFilter = 'StartEndDateFilterScreen',
}

export const AppNavigation: React.FC = observer(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Route.Splash}>
        <Stack.Screen name={Route.Splash} component={SplashScreen} />
        <Stack.Screen name={Route.Dashboard} component={DashboardScreen} />
        <Stack.Screen
          name={Route.StartEndDateFilter}
          component={StartEndDateFilterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
