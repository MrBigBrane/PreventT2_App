import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-paper";
import { useState } from "react";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function changePassword() {
        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            password: password,
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
                placeholder="Change Password"
                outlineColor="gray"
                activeOutlineColor="gray"
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={<TextInput.Icon color={"red"} icon="check" onPress={changePassword} loading={loading} />}
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