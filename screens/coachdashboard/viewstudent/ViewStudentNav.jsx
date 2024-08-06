import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewStudentLanding from './ViewStudentLanding';
import ViewStudentLogs from './ViewStudentLogs';
import ViewStudentInfo from './ViewStudentInfo';

export default function ViewStudentNav({navigation}) {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View Student Landing"
        component={ViewStudentLanding}
      />
      <Stack.Screen name="View Student Logs" component={ViewStudentLogs} />
      <Stack.Screen name="View Student Info" component={ViewStudentInfo} />
    </Stack.Navigator>
  );


}