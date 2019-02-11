import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import LoadingIndicator from '../components/LoadingIndicator';
import HtmlText, { RenderHTML } from '../components/HtmlText';
import PharmaListItem from '../components/PharmaListItem';

import { fetchPosts, loadPosts } from '../api/api';
import { connect } from 'react-redux';

class PhytoScreen extends React.Component {

  static navigationOptions = {
    title: "Plantes",
    headerBackTitle: null,
  };

  componentDidMount() {
    loadPosts(this.props.dispatch, "phytotherapie")
  }

  _getPosts () {
    fetchPosts(this.props.dispatch, "phytotherapie")
  }

  _showPostDetail (post) {
    this.props.navigation.navigate(
      "PhytoPost",
      {
        title: RenderHTML(post.title.rendered),
        subtitle: RenderHTML(post.title.rendered),
        post: post
      }
    )
  }

  _getAvatar (post) {
    if (post._embedded.hasOwnProperty("wp:featuredmedia")) {
      return <Avatar
        rounded
        source={{
          uri: post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url
        }}
      />
    } else {
      return <Avatar rounded icon={{ name: 'leaf', type: 'font-awesome' }} />
    }
  }

  _isLoading () {
    console.log(this.props.isLoading, Object.values(this.props.isLoading).includes(true))
    return Object.values(this.props.isLoading).includes(true)
  }

  render () {
    console.log("Loaded PhytoPosts : ", this.props.posts.length);
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
            <PharmaListItem
              post={ post }
              onPress={ () => this._showPostDetail(post) }
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
    posts: state.phytoPosts,
    isLoading: {
      pharmacie: state.pharmaIsLoading,
      aromatherapie: state.aromaIsLoading,
      phytotherapie: state.phytoIsLoading
    }
  }
}

export default connect(mapStateToProps)(PhytoScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emphase: {
    fontStyle: 'italic',
    color: 'grey'
  }
});
