import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import ProfileDrawer from './ProfileDrawer';


const Stack = createStackNavigator();





export default function UserDashNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileNav"
        component={ProfileDrawer}
        options={{
          headerShown: false,
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