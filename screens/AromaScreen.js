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

class AromaScreen extends React.Component {

  static navigationOptions = {
    title: "Huiles essentielles",
    headerBackTitle: null,
  };

  componentDidMount() {
    loadPosts(this.props.dispatch, "aromatherapie")
  }

  _getPosts () {
    fetchPosts(this.props.dispatch, "aromatherapie")
  }

  _showPostDetail (post) {
    this.props.navigation.navigate(
      "AromaPost",
      {
        title: RenderHTML(post.title.rendered),
        subtitle: RenderHTML(post.title.rendered),
        post: post
      }
    )
  }

  _isLoading () {
    console.log(this.props.isLoading, Object.values(this.props.isLoading).includes(true))
    return Object.values(this.props.isLoading).includes(true)
  }

  render () {
    console.log("Loaded AromaPosts : ", this.props.posts.length);
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
    posts: state.aromaPosts,
    isLoading: {
      pharmacie: state.pharmaIsLoading,
      aromatherapie: state.aromaIsLoading,
      phytotherapie: state.phytoIsLoading
    }
  }
}

export default connect(mapStateToProps)(AromaScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emphase: {
    fontStyle: 'italic',
    color: 'grey'
  }
});
