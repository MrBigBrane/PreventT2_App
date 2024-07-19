import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-paper";
import { useState } from "react";


export default function ChangeEmail() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

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


    return (
      <View>
        <TextInput
          mode="outlined"
          placeholder="Change Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon icon="check" onPress={changeEmail} loading={loading} />}
          style={styles.input}
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