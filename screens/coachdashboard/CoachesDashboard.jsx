import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import CoachesClassCard from "../../components/CoachClassCard";

export default function CoachesDashboard({ navigation }) {
    function handleButtonPress() {
        navigation.navigate('ClassView');
    }

    return (
        <View style={styles.container}>
            <View >
                <Pressable onPress={handleButtonPress}>
                    <CoachesClassCard /> 
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      marginTop: 10,
    },
  })