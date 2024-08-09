import { Button, Divider, Surface, Text } from "react-native-paper";

export default function Forms() {
    return (
      <Surface elevation={4} style={styles.forms}>
        <Text
          variant="headlineMedium"
          style={{ fontWeight: "bold", color: "green" }}
        >
          Forms
        </Text>
        <Divider style={styles.divider} />
        <Text variant="titleLarge" style={styles.textForms}>
          Onboarding Form
        </Text>
        <Text style={styles.textForms}>
          If you are an NRIVA DPP member, fill out the onboarding form to get
          started!
        </Text>
        <Button
          mode="elevated"
          buttonColor="green"
          textColor="white"
          onPress={() => navigation.navigate("Onboarding")}
          style={styles.buttonForms}
          contentStyle={styles.buttonContent}
          // icon={"launch"}
        >
          Onboarding Form
        </Button>
        <Divider style={styles.divider} />
        <Text variant="titleLarge" style={styles.textForms}>
          Become a Coach
        </Text>
        <Text style={styles.textForms}>Sign up to become a coach today!</Text>
        <Button
          mode="elevated"
          buttonColor="green"
          textColor="white"
          onPress={() => navigation.navigate("Become Coach")}
          style={styles.buttonForms}
          contentStyle={styles.buttonContent}
          // icon={"launch"}
        >
          Become a Coach
        </Button>
      </Surface>
    );
}

