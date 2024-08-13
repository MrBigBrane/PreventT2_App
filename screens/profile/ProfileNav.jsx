import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import ProfileDrawer from './ProfileDrawer';
import Profile from './Profile';
import EditProfile from './EditProfile';


const Stack = createStackNavigator();





export default function ProfileNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileLanding"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}