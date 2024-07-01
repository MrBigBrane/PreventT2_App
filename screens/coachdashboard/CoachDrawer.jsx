import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoachesDashboard from './CoachesDashboard';
import ClassView from './ClassView';


export default function UserDrawer() {
    const Stack = createStackNavigator();
  return (
    
          <Stack.Navigator>
            <Stack.Screen name='Coaches Dashboard' component={CoachesDashboard} />
            {/* <Drawer.Screen name='Profile' component={Profile} /> */}
            <Stack.Screen name='ClassView' component={ClassView} />
          </Stack.Navigator>
  );
}