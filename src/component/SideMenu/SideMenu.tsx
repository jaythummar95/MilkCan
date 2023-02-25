import {Modal} from 'react-native';
import React from 'react';
import {Box} from '../Box';
import {Pressable} from '../Pressable';
import {Image} from '../Image';
import {Images} from '../../assets';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Route} from '../../navigation/AppNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

export const refSideMenu = React.createRef<SideMenu>();

export const showSideMenu = (): void => {
  if (refSideMenu) {
    refSideMenu?.current?.showModal();
  }
};

export const hideSideMenu = (): void => {
  if (refSideMenu) {
    refSideMenu?.current?.hideModal();
  }
};

export interface SideMenuProps {
  navigation: StackNavigationProp<any, any>;
}

export class SideMenu extends React.Component<SideMenuProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false,
      options: [
        {
          title: 'History',
          onPress: () => {
            this.hideModal();
            this.props.navigation.navigate(Route.History);
          },
        },
        {
          title: 'About Us',
          onPress: () => {
            this.hideModal();
          },
        },
        {
          title: 'Contact Us',
          onPress: () => {
            this.hideModal();
          },
        },
      ],
    };
  }

  showModal(): void {
    this.setState({
      isVisible: true,
    });
  }

  hideModal(): void {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const {isVisible, options} = this.state;
    return (
      <Modal
        animationType={'fade'}
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          this.hideModal();
        }}>
        <Box flex={1} backgroundColor={'transparent'} flexDirection={'row'}>
          <Box
            flex={1.5}
            backgroundColor={'bgColor'}
            borderTopRightRadius={25}
            borderBottomRightRadius={25}>
            <Image
              marginTop={'l'}
              source={Images.logo_final}
              width={120}
              height={120}
              alignSelf={'center'}
            />
            {options.map(option => {
              return (
                <Pressable
                  onPress={option.onPress}
                  height={48}
                  paddingHorizontal={'r'}
                  width={'100%'}
                  justifyContent={'center'}>
                  <Text
                    fontFamily={fonts.regular}
                    color={'primary'}
                    fontSize={14}>
                    {option.title}
                  </Text>
                </Pressable>
              );
            })}
          </Box>
          <Pressable
            flex={1}
            onPress={() => {
              this.hideModal();
            }}
          />
        </Box>
      </Modal>
    );
  }
}
