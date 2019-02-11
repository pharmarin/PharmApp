import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import HtmlText from '../components/HtmlText';

export default class Table extends React.Component {
  renderRow(row, rowIndex) {
    return (
      <View key={rowIndex} style={styles.row}>
        {
          Object.keys(row)[0] === "quantite" ?
            Object.keys(row).reverse().map((key, cellIndex) => {
              const styleFlex = key === "quantite" ? 1 : 2
              return <View
                key={rowIndex.toString() + cellIndex.toString()}
                style={[styles.cell, {flex: styleFlex}]}
                >
                <HtmlText>{ row[key] }</HtmlText>
              </View>
            }) :
            Object.keys(row).map((key, cellIndex) => {
              return <View
                key={rowIndex.toString() + cellIndex.toString()}
                style={styles.cell}
                >
                <HtmlText>{ row[key] }</HtmlText>
              </View>
            })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.table}>
        {
          this.props.data.map((row, index) => {
            return this.renderRow(row, index);
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 5,
    alignSelf: 'stretch',
    borderWidth: .5,
    borderColor: 'grey'
  }
});
