/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import theme from './src/style/Theme';
import {ThemeProvider} from '@shopify/restyle';
import {AppNavigation} from './src/navigation/AppNavigation';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppNavigation />
      <FlashMessage />
    </ThemeProvider>
  );
};

export default App;
