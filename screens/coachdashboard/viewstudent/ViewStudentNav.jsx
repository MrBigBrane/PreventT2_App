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
        options={({ route }) => ({
          title: route.params.studentData.name,
        })}
      />
      <Stack.Screen
        name="View Student Logs"
        component={ViewStudentLogs}
        options={({ route }) => ({
          title: `${route.params.studentData.name} Logs`,
        })}
      />
      <Stack.Screen
        name="View Student Info"
        component={ViewStudentInfo}
        options={({ route }) => ({
          title: `${route.params.studentData.name} Info`,
        })}
      />
    </Stack.Navigator>
  );


}