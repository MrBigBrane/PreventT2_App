import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function EditName({ route, navigation }) {
    const { contactDetails } = route.params;

    const [name, setName] = useState(contactDetails.name);
    const [loading, setLoading] = useState(false);

    async function updateName() {
        setLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .update({ name: name })
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
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ marginVertical: 8 }}
            />

            <Button
                mode="contained"
                onPress={updateName}
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