import { View, StyleSheet } from "react-native";
import PickAvatar from "../../components/pickphoto/PickAvatar";
import { Divider } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Text, TextInput, Button } from "react-native-paper";


export default function EditProfile({ navigation, route }) {
  const { datum } = route.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [text1, setText1] = useState(datum);
    // let [ShowComment, setShowModelComment] = useState(false);
    // let [animateModal, setanimateModal] = useState(false);

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("profiles")
          .update({ name: text1, id: user.id })
          .eq("id", user.id)

      if (error) {
          console.log(error)
      } else {
          setLoading(false);
          console.log(data)
      }
      navigation.goBack();
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
        <TextInput
          mode="outlined"
          placeholder="Name"
          onChangeText={(text) => setText1(text)}
          value={text1}
          left={<TextInput.Icon icon="pen" />}
        />
        
        <Button mode="contained" onPress={submit}>Save</Button>
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