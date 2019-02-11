import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { iOSColors, iOSUIKit } from 'react-native-typography';
import { RenderHTML } from '../components/HtmlText';
import FastImage from 'react-native-fast-image';

export default class Card extends React.Component {
  _getThumbnail(thumbnail) {
    const width = Dimensions.get('window').width - 32
    return (
      <FastImage
        source={{
          uri: thumbnail,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={{ flex: 1, height: 100, width: width, marginBottom: 10, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      />
    )
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.card, this.props.style]}>
          {
            this.props.thumbnail ? this._getThumbnail(this.props.thumbnail) : null
          }
          {
            this.props.title ? <Text style={[iOSUIKit.title3Emphasized, {margin: 12}]}>{this.props.title}</Text> : null
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    marginHorizontal: 16,
    padding: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: iOSColors.white,
    borderRadius: 6,
    ...Platform.select({
      android: { elevation: 16 },
      ios: {
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 16
        },
        shadowOpacity: 0.2,
        shadowRadius: 16
      }
    })
  }
})
