import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import HomeScreen from './containers/HomeScreen';
import AboutScreen from './containers/AboutScreen';
import DetailScreen from './containers/DetailScreen';

console.disableYellowBox = true;

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
});  
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarLabel:'Hereos',  
            }  
        },  
        Detail: { screen: DetailScreen,  
            navigationOptions:{  
                tabBarLabel:'Detail',
            }  
        },  
        About: { screen: AboutScreen,  
            navigationOptions:{  
                tabBarLabel:'About',  
            }  
        },  
    },  
    {  
      initialRouteName: "Home",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  

export default createAppContainer(TabNavigator);  