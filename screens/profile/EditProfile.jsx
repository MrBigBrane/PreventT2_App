import { View, StyleSheet } from "react-native";
import PickAvatar from "../../components/pickphoto/PickAvatar";
import { Divider } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Text } from "react-native-paper";


export default function EditProfile() {
  const [data, setData] = useState({});
    // let [ShowComment, setShowModelComment] = useState(false);
    // let [animateModal, setanimateModal] = useState(false);

    async function signOutUser() {
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.log(error);
        } else {
          navigation.navigate("Login");
        }
        
    } 

    async function getUser() {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);
          
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setData(data[0]);
        }
    }

    useLayoutEffect(() => {
      getUser();
    }, []);

    return (
      <View style={styles.container}>
        <PickAvatar
          userId={data.id}
          // name = {data.name}
          // // firstName = {data.name}
          style={styles.avatar}
        />
        <Divider style={styles.Divider} />
        <Text
              variant="displayMedium"
              style={styles.displayName}
            >
              {data.name}
        </Text>
      </View>
    );  


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  avatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 20,
  },
  displayName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 20,
  },
  Divider: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});