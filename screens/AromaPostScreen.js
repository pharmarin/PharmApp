import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import PhytoHeader from '../components/PhytoHeader';
import PlanteDetail from '../components/PlanteDetail';


export default class AromaPostScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    console.log(navigation)
    const post = navigation.getParam('post')
    const title = post.title.rendered
    const subtitle = post.blocks.hasOwnProperty("lazyblock/identite") ? post.blocks["lazyblock/identite"].attrs.nom_latin : null
    const thumbnail = post._embedded.hasOwnProperty("wp:featuredmedia") ? post._embedded["wp:featuredmedia"][0].media_details.sizes["pharmacie-thumbnail"].source_url : null
    return {
      headerTitle: <PhytoHeader
        title={ title }
        subtitle={ subtitle }
        thumbnail={ thumbnail }
        />,
    };
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <PlanteDetail post={this.props.navigation.state.params.post} />
      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
