import { useLayoutEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import * as WebBrowser from "expo-web-browser";
import DialogComponent from "../../components/dialog/Dialog";
import CardButton from "../../components/CardButton";

export default function MyClass({ navigation, route }) {

  const [classData, setClassData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isData , setIsData] = useState(false);
  const [image, setImage] = useState();
  const [classCode, setClassCode] = useState();

    async function getInClass() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);

        setUserData(data[0]);

        if (error) {
          console.log(error);
        } else {
          setIsData(true);

          if (data[0].class_codes !== null) {
            const coachCodes = await supabase
              .from("coach_codes")
              .select()
              .eq("code", data[0].class_codes);

            const pictureFetch = await supabase.storage
              .from("class_backgrounds") // Replace with your bucket name
              .getPublicUrl(coachCodes.data[0].background_picture_path);
      
            if (error || pictureFetch.error) {
              console.log(error, pictureFetch.error);
            } else {
              setClassData(coachCodes.data[0]);
              setImage(
                pictureFetch.data.publicUrl
                  ? pictureFetch.data.publicUrl
                  : "https://picsum.photos/700"
              );
            }
          }
            
        }
      }
    }


  async function joinClass() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        class_codes: classCode,
        joined_class_at: new Date(),
      })
      .eq("id", user.id)
      .select();

    if (error) {
      console.log(error);
    } else {
      setClassCode("");
      setUserData(data[0]);
      navigation.setParams({ label: "My Class" });
      getInClass();
    }
  }

  async function leaveClass() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        class_codes: null,
      })
      .eq("id", user.id)
      .select();

    if (error) {
      console.log(error);
    } else {
      setUserData(data[0]);
      console.log(data);
      // getInClass();
    }
  }

  useLayoutEffect(() => {
    getInClass();
  }, []);

    return (
      <View style={styles.container}>
        {isData && (
          <View style={styles.container}>
            {userData.class_codes !== null ? (
              <View style={{ width: "100%", flex: 1 }}>
                <View>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 200,
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 30,
                      color: "white",
                      position: "absolute",
                      bottom: 20,
                      left: 10,
                    }}
                  >
                    {classData.class_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: 0,
                      left: 10,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                        flex: 3,
                        // position: "absolute",
                        // bottom: 20,
                        // left: 10,
                      }}
                    >
                      Joined at: {userData.joined_class_at.substring(0, 10)}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "white",
                        flex: 1.2,
                        // position: "absolute",
                        // bottom: 10,
                        // left: 10,
                      }}
                    >
                      Class Code: {classData.code}
                    </Text>
                  </View>
                </View>
                {/* <Button
                  onPress={() =>
                    navigation.navigate("View Announcements", {
                      classData: classData,
                    })
                  }
                  mode="elevated"
                  icon={"bullhorn"}
                  textColor="white"
                  buttonColor="green"
                  style={{ margin: 10 }}
                >
                  Announcements
                </Button> */}
                <CardButton
                  title={"Announcements"}
                  icon={"bullhorn"}
                  onPress={() =>
                    navigation.navigate("View Announcements", {
                      classData: classData,
                    })
                  }
                />
                {/* <Button
                  onPress={() => console.log("exercise plan")}
                  mode="elevated"
                  icon={"dumbbell"}
                  textColor="white"
                  buttonColor="green"
                  style={{ margin: 10 }}
                >
                  Exercise Plan
                </Button> */}
                {classData.meet_link !== null && classData.meet_link !== "" && (
                  <Button
                    mode="elevated"
                    onPress={() =>
                      WebBrowser.openBrowserAsync(classData.meet_link)
                    }
                    textColor="green"
                    style={{ margin: 10 }}
                    contentStyle={styles.buttonContent}
                    icon={"launch"}
                  >
                    Meeting Link
                  </Button>
                )}
                {/* <Button
                  onPress={leaveClass}
                  mode="elevated"
                  icon={"exit-run"}
                  textColor="white"
                  buttonColor="red"
                  style={{ margin: 10 }}
                >
                  Leave Class
                </Button> */}
                <DialogComponent
                  buttonTitle={"Leave Class"}
                  alertTitle={"Leaving Class"}
                  alertContent={"Are you sure you want to leave this class?"}
                  alertAction={leaveClass}
                  alertActionTitle={"Leave Class"}
                  mode={"contained"}
                  style={{ margin: 10 }}
                  icon={"exit-run"}
                  buttonStyle={{ backgroundColor: "red" }}
                />
              </View>
            ) : (
              <View style={styles.container}>
                <View style={styles.infoView}>
                  <Surface style={styles.padding}>
                    <Text>Enter Class Code</Text>
                    <TextInput
                      placeholder="Class Code"
                      mode="outlined"
                      outlineColor="green"
                      activeOutlineColor="green"
                      value={classCode}
                      onChangeText={(text) => setClassCode(text)}
                      style={styles.input}
                    />
                    <Button
                      onPress={joinClass}
                      mode="elevated"
                      style={{ marginTop: 12 }}
                    >
                      Join Class
                    </Button>
                  </Surface>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  padding: {
    // flex: 1,
    width: "91%",
    alignSelf: "center",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // borderColor: "red",
    // borderWidth: 1
  },
  infoView: {
    width: "100%",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // alignSelf: "center",
    // padding: 15,
    // marginTop: 20,
    // marginBottom: 20,
    // backgroundColor: "white",
    // borderColor: "red",
    // borderWidth: 1
  },
  text: {
    // flexDirection: "row",
    // justifyContent: "center",
    // textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    // flex: 1,
    width: "100%",
  }
});