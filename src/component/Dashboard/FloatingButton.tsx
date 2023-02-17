import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Pressable} from '../Pressable';
import {FloatingButtonModel} from '../Model/FloatingButtonModel';
import {Images} from '../../assets';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Image} from '../Image';

export interface FloatingButtonProps {
  literValue: string;
  fatValue: string;
  prizeValue: string;
  dateValue: string;
  onChangeDate: (text: any) => void;
  onChangePrize: (text: string) => void;
  onChangeLiter: (text: string) => void;
  onChangeFat: (text: string) => void;
  onConfirm: (date: Date) => void;
  onAddPress: () => void;
}
export const FloatingButton: React.FC<FloatingButtonProps> = observer(
  ({
    onChangePrize,
    onChangeFat,
    onChangeLiter,
    literValue,
    fatValue,
    prizeValue,
    dateValue,
    onChangeDate,
    onAddPress,
    onConfirm,
  }: FloatingButtonProps) => {
    const [visible, setModelVisible] = useState(false);
    return (
      <Box flex={1}>
        <Pressable
          onPress={() => {
            setModelVisible(true);
          }}
          position={'absolute'}
          right={20}
          bottom={20}
          elevation={4}
          borderRadius={30}
          justifyContent={'center'}
          alignItems={'center'}
          backgroundColor={'primary'}
          height={60}
          width={60}>
          <Image
            source={Images.plus}
            resizeMode={'center'}
            height={DeviceHelper.calculateHeightRatio(30)}
            width={DeviceHelper.calculateWidthRatio(30)}
          />
        </Pressable>
        <FloatingButtonModel
          visible={visible}
          fatValue={fatValue}
          prizeValue={prizeValue}
          literValue={literValue}
          dateValue={dateValue}
          onChangeLiter={onChangeLiter}
          onChangeFat={onChangeFat}
          onChangePrize={onChangePrize}
          onConfirm={onConfirm}
          onClose={() => {
            setModelVisible(false);
          }}
          onChangeDate={onChangeDate}
          onAddPress={onAddPress}
        />
      </Box>
    );
  },
);
