import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Image} from '../component/Image';
import {Pressable} from '../component/Pressable';
import {Images} from '../assets';
import {fonts} from '../style/Fonts';
import {ImageSourcePropType} from 'react-native';
import {Text} from '../component/Text';

export interface HomeHeaderProps {
  onFilterPress?: () => void;
  onHolidayPress?: () => void;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onBackPress?: () => void;
  isMenu?: boolean;
  displayOnlyImage?: boolean;
  displayOnlyImageSource?: ImageSourcePropType;
  rightFilterNode?: React.ReactNode;
  label?: string;
  label2?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = observer(
  ({
    onHolidayPress,
    onFilterPress,
    isMenu,
    label2,
    onMenuPress,
  }: HomeHeaderProps) => {
    return (
      <Box
        backgroundColor={'primary'}
        elevation={4}
        shadowColor={'gray'}
        justifyContent={'center'}
        width={DeviceHelper.width()}
        height={DeviceHelper.calculateHeightRatio(70)}>
        <Box marginHorizontal={'s'} flexDirection={'row'} flex={1}>
          {isMenu ? (
            <Box flex={0.5} justifyContent={'center'} marginTop={'sr'}>
              <Pressable
                onPress={onMenuPress}
                height={DeviceHelper.calculateHeightRatio(40)}
                width={DeviceHelper.calculateWidthRatio(40)}>
                <Image
                  source={Images.menu}
                  resizeMode={'center'}
                  height={DeviceHelper.calculateHeightRatio(30)}
                  width={DeviceHelper.calculateWidthRatio(30)}
                />
              </Pressable>
            </Box>
          ) : (
            <Box flex={0.5} justifyContent={'center'} marginTop={'sr'}>
              <Pressable
                onPress={onMenuPress}
                height={DeviceHelper.calculateHeightRatio(40)}
                width={DeviceHelper.calculateWidthRatio(40)}>
                <Image
                  source={Images.leftArrow}
                  resizeMode={'center'}
                  height={DeviceHelper.calculateHeightRatio(25)}
                  width={DeviceHelper.calculateWidthRatio(30)}
                />
              </Pressable>
            </Box>
          )}
          <Box justifyContent={'center'}>
            <Text
              fontSize={18}
              textAlign={'center'}
              fontFamily={fonts.regular}
              color={'bgColor'}>
              {label2}
            </Text>
          </Box>

          {onFilterPress && (
            <Box flex={0.5} justifyContent={'center'} alignItems={'flex-end'}>
              <Pressable onPress={onFilterPress}>
                <Image
                  source={Images.filter}
                  resizeMode={'center'}
                  height={DeviceHelper.calculateHeightRatio(30)}
                  width={DeviceHelper.calculateWidthRatio(30)}
                />
              </Pressable>
            </Box>
          )}
        </Box>
      </Box>
    );
  },
);
