import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as Progress from 'react-native-progress';

const labels = {
  pharmacie: "Chargement des articles en cours...",
  aromatherapie: "Chargement des huiles essentielles en cours...",
  phytotherapie: "Chargement des plantes en cours..."
}

export default class LoadingIndicator extends React.Component {
  render () {
    const isLoading = this.props.isLoading || { loading: true }
    return (
      <View style={styles.loading_container}>
        {
          Object.keys(this.props.isLoading).map((key, index) => {
            console.log(key, this.props.isLoading[key])
            if (this.props.isLoading[key]) {
              return (
                <View key={key} style={styles.loadingRow}>
                  <ActivityIndicator size="small" color="grey" />
                  <Text style={styles.loadingText}>{labels[key]}</Text>
                </View>
              )
            }
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading_container: {
    backgroundColor: 'gold',
    padding: 10
  },
  loadingRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  loadingText: {
    marginLeft: 10,
  },
  progress_bar: {
    marginTop: 10,
  }
});
