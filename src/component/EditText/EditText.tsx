import React from 'react';
import {observer} from 'mobx-react';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Input} from '../Input';

export interface EditTextProps {
  textLabel: string;
  value: string;
  placeholder: string;
  onChangeValue: (text: string) => void;
  isTextArea?: boolean;
  disabled?: boolean;
}

export const EditText: React.FC<EditTextProps> = observer(
  ({
    textLabel,
    value,
    onChangeValue,
    placeholder,
    isTextArea,
    disabled,
  }: EditTextProps) => {
    return (
      <Box opacity={disabled ? 0.5 : 1}>
        <Text
          marginHorizontal={'r'}
          marginVertical={'r'}
          marginTop={'r'}
          fontFamily={fonts.regular}
          color={'black'}
          fontSize={17}>
          {textLabel}
        </Text>
        {!isTextArea ? (
          <Box marginHorizontal={'r'}>
            <Input
              isBottomMargin={false}
              placeholder={placeholder}
              keyboardType={'number-pad'}
              value={value}
              isIcon={true}
              leftComponent={true}
              autoCapitalize={'none'}
              onChangeText={onChangeValue}
            />
          </Box>
        ) : (
          <Box marginHorizontal={'r'}>
            <Input
              editable={!disabled}
              isHeight={true}
              height={100}
              isBottomMargin={true}
              placeholder={placeholder}
              keyboardType={'number-pad'}
              value={value}
              multiline
              isIcon={true}
              leftComponent={true}
              autoCapitalize={'none'}
              onChangeText={onChangeValue}
            />
          </Box>
        )}
      </Box>
    );
  },
);
