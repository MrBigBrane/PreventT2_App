import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Divider, Surface, Text } from "react-native-paper";

export default function Forms({ navigation }) {
    return (
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Text
            variant="titleLarge"
            style={{ color: "green", fontWeight: "bold", marginBottom: 15 }}
          >
            Onboarding Form:
          </Text>
          <Divider />
          <Text variant="bodyLarge" style={styles.text}>
            Description
          </Text>
          <Button
            mode="elevated"
            buttonColor="green"
            textColor="white"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate("Onboarding")}

            // icon={"launch"}
          >
            Onboarding Form
          </Button>
        </Surface>

        <Surface style={styles.surface}>
          <Text
            variant="titleLarge"
            style={{ color: "green", fontWeight: "bold", marginBottom: 15 }}
          >
            Onboarding Form:
          </Text>
          <Divider />
          <Text variant="bodyLarge" style={styles.text}>
            Description
          </Text>
          <Button
            mode="elevated"
            buttonColor="green"
            textColor="white"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate("Become Coach")}
            // icon={"launch"}
          >
            Become a Coach
          </Button>
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
button: {
    margin: 12,
    marginTop: 20,
    buttonColor: "red",
    textColor: "green",
},
buttonContent: {
  flexDirection: "row-reverse",
},
text: {
    flexDirection: "row",
    // justifyContent: "center",
    // textAlign: "center",
    marginTop: 10,
    marginBottom: 10
},
});



