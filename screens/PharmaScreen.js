import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import LoadingIndicator from '../components/LoadingIndicator';
import { RenderHTML } from '../components/HtmlText';
import Card from '../components/Card';

import { fetchPosts, loadPosts } from '../api/api';


class PharmaScreen extends React.Component {

  static navigationOptions = {
    title: "Pharmacie",
  };

  componentDidMount() {
    loadPosts(this.props.dispatch, "posts")
  }

  _getPosts () {
    fetchPosts(this.props.dispatch, "posts")
  }

  _showPostDetail (post) {
    this.props.navigation.navigate(
      "PharmaPost",
      {
        title: RenderHTML(post.title.rendered),
        post: post
      }
    )
  }

  async openLink(link) {
    try {
      await InAppBrowser.isAvailable()
      const result = await InAppBrowser.open(link + "?_app", {
        /*// iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: 'gray',
        preferredControlTintColor: 'white',
        readerMode: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_right',
          endExit: 'slide_out_left',
        },*/
      });
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  _isLoading () {
    console.log(this.props.isLoading, Object.values(this.props.isLoading).includes(true))
    return Object.values(this.props.isLoading).includes(true)
  }

  render () {
    console.log("Loaded PharmaPosts : ", this.props.posts.length);
    return (
      <View style={styles.container}>
        {
          this._isLoading() ? <LoadingIndicator isLoading={this.props.isLoading} /> : null
        }
        <FlatList
          data={this.props.posts}
          keyExtractor={(post) =>
            post.id.toString()
          }
          renderItem={({ item: post }) =>
            <Card
              title={ RenderHTML(post.title.rendered) }
              thumbnail={ post._embedded.hasOwnProperty("wp:featuredmedia") ? post._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"].source_url : null }
              onPress={ () => this.openLink(post.link) }
              />
          }
          refreshing={false}
          onRefresh={this._getPosts.bind(this)}
          />
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    posts: state.pharmaPosts,
    isLoading: {
      pharmacie: state.pharmaIsLoading,
      aromatherapie: state.aromaIsLoading,
      phytotherapie: state.phytoIsLoading
    }
  }
}

export default connect(mapStateToProps)(PharmaScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
