import { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase"
import { Avatar, Button, Text, Surface, Divider } from "react-native-paper";
import PickAvatar from "../../components/pickphoto/PickAvatar";
import ChangeEmail from "../../components/reset/ChangeEmail";
import ChangePassword from "../../components/reset/ChangePassword";
import { S } from "@expo/html-elements";


export default function Profile({ navigation }) {
    const [data, setData] = useState({});

    async function signOutUser() {
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.log(error);
        } else {
          navigation.navigate("Login");
        }
        
    } 

    async function getUser() {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);
          
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setData(data[0]);
        }
    }

    useLayoutEffect(() => {
        getUser();
    }, [])
    

    return (
      <ScrollView>
        <View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D",
            }}
            style={styles.backgroundContainer}
          />
          <View style={styles.avatar}>
            {/* <Avatar.Image
              size={100}
              source={{ uri: "https://picsum.photos/700" }}
            /> */}
            {data.id && (
              <PickAvatar
                userId={data.id}
                firstName={data.first_name}
                lastName={data.last_name}
              />
            )}

            <Text
              variant="displayMedium"
              style={{ color: "white", marginLeft: 20 }}
            >
              {data.first_name} {data.last_name}
            </Text>
          </View>
        </View>
        <View>
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
              If you are an NRIVA DPP member, fill out the onboarding form to
              get started!
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
            <Text style={styles.textForms}>
              Sign up to become a coach today!
            </Text>
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
        </View>
        <View>
          <Surface elevation={4} style={styles.security}>
            <Text
              variant="headlineMedium"
              style={{ fontWeight: "bold", color: "green" }}
            >
              Security:
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodyLarge">Change Email:</Text>
            <ChangeEmail />
            <Divider style={styles.divider} />
            <Text variant="bodyLarge">Change/Reset Password:</Text>
            <ChangePassword />
          </Surface>

          <Button
            mode="elevated"
            textColor="white"
            buttonColor="teal"
            onPress={signOutUser}
            style={styles.button}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
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
  },
  button: {
    margin: 12,
    marginTop: 40,
  },
  avatar: {
    marginTop: 50,
    marginBottom: 75,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
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
    width: "91%",
    alignSelf: "center",
    padding: 15,
    marginTop: 20,
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
});
