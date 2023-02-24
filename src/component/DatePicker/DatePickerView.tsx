import React from 'react';
import {observer} from 'mobx-react-lite';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Box} from '../Box';
import {Input} from '../Input';
import {Image} from '../Image';
import {Images} from '../../assets';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Pressable} from '../Pressable';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export interface DatePickerProps {
  disabled?: boolean;
  textLabel?: string;
  dateValue: string;
  onConfirm: (date: Date) => void;
  colors?: boolean;
  placeholder: string;
  isTextLabel?: boolean;
  open: boolean;
  onCancel: () => void;
  onPressCalander: () => void;
}
export const DatePickerView: React.FC<DatePickerProps> = observer(
  ({
    disabled,
    textLabel,
    dateValue,
    onConfirm,
    colors,
    placeholder,
    isTextLabel,
    open,
    onPressCalander,
    onCancel,
  }: DatePickerProps) => {
    return (
      <Pressable opacity={disabled ? 0.5 : 1} onPress={onPressCalander}>
        {isTextLabel && (
          <Text
            marginHorizontal={'r'}
            marginVertical={'r'}
            marginTop={'r'}
            fontFamily={fonts.regular}
            color={colors ? 'bgColor' : 'black'}
            fontSize={17}>
            {textLabel}
          </Text>
        )}
        <Box marginHorizontal={'r'}>
          <Input
            editable={false}
            isBottomMargin={false}
            placeholder={placeholder}
            keyboardType={'default'}
            value={dateValue ? moment(dateValue).format('DD/MM/YYYY') : ''}
            isIcon={true}
            leftComponent={true}
            autoCapitalize={'none'}
          />
          <Box
            position={'absolute'}
            right={0}
            marginHorizontal={'sr'}
            height={DeviceHelper.calculateHeightRatio(55)}
            justifyContent={'center'}>
            <Pressable
              height={DeviceHelper.calculateHeightRatio(30)}
              width={DeviceHelper.calculateWidthRatio(30)}>
              <Image
                source={Images.calander}
                resizeMode={'center'}
                height={DeviceHelper.calculateHeightRatio(30)}
                width={DeviceHelper.calculateWidthRatio(30)}
              />
            </Pressable>
            <DatePicker
              modal
              mode={'date'}
              open={open}
              date={
                dateValue
                  ? moment(dateValue, 'YYYY-MM-DD hh:mm:ss').toDate()
                  : new Date()
              }
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          </Box>
        </Box>
      </Pressable>
    );
  },
);
