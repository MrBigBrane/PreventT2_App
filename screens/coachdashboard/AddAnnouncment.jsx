import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, Divider } from "react-native-paper";
import DocumentPicker from "../../components/announcements/DocumentPicker";


export default function AddAnnouncemnt() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit() {
        const { data, error } = await supabase
          .from("announcements")
          .insert({
            title: text1,
            message: text2,
          })
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Announcement Title"
            style={styles.input}
            maxLength={75}
            onChangeText={(text) => setText1(text)}
            value={text1}
          />
          <Divider />
          <TextInput
            placeholder="Message"
            style={styles.input}
            multiline
            maxLength={500}
            onChangeText={(text) => setText2(text)}
            value={text2}
          />
        </View>
        
        <View style={styles.padding}>
            <DocumentPicker />
            <Button icon="send-circle-outline" mode="contained" onPress={submit} loading={loading}>Send</Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
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
    }
})