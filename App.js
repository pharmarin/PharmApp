import React from 'react';
import { Text, Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import Store from './store/configureStore';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Provider store={Store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
