import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Onboarding from './Onboarding';
import BecomeCoach from './BecomeCoach';
import EditProfile from './EditProfile';
import Forms from './Forms';

const Stack = createStackNavigator();

export default function FormNav() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="Form" component={Forms} options={{ headerShown: false }}  />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        // options={{ headerShown: false }}
      />
      
      <Stack.Screen name="Become Coach" component={BecomeCoach} />
      <Stack.Screen name="Edit Profile" component={EditProfile} options={{ presentation: 'modal', headerBackTitleVisible: false, headerLeft: null }} />
    </Stack.Navigator>
  );
}