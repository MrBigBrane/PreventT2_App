import {createDrawerNavigator} from '@react-navigation/drawer';
import ActivityLog from './ActivityLog';
import CoachLog from './CoachLog';
import MealLog from './MealLog';
import ActionPlan from './ActionPlan';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UserDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Activity Log"
        component={ActivityLog}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="run" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Coach Log"
        component={CoachLog}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="hand-heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meal Logs"
        component={MealLog}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="food-fork-drink" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Action Plan"
        component={ActionPlan}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="notebook-edit" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}