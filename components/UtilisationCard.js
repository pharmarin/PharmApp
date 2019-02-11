import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {
  Card,
  Icon,
  Text,
} from 'react-native-elements';

export default class UtilisationCard extends React.Component {

  renderStars (recos) {
    returnArray = []
    if (recos && recos > 0) {
      for (var i = 0; i < recos; i++) {
        returnArray.push(<Icon type="font-awesome" name="star-o" iconStyle={styles.star} key={i.toString()} />)
      }
    }
    return returnArray
  }

  renderIcon (recos) {
    switch (recos) {
      case "-1":
        return <Icon type="font-awesome" name="times-circle-o" iconStyle={[styles.ci, styles.icon]} />
        break;
      case "1":
        return <Icon type="font-awesome" name="check-circle-o" iconStyle={[styles.one, styles.icon]} />
        break;
      case "2":
        return <Icon type="font-awesome" name="check-circle-o" iconStyle={[styles.two, styles.icon]} />
        break;
      case "3":
        return <Icon type="font-awesome" name="check-circle-o" iconStyle={[styles.three, styles.icon]} />
        break;
      default:
        console.log("Default switch for ", recos)
        return null
    }
  }

  render () {
    if (!this.props.recos && !this.props.comment) return null
    return (
      <Card
        containerStyle={
          this.props.index === 0 ? [styles.container, { marginTop: 0 }]
          : styles.container
        }
        title={
          <View style={styles.titleView}>
            <View style={styles.title}>
              { this.renderIcon(this.props.recos) }
              <Text style={{fontSize: 17}}>{ this.props.name }</Text>
            </View>
            <View style={styles.stars}>
              { this.renderStars(this.props.recos) }
            </View>
          </View>
        }
        >
        {
          this.props.comment ?
          <Text style={{marginTop: 10}} >{ this.props.comment }</Text>
          : null
        }
      </Card>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    color: 'grey',
    fontSize: 17,
    marginTop: 1
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  ci: {
    color: 'red',
  },
  one: {
    color: 'gold'
  },
  two: {
    color: '#9acd32'
  },
  three: {
    color: 'green'
  }
});
