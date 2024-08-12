import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GeneralInfo from './GeneralInfo';
import AccountInfo from './accountinfo/AccountInfo';
import FormNav from './FormNav';
import Profile from './Profile';
import AccountNav from './accountinfo/AccountNav';

export default function ProfileDrawer() {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="run" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Forms"
        component={FormNav}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="hand-heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="General Information"
        component={GeneralInfo}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="food-fork-drink" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account Information"
        component={AccountNav}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="notebook-edit" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Resources"
        component={Resources}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="clipboard-multiple-outline" size={size} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}