import { useEffect } from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase"
import { Button, Text } from "react-native-paper";


export default function Profile({ navigation }) {

    async function signOutUser() {
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.log(error);
        } else {
          navigation.navigate("Login");
        }
        
    } 
    

    return (
        <View>
            <Text>Profile</Text>
            <Button mode="contained" onPress={signOutUser}>Sign Out</Button>
        </View>
    );
}