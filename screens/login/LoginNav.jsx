import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

const Stack = createStackNavigator();

export default function LoginNav() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={Login}
        options={{ headerTitle: 'Login' }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}