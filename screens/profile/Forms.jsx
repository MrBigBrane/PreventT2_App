import { StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 200,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 12,
    marginTop: 40,
  },
  avatar: {
    // marginTop: 50,
    marginBottom: 45,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    height: 200,
  },
  security: {
    width: "91%",
    alignSelf: "center",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  forms: {
    // width: "91%",
    marginHorizontal: 10,
    alignSelf: "center",
    padding: 15,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 10

  },
  buttonForms: {
    marginTop: 10
  },
  textForms: {
    marginLeft: 10,
    marginVertical: 5
  },
  buttonContent: {
    flexDirection: "row-reverse",
  },
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    // backgroundColor: '#F1F1F1',
    marginTop: 100,
  },
  card: {
    padding: 12,
    margin: 12,
  },
  headerContent:{
    marginTop: 100,
  },
  Modal: {
    backgroundColor: '#005252',
    marginTop: 0,
  },
  editProfile: {
    // flex: 1,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: 40,
    // // backgroundColor: '#F1F1F1',
    // marginTop: 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 10,
  },
});



