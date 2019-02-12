import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  Avatar,
  ListItem
} from 'react-native-elements';
import { RenderHTML } from '../components/HtmlText';
import FastImage from 'react-native-fast-image';

const padding = 8

export default class PharmaListItem extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = { dimensions: undefined }
  }

  _getTitle (post) {
    return post.title.rendered ? RenderHTML(post.title.rendered) : null
  }

  _getSubtitle (post) {
    if (
      post.hasOwnProperty("blocks")
      && post.blocks.hasOwnProperty("lazyblock/identite")
      && post.blocks["lazyblock/identite"].attrs.hasOwnProperty("nom_latin")
    ) {
      return RenderHTML(post.blocks["lazyblock/identite"].attrs.nom_latin)
    } else {
      return null
    }
  }

  _getAvatar (post) {
    const dimensions = this.state.dimensions ? {height: this.state.dimensions.height - padding, width: this.state.dimensions.height - padding} : null

    switch (post.type) {
      case "aromatherapie":
      if (post._embedded.hasOwnProperty("wp:featuredmedia")) {
        return <FastImage
          source={{
            uri: post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url
          }}
          style={[styles.avatar, dimensions]}
          resizeMode={FastImage.resizeMode.cover}
          />
      } else {
        return <Avatar icon={{ name: 'tint', type: 'font-awesome' }} containerStyle={[styles.avatar, dimensions]} />
      }
      case "phytotherapie":
      if (post._embedded.hasOwnProperty("wp:featuredmedia")) {
        return <FastImage
          source={{
            uri: post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url
          }}
          style={[styles.avatar, dimensions]}
          resizeMode={FastImage.resizeMode.cover}
          />
      } else {
        return <Avatar icon={{ name: 'leaf', type: 'font-awesome' }} containerStyle={[styles.avatar, dimensions]} overlayContainerStyle={[styles.avatar, dimensions]} />
      }
      default:
        return null
    }

  }

  render () {
    const post = this.props.post
    const margins = {}
    if (this.props.isFirst) margins.marginTop = 8
    if (this.props.isLast) margins.marginBottom = 8
    return (
      <ListItem
        component={FastImage}
        leftAvatar={ this._getAvatar(post) }
        title={ this._getTitle(post) }
        titleProps={{
          numberOfLines: 1
        }}
        subtitle={ this._getSubtitle(post) }
        subtitleProps={{
          numberOfLines: 1
        }}
        subtitleStyle={{
          color: "grey",
          fontStyle: "italic"
        }}
        onLayout={this._onLayout}
        containerStyle={[styles.container, margins]}
        bottomDivider
        chevron
        { ...this.props }
        />
    )
  }

  _onLayout = (event) => {
    if (this.state.dimensions) return // layout was already called
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginVertical: 4,
    marginHorizontal: 8,
    paddingVertical: 0,
    paddingLeft: 0,
    minHeight: 60,
    ...Platform.select({
      android: { elevation: 16 },
      ios: {
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 5
      }
    })
  },
  avatar: {
    minHeight: 60,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  }
})
