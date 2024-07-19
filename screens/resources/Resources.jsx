import { Surface, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { A } from "@expo/html-elements";

export default function Resources() {
    return (
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Text variant="titleLarge" style={{ color: "green", fontWeight: "bold" }}>BMI Calculator</Text>
          <Text variant="bodyLarge">
            Body mass index (BMI) is a measure of body fat based on height and
            weight that applies to adult men and women.
          </Text>
          <A href="https://www.nhlbi.nih.gov/health-topics/bmi-calculator">Click here</A>
        </Surface>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    surface: {
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        // alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
})