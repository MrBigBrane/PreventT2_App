import { Surface, Text, Divider, Button } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";


export default function Resources() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Surface style={styles.surface}>
          <Text
            variant="titleLarge"
            style={{ color: "green", fontWeight: "bold", marginBottom: 15 }}
          >
            BMI Calculator
          </Text>
          <Divider />
          <Text variant="bodyLarge" style={styles.text}>
            Body mass index (BMI) is a measure of body fat based on height and
            weight that applies to adult men and women.
          </Text>
          <Divider />
          <Button
            mode="elevated"
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://www.nhlbi.nih.gov/health-topics/bmi-calculator"
              )
            }
            textColor="green"
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon={"launch"}
          >
            BMI Calculator
          </Button>
        </Surface>

          <Surface style={styles.surface}>
            <Text
              variant="titleLarge"
              style={{ color: "green", fontWeight: "bold", marginBottom: 15 }}
            >
              Calorie Calculator
            </Text>
            <Divider />
            <Text variant="bodyLarge" style={styles.text}>
              Use the calorie calculator to estimate the number of daily
              calories your body needs to maintain your current weight.
            </Text>
            <Divider />
            <Button
              mode="elevated"
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/calorie-calculator/itt-20402304"
                )
              }
              buttonColor="green"
              textColor="white"
              style={styles.button}
              contentStyle={styles.buttonContent}
              icon={"launch"}
            >
              Calorie Calculator
            </Button>
          </Surface>

        <Surface style={styles.surface}>
          <Text
            variant="titleLarge"
            style={{ color: "green", fontWeight: "bold", marginBottom: 15 }}
          >
            NRIVA's Nutrition Guide
          </Text>
          <Divider />
          <Text variant="bodyLarge" style={styles.text}>
            Body mass index (BMI) is a measure of body fat based on height and
            weight that applies to adult men and women.
          </Text>
          <Divider />
          <Button
            mode="elevated"
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://drive.google.com/file/d/1ciZHPCOOi-_-LhbSlqpLU7TXtonOwhhH/view"
              )
            }
            textColor="green"
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon={"launch"}
          >
            NRVIA's Nutrition Guide
          </Button>
        </Surface>
      </ScrollView>
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
})