import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import HomeScreen from './containers/HomeScreen';
import AboutScreen from './containers/AboutScreen';
import DetailScreen from './containers/DetailScreen';
import TabIcon from './components/tabIcon';

console.disableYellowBox = true;

const homeIcon = require('./assets/s.png');
const detailIcon = require('./assets/t.png');
const aboutIcon = require('./assets/m.png');

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Hereos',
        tabBarIcon: () => <TabIcon icon={homeIcon} />,
      },
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        tabBarLabel: 'Detail',
        tabBarIcon: () => <TabIcon icon={detailIcon} />,
      },
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: () => <TabIcon icon={aboutIcon} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f2f2f2',
    inactiveColor: '#FFFFFF',
    barStyle: {backgroundColor: '#4d0000'},
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default createAppContainer(TabNavigator);
