import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoachesDashboard from './CoachesDashboard';
import ClassView from './ClassView';
import Settings from './Settings';
import ViewClass from './ViewClass';


export default function CoachNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Coaches Dashboard"
        component={CoachesDashboard}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="ClassView"
        component={ClassView}
        options={({ route }) => ({ title: route.params.className })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        name="View Class"
        component={ViewClass}
      />
    </Stack.Navigator>
  );
}