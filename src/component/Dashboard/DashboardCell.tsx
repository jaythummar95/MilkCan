import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {MilkEntryList} from '../../model/MilkEntryList';
import moment from 'moment';
import {fonts} from '../../style/Fonts';
import {Milk} from '../../model/Milk';

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

    const renderMilkEntryItem = (item: Milk) => {
      return (
        <Box flexDirection={'row'} paddingHorizontal={'s'}>
          {testView(moment(item.dateEntry).format('DD/MM/YY'))}
          {testView(item.literEntry)}
          {testView(item.fatEntry)}
          {testView(item.prizeEntry)}
          {testView(item.totalEntry)}
        </Box>
      );
    };

    const renderAllMilkEntryList = () => {
      return (
        <Box flex={1}>
          {milkList.size > 0 ? (
            milkList.map(item => {
              return renderMilkEntryItem(item);
            })
          ) : (
            <Text
              marginTop={'ll'}
              fontFamily={fonts.regular}
              fontSize={16}
              color={'primary'}
              textAlign={'center'}>
              {'No entry found\nTap + icon to add new entry'}
            </Text>
          )}
        </Box>
      );
    };

    const renderFilterdMilkEntryList = () => {
      return (
        <Box flex={1}>
          {filterList.size > 0 ? (
            filterList.map(item => {
              return renderMilkEntryItem(item);
            })
          ) : (
            <Text
              marginTop={'ll'}
              fontFamily={fonts.regular}
              fontSize={16}
              color={'primary'}
              textAlign={'center'}>
              No entry found for this filter
            </Text>
          )}
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
          minHeight={DeviceHelper.height() / 1.5}
          marginHorizontal={'sr'}>
          {ismilkList ? renderAllMilkEntryList() : renderFilterdMilkEntryList()}
        </Box>
      </Box>
    );
  },
);
