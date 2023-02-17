import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Modal, ScrollView} from 'react-native';
import {Pressable} from '../Pressable';
import {Box} from '../Box';
import {Image} from '../Image';
import {Images} from '../../assets';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {EditText} from '../EditText/EditText';
import {Button} from '../Button';
import {DatePickerView} from '../DatePicker/DatePickerView';
import {open} from 'realm';

export interface FloatingButtonModelProps {
  visible: boolean;
  onClose: () => void;
  onAddPress: () => void;
  literValue: string;
  fatValue: string;
  prizeValue: string;
  dateValue: string;
  onChangeDate: (text: any) => void;
  onChangePrize: (text: string) => void;
  onChangeLiter: (text: string) => void;
  onChangeFat: (text: string) => void;
  onConfirm: (date: Date) => void;
}
export const FloatingButtonModel: React.FC<FloatingButtonModelProps> = observer(
  ({
    visible,
    onClose,
    onChangePrize,
    onChangeFat,
    onChangeLiter,
    literValue,
    fatValue,
    prizeValue,
    onAddPress,
    dateValue,
    onConfirm,
  }: FloatingButtonModelProps) => {
    const [open, setOpen] = useState(false);

    return (
      <Modal animationType={'fade'} visible={visible} transparent={true}>
        <Box flex={1} backgroundColor={'transparent'}>
          <Pressable
            flex={0.1} // add Trash then flex 0.4
            onPress={onClose}
          />

          <Box
            flex={0.8}
            elevation={10}
            backgroundColor={'bgColor'}
            borderRadius={20}
            marginHorizontal={'sr'}>
            <Box
              justifyContent={'center'}
              flexDirection={'row'}
              marginTop={'sr'}>
              <Box flex={1} />
              <Pressable
                onPress={onClose}
                height={DeviceHelper.calculateHeightRatio(50)}
                width={DeviceHelper.calculateWidthRatio(50)}>
                <Image
                  source={Images.close}
                  resizeMode={'center'}
                  height={DeviceHelper.calculateHeightRatio(30)}
                  width={DeviceHelper.calculateWidthRatio(50)}
                />
              </Pressable>
            </Box>
            <ScrollView>
              <DatePickerView
                isTextLabel={true}
                onConfirm={onConfirm}
                textLabel={'Date'}
                dateValue={dateValue}
                placeholder={'date'}
                open={open}
                onPressCalander={() => {
                  setOpen(true);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <EditText
                textLabel={'Liter'}
                value={literValue}
                placeholder={'Liter'}
                onChangeValue={onChangeLiter}
              />
              <EditText
                textLabel={'Fat'}
                value={fatValue}
                placeholder={'Fat'}
                onChangeValue={onChangeFat}
              />
              <EditText
                textLabel={'Prize'}
                value={prizeValue}
                placeholder={'Prize'}
                onChangeValue={onChangePrize}
              />
            </ScrollView>
            <Box marginVertical={'sr'} marginHorizontal={'r'}>
              <Button label={'Add'} onPress={onAddPress} />
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  },
);
