import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {MilkEntryList} from '../../model/MilkEntryList';
import moment from 'moment';
import {fonts} from '../../style/Fonts';

export interface DashboardCellProps {
  milkList: MilkEntryList;
  ismilkList: boolean;
  filterList: MilkEntryList;
}
export const DashboardCell: React.FC<DashboardCellProps> = observer(
  ({milkList, ismilkList, filterList}: DashboardCellProps) => {
    const fileds = [
      {name: 'Date'},
      {name: 'Liter'},
      {name: 'Fat'},
      {name: 'Prise'},
      {name: 'Total'},
    ];

    console.log(
      'filterList',
      filterList.map(item => item.dateEntry),
    );
    console.log('ismilklist', ismilkList);

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
            fontSize={14}
            color={'primary'}>
            {text}
          </Text>
        </Box>
      );
    };
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
          {fileds.map((item, index) => {
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
          marginHorizontal={'sr'}>
          {ismilkList
            ? milkList.map((item, index) => {
                return (
                  <Box flexDirection={'row'}>
                    {testView(moment(item.dateEntry).format('YY-MM-DD'))}
                    {testView(item.literEntry)}
                    {testView(item.fatEntry)}
                    {testView(item.prizeEntry)}
                    {testView(item.totalEntry)}
                  </Box>
                );
              })
            : filterList.map((item, index) => {
                return (
                  <Box flexDirection={'row'}>
                    {testView(moment(item.dateEntry).format('YY-MM-DD'))}
                    {testView(item.literEntry)}
                    {testView(item.fatEntry)}
                    {testView(item.prizeEntry)}
                    {testView(item.totalEntry)}
                  </Box>
                );
              })}
        </Box>
      </Box>
    );
  },
);
