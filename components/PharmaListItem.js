import React from 'react';
import {
  Avatar,
  ListItem
} from 'react-native-elements';
import { RenderHTML } from '../components/HtmlText';
import FastImage from 'react-native-fast-image';

export default class PharmaListItem extends React.Component {

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
    switch (post.type) {
      case "aromatherapie":
      if (post._embedded.hasOwnProperty("wp:featuredmedia")) {
        return {
          component: {
            FastImage
          },
          source: {
            uri: post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url
          }
        }
      } else {
        return <Avatar rounded icon={{ name: 'tint', type: 'font-awesome' }} />
      }
      case "phytotherapie":
      if (post._embedded.hasOwnProperty("wp:featuredmedia")) {
        return {
          component: {
            FastImage
          },
          source: {
            uri: post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url
          }
        }
      } else {
        return <Avatar rounded icon={{ name: 'leaf', type: 'font-awesome' }} />
      }
      default:
        return null
    }

  }

  render () {
    const post = this.props.post
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
        bottomDivider
        chevron
        { ...this.props }
        />
    )
  }

}
