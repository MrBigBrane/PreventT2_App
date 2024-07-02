import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import UserDrawer from '../screens/userdashboard/UserDrawer';
import AddActivity from '../screens/userdashboard/add/AddActivity';
import AddCoachLog from '../screens/userdashboard/add/AddCoachLog';
import AddMeal from '../screens/userdashboard/add/AddMeal';
import AddActionPlan from '../screens/userdashboard/add/AddActionPlan';

const Stack = createStackNavigator();





export default function UserDashNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Dashboard"
        component={UserDrawer}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
      />
      <Stack.Screen
        name="Add Activity"
        component={AddActivity}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Coach Log"
        component={AddCoachLog}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Meal"
        component={AddMeal}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Action Plan"
        component={AddActionPlan}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}