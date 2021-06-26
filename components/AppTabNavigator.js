import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScanQR from '../screens/ScanQR';
import UpdateScreen from '../screens/UpdateScreen';



export const AppTabNavigator = createBottomTabNavigator({
  ScanQR : {
    screen: ScanQR,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/splash.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Scan",
    }
  },
  Update : {
    screen: UpdateScreen,
    navigationOptions :{
      tabBarLabel : "Update",
    }
  }
});
