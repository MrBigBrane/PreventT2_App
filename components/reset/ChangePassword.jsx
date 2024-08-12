import { View, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function changePassword() {
        setLoading(true);
        if(password == confirmPassword) {
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
        else if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters')
            setLoading(false);
        }
        else {
            setLoading(false);
            Alert.alert('Passwords do not match');
        }
        
    }


    return (
        <View style={styles.container}>
            <Text variant="bodyLarge" style={{ fontSize: 15 }}>Change Password:</Text>
            <TextInput
                mode="outlined"
                placeholder="Change Password"
                outlineColor="gray"
                activeOutlineColor="gray"
                value={password}
                onChangeText={(text) => setPassword(text)}
                // right={<TextInput.Icon color={"red"} icon="check" onPress={changePassword} loading={loading} />}
                style={styles.input}
            />
            <Text variant="bodyLarge" style={{ fontSize: 15 }}>Confirm Password:</Text>
            <TextInput
                mode="outlined"
                placeholder="Confirm Password"
                outlineColor="gray"
                activeOutlineColor="gray"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                // right={<TextInput.Icon color={"green"} icon="check" onPress={changePassword} loading={loading} />}
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={changePassword}
                style={styles.input}
                loading={loading}
                buttonColor="green"
            >
                Change Password
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    input: {
       marginTop: 10,
        marginBottom: 10,
    },
})