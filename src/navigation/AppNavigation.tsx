import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screen/SplashScreen';
import {DashboardScreen} from '../screen/DashboardScreen';
import {StartEndDateFilterScreen} from '../screen/StartEndDateFilterScreen';
import {HistoryScreen} from '../screen/HistoryScreen';
import {ContactUsScreen} from '../screen/ContactUsScreen';
import { SecurityVerificationScreen } from "../screen/SecurityVerificationScreen";

export type StackParamList = {
  SplashScreen: undefined;
  DashboardScreen: undefined;
  StartEndDateFilterScreen: undefined;
  HistoryScreen: undefined;
  ContactUsScreen: undefined;
  SecurityVerificationScreen: undefined;
};
const Stack = createStackNavigator<StackParamList>();

export enum Route {
  Splash = 'SplashScreen',
  Dashboard = 'DashboardScreen',
  StartEndDateFilter = 'StartEndDateFilterScreen',
  History = 'HistoryScreen',
  ContactUs = 'ContactUsScreen',
  SecurityVerification = 'SecurityVerificationScreen',
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
        <Stack.Screen name={Route.History} component={HistoryScreen} />
        <Stack.Screen name={Route.ContactUs} component={ContactUsScreen} />
        <Stack.Screen name={Route.SecurityVerification} component={SecurityVerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
