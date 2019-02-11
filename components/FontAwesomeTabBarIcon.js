import React from 'react';
import {
  Icon
} from 'react-native-elements';

import Colors from '../constants/Colors';

export default class FontAwesomeTabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        type="font-awesome"
        name={this.props.name}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        iconStyle={{
          marginBottom: -3,
          fontSize: 22,
        }}
      />
    );
  }
}
