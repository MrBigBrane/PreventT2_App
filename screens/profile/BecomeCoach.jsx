import { View } from "react-native";
import AddClass from "../coachdashboard/AddClass";

export default function BecomeCoach({ navigation }) {
    return (
        <View>
            <AddClass navigation={navigation} />
        </View>
    );
}