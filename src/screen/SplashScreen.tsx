import React, {useEffect} from 'react';
import {DeviceHelper} from '../helper/DeviceHelper';
import {observer} from 'mobx-react';
import {Screen} from '../component/Screen';
import {Box} from '../component/Box';
import {Image} from '../component/Image';
import {Images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Route, StackParamList} from '../navigation/AppNavigation';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';

export const SplashScreen: React.FC = observer(() => {
  const {replace} = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    checkAndNavigate();
  }, []);

  const checkAndNavigate = async () => {
    setTimeout(async () => {
      replace(Route.Dashboard);
    }, 2000);
  };

  return (
    <Screen>
      <Box
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={'bgColor'}>
        <Image
          height={DeviceHelper.calculateHeightRatio(250)}
          width={DeviceHelper.calculateWidthRatio(250)}
          source={Images.logo_final}
        />
        <Box top={-16} justifyContent={'center'} alignItems={'center'}>
          <Text fontFamily={fonts.regular} fontSize={24} color={'primary'}>
            MilkCan
          </Text>
          <Text
            letterSpacing={1}
            marginTop={'es'}
            fontFamily={fonts.regular}
            fontSize={12}
            color={'primary'}>
            Milk pricing, made simple.
          </Text>
        </Box>
      </Box>
    </Screen>
  );
});
