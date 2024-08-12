import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function EditEmail({ route, navigation }) {
    const { contactDetails } = route.params;

    const [email, setEmail] = useState(contactDetails.email_address);
    const [loading, setLoading] = useState(false);

    async function updateEmail() {
        setLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .update({ email_address: email })
            .eq("id", contactDetails.id)

        setLoading(false);

        if (error) {
            console.log(error)
        } else {
            navigation.replace("AccountInfo");
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Name"
                placeholder="Enter your name"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ marginVertical: 8 }}
            />

            <Button
                mode="contained"
                onPress={updateEmail}
                style={{ marginVertical: 8 }}
                loading={loading}
            >
                Save
            </Button>
        </View>
    )

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