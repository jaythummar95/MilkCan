import React from 'react';
import {Box} from '../component/Box';
import {Screen} from '../component/Screen';
import {Image} from '../component/Image';
import {Images} from '../assets';
import {Input} from '../component/Input';

export const SecurityVerificationScreen: React.FC = () => {
  return (
    <Screen>
      <Box>
        <Image source={Images.logo_final} />
        <Input />
      </Box>
    </Screen>
  );
};
