import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HtmlText, { RenderHTML } from '../components/HtmlText';

export default class PhytoHeader extends React.Component {

  render () {
    return (
      <View>
        <HtmlText style={styles.title}>{ this.props.title }</HtmlText>
        <HtmlText style={styles.subtitle}>{ this.props.subtitle }</HtmlText>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    fontStyle: 'italic'
  }
});
