
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { supabase } from './lib/supabase';
import { useLayoutEffect, useState } from 'react';
import 'react-native-gesture-handler';
import TabNav from './navigation/TabNav';
import LoginNav from './screens/login/LoginNav';

const Stack = createStackNavigator();





export default function MyTabs() {

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      setUser(user);
    };

    fetchUser();
  }, [user]);


  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginNav} options={{ headerShown: false }} />
            <Stack.Screen
              name="LoggedIn"
              component={TabNav}
              options={{ headerShown: false, headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}