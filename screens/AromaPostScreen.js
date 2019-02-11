import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import PhytoHeader from '../components/PhytoHeader';
import PlanteDetail from '../components/PlanteDetail';


export default class AromaPostScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      headerTitle: <PhytoHeader
        title={navigation.state.params.post.title.rendered}
        subtitle={navigation.state.params.post.blocks["lazyblock/identite"].attrs.nom_latin}
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
