import { View, TextInput, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Button, Divider } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import DocumentPicker from "../../components/announcements/DocumentPicker";


export default function AddAnnouncemnt({ navigation, route }) {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setDocument(result);
    }
    };

    const [classData, setClassData] = useState();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [announcementId, setAnnouncementId] = useState(null);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
    const data = route.params;
    setClassData(data.classData)
    if(data.announcementData) {
      setText1(data.announcementData.title)
      setText2(data.announcementData.message)
      setAnnouncementId(data.announcementData.id)
    }

  }, []);

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        let date = new Date();

        const { data, error } = await supabase
          .from("announcements")
          .upsert({
            title: text1,
            message: text2,
            class_code: classData.code,
            user: user.id,
            id: announcementId,
            edited: announcementId ? true : false,
            created_at: date
          })
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setLoading(false);
        }

        navigation.replace("Announcements", { classData: classData });
      }
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Announcement Title"
            style={styles.inputOne}
            maxLength={75}
            onChangeText={(text) => setText1(text)}
            value={text1}
          />
          <Divider />
          <TextInput
            placeholder="Message"
            style={styles.inputTwo}
            multiline
            numberOfLines={5}
            maxLength={500}
            onChangeText={(text) => setText2(text)}
            value={text2}
          />
        </View>
        
        <View style={styles.padding}>
            <DocumentPicker />
            <Button icon="send-circle-outline" contentStyle={styles.buttonContent} mode="contained" onPress={submit} loading={loading}>Send</Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputOne: {
        height: 40,
        margin: 5,
        padding: 10,
    },
    inputTwo: {
        height: "84%",
        margin: 5,
        padding: 10,
    },
    padding: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 10,
        borderTopColor: "gray",
        borderTopWidth: 2,
    },
    buttonContent: {
        flexDirection: "row-reverse",
    },
})