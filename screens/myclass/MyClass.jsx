import { useLayoutEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { supabase } from "../../lib/supabase";

export default function MyClass() {
  const [data, setData] = useState([]);
  const [joinTime, setJoinTime] = useState("");
  const [isData , setIsData] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [inClass, setInClass] = useState('');
  const [image, setImage] = useState();

    async function getInClass() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);

        setJoinTime(data[0].joined_class_at);

        if (error) {
          console.log(error);
        } else {
          setInClass(data[0].class_codes);
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
              setData(coachCodes.data[0]);
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
      setInClass(true)
      console.log(data);
      getInClass();
    }
  }

  useLayoutEffect(() => {
    getInClass();
  }, []);

    return (
      <View style={styles.container}>
        {isData && (
          <View style={styles.container}>
            {inClass ? (
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
                      bottom: 40,
                      left: 10,
                    }}
                  >
                    {data.class_name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "white",
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                    }}
                  >
                    Joined at: {joinTime.substring(0, 10)}
                  </Text>
                </View>
                <Button
                  onPress={() => console.log("announcements")}
                  mode="contained"
                  style={{ margin: 10 }}
                >
                  Announcements
                </Button>

                <Button
                  onPress={() => console.log("exercise plan")}
                  mode="contained"
                  style={{ margin: 10 }}
                >
                  Exercise Plan
                </Button>
                <Surface style={styles.padding}>
                  <Text>Meeting Link</Text>
                  <Text style={{ marginBottom: 12 }}>{data.meet_link}</Text>
                  <Text>Class Code</Text>
                  <Text>{data.code}</Text>
                </Surface>
                <Button
                  onPress={() => console.log("leaving class")}
                  mode="contained"
                  style={{ margin: 10 }}
                >
                  Leave Class
                </Button>
              </View>
            ) : (
              <View style={styles.container}>
                <View style={styles.padding}>
                  <Text>Enter Class Code</Text>
                  <TextInput
                    placeholder="Class Code"
                    value={classCode}
                    onChangeText={setClassCode}
                  />
                  <Button
                    onPress={joinClass}
                    mode="contained"
                    style={{ marginTop: 12 }}
                  >
                    Join Class
                  </Button>
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
    padding: 30,
    width: Dimensions.get("window").width
  },
});