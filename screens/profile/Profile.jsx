import { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, View, ScrollView, FlatList } from "react-native";
import { supabase } from "../../lib/supabase"
import { Avatar, Button, Text, Surface, Divider, Card } from "react-native-paper";
import PickAvatar from "../../components/pickphoto/PickAvatar";
import ChangeEmail from "../../components/reset/ChangeEmail";
import ChangePassword from "../../components/reset/ChangePassword";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Profile({ navigation }) {
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [onboarding, setOnboarding] = useState({});
    // let [ShowComment, setShowModelComment] = useState(false);
    // let [animateModal, setanimateModal] = useState(false);

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

        setUser(user);

        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);

        const { data: onboardingData, error: onboardingError } = await supabase
          .from("onboarding")
          .select()
          .eq("id", user.id)
          
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setData(data[0]);
          setOnboarding(onboardingData[0]);
        }
    }

    useLayoutEffect(() => {
        getUser();
    }, [])

    function CardButton({ title, icon, onPress}) {
      return (
        <Card style={styles.card} onPress={onPress}>
          <Card.Title
            title={title}
            titleVariant="headlineMedium"
            left={(props) => (
              <Icon name={icon} size={24} color="black" {...props} />
            )}
          />
        </Card>
      );
  }
    

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
            {data.id && <PickAvatar userId={data.id} editMode={false} />}

            <Text
              variant="displayMedium"
              style={{ color: "white", marginLeft: 20 }}
            >
              {data.name}
            </Text>

            <Button
              mode="elevated"
              buttonColor="teal"
              textColor="white"
              onPress={() =>
                navigation.navigate("Edit Profile", { data: data.name })
              }
              style={styles.editProfile}
              // contentStyle={styles.buttonContent}
              icon={"pencil"}
            >
              {" "}
              Edit Profile
            </Button>
          </View>

          <Surface elevation={4} style={styles.forms}>
          {onboarding.height && (
          <View>
            <Text variant="displaySmall">Demographics</Text>
            <Divider style={styles.divider} />
            <View style={styles.textRow}>
            <View style={{ flexDirection: "row", marginRight: 60 }}>
              <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
                Height:
              </Text>
              <View>
                {/* <Icon
                  name="ruler"
                  size={30}
                  style={{ justifyContent: "center" }}
                /> */}
                <Text variant="bodyLarge"> {onboarding.height}</Text>
              </View>
            </View>
            {/* <Divider style={styles.divider} /> */}
            <View style={{ flexDirection: "row" }}>
              <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
                Age:
              </Text>
              <View style={styles.text}>
                {/* <Icon
                  name="white-balance-sunny"
                  size={30}
                  style={{ justifyContent: "center" }}
                /> */}
                <Text variant="bodyLarge"> {onboarding.age}</Text>
              </View>
            </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.textRow}>
            <View style={{ flexDirection: "row", marginRight: 60 }}>
              <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
                Gender:
              </Text>
              <View style={styles.text}>
                {/* <Icon
                  name={onboarding.gender.icon}
                  size={30}
                  style={{ justifyContent: "center" }}
                /> */}
                <Text variant="bodyLarge">
                  {" "}
                  {onboarding.gender.title.substring(2)}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={{ flexDirection: "row" }}>
              <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
                Sex:
              </Text>
              <View style={styles.text}>
                {/* <Icon
                  name="weight-kilogram"
                  size={30}
                  style={{ justifyContent: "center" }}
                /> */}
                <Text variant="bodyLarge"> {onboarding.sex.title}</Text>
              </View>
            </View>
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
                Ethnicity:
              </Text>
              <View style={styles.text}>
                <Icon
                  name={onboarding.ethnicity.icon}
                  size={30}
                  style={{ justifyContent: "center" }}
                />
                <Text variant="headlineSmall">
                  {" "}
                  {onboarding.ethnicity.title}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text variant="headlineSmall" style={{ marginBottom: 5 }}>
                Race:
              </Text>
              <View style={styles.text}>
                <Icon
                  name={onboarding.race.icon}
                  size={30}
                  style={{ justifyContent: "center" }}
                />
                <Text variant="headlineSmall"> {onboarding.race.title}</Text>
              </View>
            </View>
            </View>
            )}

          </Surface>
        </View>
        <View>
          <CardButton
            title={"General Information"}
            icon={"information"}
            onPress={() =>
              navigation.navigate("General Information", {
                onboarding: onboarding,
              })
            }
          />
          <CardButton
            title={"Account Information"}
            icon={"security"}
            onPress={() =>
              navigation.navigate("Account Information", {
                data: data,
                user: user,
              })
            }
          />
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
    width: "91%",
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
  textRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});
