import { Divider, Surface, Text } from "react-native-paper";
import ChangeEmail from "../../components/reset/ChangeEmail";
import ChangePassword from "../../components/reset/ChangePassword";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { useLayoutEffect, useState } from "react";

export default function AccountInfo({ navigation, route }) {
    const [datum, setDatum] = useState({});

    async function getData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);

        if(error) {
          console.log(error);
        } else {
          console.log(data);
          setDatum(data[0]);
        }
    }

    useLayoutEffect(() => {
      getData();
      console.log(datum);
    }, []);

    return (
      <View style={styles.container}>
        <Text variant="titleLarge">Contact Information</Text>
        <Divider style={styles.divider} />
        
        <ChangeEmail phoneNum={datum.phone} email={datum.email_address}/>
        
        <Text variant="titleLarge">Change/Reset Password:</Text>
        <Divider style={styles.divider} />
        <ChangePassword />
      </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    divider: {
        marginVertical: 8,
    }
})