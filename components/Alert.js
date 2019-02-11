import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Alert extends Component {
  render() {
    return (
      <View style={[styles.alert, styles[this.props.style]]}>
        <Text style={styles[this.props.style + "Text"]}>
        {
          this.props.children
        }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alert: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 7.5,
    paddingHorizontal: 12.5,
    marginBottom: 5,
    marginTop: 5,
  },
  secondary: {
    backgroundColor: '#e2e3e5',
    borderColor: '#d6d8db'
  },
  secondaryText: {
    color: '#383d41'
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  successText: {
    color: '#155724',
  },
  info: {
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
  },
  infoText: {
    color: '#0c5460',
  },
  warning: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
  },
  warningText: {
    color: '#856404',
  },
  danger: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  dangerText: {
    color: '#721c24',
  }
});
