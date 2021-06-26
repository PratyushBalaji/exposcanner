import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu  from './CustomSideBarMenu';
import UpdateScreen from '../screens/UpdateScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Scan : {
    screen : AppTabNavigator
    },
    Update:{screen:UpdateScreen}
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Scan'
  })
