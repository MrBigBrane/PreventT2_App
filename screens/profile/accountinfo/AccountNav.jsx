import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AccountInfo from './AccountInfo';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPhone from './EditPhone';
import EditPassword from './EditPassword';

const Stack = createStackNavigator();

export default function AccountNav() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Edit Name"
        component={EditName}
        options={{ presentation: 'modal', headerBackTitleVisible: false, headerLeft: null }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Email"
        component={EditEmail}
        options={{ presentation: 'modal', headerBackTitleVisible: false, headerLeft: null }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Phone"
        component={EditPhone}
        options={{ presentation: 'modal', headerBackTitleVisible: false, headerLeft: null }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Password"
        component={EditPassword}
        options={{ presentation: 'modal', headerBackTitleVisible: false, headerLeft: null }}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}