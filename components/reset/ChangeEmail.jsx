import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-paper";
import { useState } from "react";


export default function ChangeEmail({ emailAddress, phoneNum }) {
    const [email, setEmail] = useState(emailAddress);
    const [phone, setPhone] = useState(phoneNum);
    const [loading, setLoading] = useState(false);
    const [locked1, setLocked1] = useState(true);
    const [locked2, setLocked2] = useState(true);

    async function changeEmail() {
        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            email: email,
        })

        if (error) {
            console.log(error)
        } else {
            setLoading(false);
            console.log(data)
        }
    }

    async function changePhone() {
        setLoading(true);
        const { data, error } = await supabase.from("profiles").update({ phone: phone }).eq("id", supabase.auth.user().id);

        if (error) {
            console.log(error)
        } else {
            setLoading(false);
            console.log(data)
        }
    }


    return (
      <View>
        <Text variant="bodyLarge" style={{ fontSize: 15 }}>Change Email:</Text>
        <TextInput
          mode="outlined"
          placeholder="Change Email"
          outlineColor="gray"
          activeOutlineColor="gray"
          value={email}
          onChangeText={(text) => setEmail(text)}
          right={locked1 ? <TextInput.Icon icon="pencil" onPress={() => setLocked1(false)}/> : <TextInput.Icon color={"green"} icon="check" onPress={changeEmail} loading={loading} />}
          style={styles.input}
          disabled={locked1}
        />
        <Text variant="bodyLarge" style={{ fontSize: 15 }}>Change Phone Number:</Text>
        <TextInput
          mode="outlined"
          placeholder="Change Phone Number"
          outlineColor="gray"
          activeOutlineColor="gray"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          right={locked2 ? <TextInput.Icon icon="pencil" onPress={() => setLocked2(false)}/> : <TextInput.Icon color={"green"} icon="check" onPress={changePhone} loading={loading} />}
          style={styles.input}
          disabled={locked2}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
       marginTop: 10,
        marginBottom: 10,
    },
})