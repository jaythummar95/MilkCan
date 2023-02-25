import React, {useEffect, useState} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';
import {HistoryList} from '../../model/HistoryList';
import {userFactory} from '../../factory/UserFactory';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {fonts} from '../../style/Fonts';
import moment from 'moment/moment';
import {History} from '../../model/History';

export const HistoryView = () => {
  const fileds = [
    {name: 'Date'},
    {name: 'From Date'},
    {name: 'To Date'},
    {name: 'Total'},
  ];

  const [historyList, setHistoryList] = useState(new HistoryList());

  const getHistoryFromDB = () => {
    userFactory.history().then(res => {
      setHistoryList(res.getValue());
    });
  };

  const testView = (text: any) => {
    return (
      <Box
        justifyContent={'center'}
        alignItems={'center'}
        flex={0.5}
        marginRight={'s'}>
        <Text
          marginVertical={'sr'}
          fontFamily={fonts.bold}
          fontSize={12}
          color={'primary'}>
          {text}
        </Text>
      </Box>
    );
  };

  const renderMilkEntryItem = (item: History) => {
    return (
      <Box flexDirection={'row'} paddingHorizontal={'s'}>
        {testView(moment(item.date).format('DD/MM/YY'))}
        {testView(moment(item.startDate).format('DD/MM/YY'))}
        {testView(moment(item.endDate).format('DD/MM/YY'))}
        {testView(item.total)}
      </Box>
    );
  };

  const renderHistoryList = () => {
    return (
      <Box flex={1}>
        {historyList.size > 0 ? (
          historyList.map(item => {
            return renderMilkEntryItem(item);
          })
        ) : (
          <Text
            marginTop={'ll'}
            fontFamily={fonts.regular}
            fontSize={16}
            color={'primary'}
            textAlign={'center'}>
            No history found.
          </Text>
        )}
      </Box>
    );
  };

  useEffect(() => {
    getHistoryFromDB();
  }, []);

  return (
    <Box>
      <Box
        flexDirection={'row'}
        borderRadius={5}
        borderWidth={10}
        borderColor={'primary'}
        backgroundColor={'primary'}
        marginHorizontal={'sr'}
        marginTop={'sr'}
        height={DeviceHelper.calculateHeightRatio(50)}>
        {fileds.map(item => {
          return (
            <Box
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              flex={0.5}
              marginRight={'s'}>
              <Text fontFamily={fonts.bold} fontSize={16} color={'bgColor'}>
                {item.name}
              </Text>
            </Box>
          );
        })}
      </Box>
      <Box
        borderBottomRightRadius={5}
        borderBottomLeftRadius={5}
        borderWidth={2}
        borderColor={'white'}
        backgroundColor={'white'}
        minHeight={DeviceHelper.height() / 1.5}
        marginHorizontal={'sr'}>
        {renderHistoryList()}
      </Box>
    </Box>
  );
};
