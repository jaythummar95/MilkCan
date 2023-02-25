import React from 'react';
import {Box} from '../component/Box';
import {Screen} from '../component/Screen';
import {HomeHeader} from '../HomeHeader/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigation';
import {HistoryView} from '../component/History/HistoryView';

export const HistoryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Screen>
      <Box>
        <HomeHeader
          onMenuPress={() => {
            navigation.goBack();
          }}
          isMenu={false}
          label2={'History'}
        />
        <HistoryView />
      </Box>
    </Screen>
  );
};
