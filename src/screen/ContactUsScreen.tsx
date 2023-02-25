import React from 'react';
import {Screen} from '../component/Screen';
import {Box} from '../component/Box';
import {HomeHeader} from '../HomeHeader/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../navigation/AppNavigation';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Images} from '../assets';
import {Image} from '../component/Image';
import {Pressable} from '../component/Pressable';
import {Linking} from 'react-native';

export const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <Screen>
      <Box flex={1}>
        <HomeHeader
          label2={'Contact Us'}
          onMenuPress={() => {
            navigation.goBack();
          }}
        />
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Image
            alignSelf={'center'}
            height={DeviceHelper.calculateHeightRatio(250)}
            width={DeviceHelper.calculateWidthRatio(250)}
            source={Images.logo_final}
          />
          <Box top={-16} justifyContent={'center'} alignItems={'center'}>
            <Text fontFamily={fonts.regular} fontSize={24} color={'primary'}>
              Jay Thummar
            </Text>
            <Box flexDirection={'row'} marginTop={'r'}>
              <Pressable
                width={50}
                height={50}
                marginEnd={'es'}
                onPress={() => {
                  Linking.openURL(`tel:${8511291444}`);
                }}>
                <Image source={Images.PhoneCall} width={50} height={50} />
              </Pressable>
              <Pressable
                width={50}
                height={50}
                marginStart={'es'}
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=hello&phone=+918511291444',
                  );
                }}>
                <Image source={Images.WhatsApp} width={50} height={50} />
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>
    </Screen>
  );
};
