import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ActivityLog from './ActivityLog';
import CoachLog from './CoachLog';

export default function UserDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    
          <Drawer.Navigator>
            <Drawer.Screen name='Activity Log' component={ActivityLog} />
            <Drawer.Screen name='Coach Log' component={CoachLog} />
            {/* <Drawer.Screen name='Profile' component={Profile} /> */}
          </Drawer.Navigator>
  );
}