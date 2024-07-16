import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoachesDashboard from './CoachesDashboard';
import ClassView from './ClassView';
import Settings from './Settings';
import ViewClass from './ViewClass';
import ViewStudent from './ViewStudent';
import AddClass from './AddClass';
import Announcements from './Announcements';
import ViewAnnouncement from "./ViewAnnouncement";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InviteUser from './InviteUser';
import { navigation } from '@react-navigation/native';

export default function CoachNav({navigation}) {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Coaches Dashboard"
        component={CoachesDashboard}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name="Add Class" component={AddClass} />
      <Stack.Screen
        name="ClassView"
        component={ClassView}
        options={
          (({ route }) => ({
            title: route.params.className,
            headerRight: () => (
              <Icon
                name="account-multiple-plus"
                size={29}
                color={"green"}
                marginRight={15}
                onPress={() =>
                  navigation.navigate("Invite User", {
                    classId: route.params.classId,
                  })
                }
              />
            ),
          })
          )
        }
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="View Class" component={ViewClass} />
      <Stack.Screen name="View Student" component={ViewStudent} />
      <Stack.Screen name="Announcements" component={Announcements} />
      <Stack.Screen name="View Announcement" component={ViewAnnouncement} />
      <Stack.Screen name="Invite User" component={InviteUser} />
    </Stack.Navigator>
  );
}