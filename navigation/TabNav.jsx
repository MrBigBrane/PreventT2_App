import UserDrawer from "../screens/userdashboard/UserDrawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import CoachNav from "../screens/coachdashboard/CoachNav";
import UserDashNav from "./UserDashNav";
import MyClass from "../screens/myclass/MyClass";
import ProfileNav from "../screens/profile/ProfileNav";
import Resources from "../screens/resources/Resources";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

const tabBar = ({ navigation, state, descriptors, insets }) => (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
  
        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }
  
        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.title;
  
        return label;
      }}
    />
  )

export default function TabNav() {
    const [inClass, setInClass] = useState('');

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        
        if(user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", user.id)

          if (error) {
            console.log(error);
          } else {
            setInClass(data[0].class_codes);
          }
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
      <Tab.Navigator tabBar={tabBar}>
        <Tab.Screen
          name="UserDash"
          component={UserDashNav}
          options={{
            headerShown: false,
            tabBarLabel: "View Logs",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="CoachDash"
          component={CoachNav}
          options={{
            headerShown: false,
            tabBarLabel: "Coach View",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="whistle" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name={inClass !== null ? "MyClass" : "JoinClass"}
          component={MyClass}
          options={{
            // headerShown: false,
            tabBarLabel: inClass !== null ? "My Class" : "Join Class",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account-group" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Resources"
          component={Resources}
          options={{
            tabBarLabel: "Resources",
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon
                  name="clipboard-multiple-outline"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile Page"
          component={ProfileNav}
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account-circle" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
}