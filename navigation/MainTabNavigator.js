import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import FontAwesomeTabBarIcon from '../components/FontAwesomeTabBarIcon';
import PharmaScreen from '../screens/PharmaScreen';
import AromaScreen from '../screens/AromaScreen';
import AromaPostScreen from '../screens/AromaPostScreen';
import PhytoScreen from '../screens/PhytoScreen';
import PhytoPostScreen from '../screens/PhytoPostScreen';

const headerOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
    headerTintColor: Colors.contrastColor,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  }
}

const tabBarOptions = {
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    style: {
      backgroundColor: Colors.tintColor,
    }
  }
}

const PharmaStack = createStackNavigator({
  Pharma: PharmaScreen
}, headerOptions);

PharmaStack.navigationOptions = {
  tabBarLabel: 'Pharmacie',
  tabBarIcon: ({ focused }) => (
    <FontAwesomeTabBarIcon
      focused={focused}
      name={`plus-square${focused ? '' : '-o'}`}
    />
  ),
};

const AromaStack = createStackNavigator({
  Aroma: AromaScreen,
  AromaPost: AromaPostScreen
}, headerOptions);

AromaStack.navigationOptions = {
  tabBarLabel: 'Aromathérapie',
  tabBarIcon: ({ focused }) => (
    <FontAwesomeTabBarIcon
      focused={focused}
      name='tint'
    />
  ),
}

const PhytoStack = createStackNavigator({
  Phyto: PhytoScreen,
  PhytoPost: PhytoPostScreen
}, headerOptions)

PhytoStack.navigationOptions = {
  tabBarLabel: 'Phytothérapie',
  tabBarIcon: ({ focused }) => (
    <FontAwesomeTabBarIcon
      focused={focused}
      name='leaf'
    />
  )
}

export default createBottomTabNavigator({
  PharmaStack,
  AromaStack,
  PhytoStack
}, tabBarOptions);
