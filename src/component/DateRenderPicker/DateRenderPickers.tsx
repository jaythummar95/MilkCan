import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {DatePickerView} from '../DatePicker/DatePickerView';
import {Button} from '../Button';

export interface DateRenderPickerProps {
  onFilter: () => void;
  onClear: () => void;
  startDate: string;
  endDate: string;
  onStartConfirm: (date: Date) => void;
  onEndConfirm: (date: Date) => void;
  openStart: boolean;
  openEnd: boolean;
  onPressCalanderStart: () => void;
  onPressCalanderEnd: () => void;
  onCancelEnd: () => void;
  onCancelStart: () => void;
}
export const DateRenderPickers: React.FC<DateRenderPickerProps> = observer(
  ({
    onFilter,
    startDate,
    endDate,
    onStartConfirm,
    onEndConfirm,
    openStart,
    openEnd,
    onPressCalanderStart,
    onPressCalanderEnd,
    onCancelStart,
    onCancelEnd,
    onClear,
  }: DateRenderPickerProps) => {
    return (
      <Box
        borderRadius={5}
        paddingVertical={'s'}
        backgroundColor={'primary'}
        justifyContent={'center'}
        marginHorizontal={'s'}
        marginVertical={'s'}>
        <Box marginTop={'s'}>
          <Box>
            <DatePickerView
              open={openStart}
              onPressCalander={onPressCalanderStart}
              isTextLabel={false}
              placeholder={'From Date'}
              onConfirm={onStartConfirm}
              dateValue={startDate}
              colors={true}
              onCancel={onCancelStart}
            />
          </Box>
          <Box marginTop={'s'}>
            <DatePickerView
              open={openEnd}
              onPressCalander={onPressCalanderEnd}
              placeholder={'To Date'}
              onConfirm={onEndConfirm}
              dateValue={endDate}
              colors={true}
              onCancel={onCancelEnd}
            />
          </Box>
        </Box>
        <Box
          marginHorizontal={'s'}
          marginVertical={'s'}
          justifyContent={'center'}
          flexDirection={'row'}>
          <Box flex={0.5} marginHorizontal={'s'}>
            <Button label={'Clear'} onPress={onClear} isLight={true} />
          </Box>
          <Box flex={0.5} marginHorizontal={'s'}>
            <Button label={'Filter'} onPress={onFilter} isLight={true} />
          </Box>
        </Box>
      </Box>
    );
  },
);
