import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewAnnouncements from "./ViewAnnouncements";
import MyClass from './MyClass';
import ViewAnnouncement from './ViewAnnouncement.jsx';


export default function MyClassNav({ route }) {
    const { label } = route.params;

    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Class"
        component={MyClass}
        initialParams={{
          label: label,
        }}
        options={({ route }) => ({
          title: route.params.label,
          headerLeft: null,
        })}
      />
      <Stack.Screen name="View Announcements" component={ViewAnnouncements} />
      <Stack.Screen name="View Announcement" component={ViewAnnouncement} />
    </Stack.Navigator>
  );
}