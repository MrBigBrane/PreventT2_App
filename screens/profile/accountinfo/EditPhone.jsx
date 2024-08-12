import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function EditPhone({ route, navigation }) {
    const { contactDetails } = route.params;

    const [phone, setPhone] = useState(contactDetails.phone);
    const [loading, setLoading] = useState(false);

    async function updatePhone() {
        setLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .update({ phone: phone })
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
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={{ marginVertical: 8 }}
                left={<TextInput.Affix text="+ 1" />}
            />

            <Button
                mode="contained"
                onPress={updatePhone}
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