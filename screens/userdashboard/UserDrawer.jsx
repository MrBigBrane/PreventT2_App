import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ActivityLog from './ActivityLog';

export default function UserDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    
          <Drawer.Navigator>
            <Drawer.Screen name='Activity Log' component={ActivityLog} />
            {/* <Drawer.Screen name='Profile' component={Profile} /> */}
          </Drawer.Navigator>
  );
}