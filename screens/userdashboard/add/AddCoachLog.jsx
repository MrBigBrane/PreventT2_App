import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function AddCoachLog() {
    return (
        <View>
            <Text>Activity Name</Text>
            <TextInput mode="outlined" placeholder="Enter Activity Name" />
        </View>
    );
}