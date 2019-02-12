import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import Colors from '../constants/Colors';
import HtmlText, { RenderHTML } from '../components/HtmlText';

export default class PhytoHeader extends React.Component {

  render () {
    return (
      <View style={styles.row}>
        {
          this.props.thumbnail ? <Avatar component={FastImage} source={{ uri: this.props.thumbnail }} containerStyle={styles.avatar} rounded /> : null
        }
        <View>
          <HtmlText style={styles.title}>{ this.props.title }</HtmlText>
          <HtmlText style={styles.subtitle}>{ this.props.subtitle }</HtmlText>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.contrastColor
  },
  subtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: Colors.contrastColor
  }
});
