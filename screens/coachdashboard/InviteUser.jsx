import { View, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { Surface, Text, TextInput, IconButton, Divider } from "react-native-paper";
import { useEffect, useState } from "react";

export default function InviteUser({ route, navigation }) {
    const { classId } = route.params;

    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");


    async function getClasses() {

        const { data, error } = await supabase
          .from('coach_codes')
          .select()
          .eq("code", classId)
        console.log(data)
          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
    }

    async function inviteUser() {
        const { data, error } = await supabase
          .from('invites')
          .insert({
            class_code: classId,
            invitee_email: email
        })
          .select()
          .eq("code", classId)
        console.log(data)
          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
    }

    useEffect(() => {
        getClasses()
    }, [])



    return (
      <View style={styles.spacing}>
        {data.length > 0 && (
          <Surface style={styles.paper}>
            <Text variant="titleLarge">Class Details</Text>
            <Text marginVertical={10}>Class Name: {data[0].class_name}</Text>
            <Text>Class Code: {data[0].code}</Text>
            <Divider />
            <View style={styles.invite}>
              <TextInput
                mode="outlined"
                placeholder="Enter Email"
                style={{ flex: 0.8 }}
              />
              <IconButton
                mode="contained"
                icon="send"
                onPress={() => inviteUser()}
                style={{ flex: 0.2, height: "100%" }}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
          </Surface>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    spacing: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    padding: {
        
        // flex: 1,
    },
    paper: {
        // flex: 1,
        padding: 10,
        marginVertical: "60%",
        width: "90%",
        margin: "auto",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 8, 
        // position: "absolute",
        // // middleTop: 0,
    },
    invite: {
        // flex: 1,
        marginTop: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    }

})