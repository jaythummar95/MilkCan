import {Modal} from 'react-native';
import React from 'react';
import {Box} from '../Box';

export class SideMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const {isVisible} = this.state;
    return (
      <Modal visible={isVisible}>
        <Box flex={1} />
      </Modal>
    );
  }
}
