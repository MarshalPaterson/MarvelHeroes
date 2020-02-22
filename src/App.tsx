import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import HomeScreen from './containers/HomeScreen';
import SettingsScreen from './containers/SettingsScreen';
import DetailScreen from './containers/DetailScreen';

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
        Settings: { screen: SettingsScreen,  
            navigationOptions:{  
                tabBarLabel:'Settings',  
            }  
        },  
        Detail: { screen: DetailScreen,  
            navigationOptions:{  
                tabBarLabel:'Detail',
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