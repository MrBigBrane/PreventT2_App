import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import DialogComponent from "../../components/dialog/Dialog";
import { supabase } from "../../lib/supabase";
import ComposeFloatingButton from "../../components/announcements/ComposeFloatingButton";

export default function ViewAnnouncement({ navigation, route }) {

    const { announcementData, classData } = route.params;

    let date = new Date(announcementData.created_at);

    async function deleteAnnouncement() {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", announcementData.id);

      if (error) {
        console.log(error);
      } else {
        navigation.goBack();
      }

    }

    return (
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={styles.date}>{date.toLocaleString()}</Text>
        <Text variant="displaySmall" style={styles.title}>
          {announcementData.title}
        </Text>
        <Text variant="bodyLarge" style={styles.body}>
          {announcementData.message}
        </Text>
        <View style={styles.button}>
          <Button
            mode="contained-tonal"
            onPress={() =>
              navigation.navigate("Edit Announcement", {
                announcementData: announcementData,
              })
            }
            style={{ flex: 1, margin: 8 }}
          >
            Edit
          </Button>
          <DialogComponent
            buttonTitle={"Delete"}
            alertTitle={"Delete Announcement"}
            alertContent={"Are you sure you want to delete this announcement?"}
            alertAction={() => {
              deleteAnnouncement();
            }}
            alertActionTitle={"Delete"}
            mode="contained-tonal"
            style={{ flex: 1, margin: 8 }}
          />
        </View>
        <ComposeFloatingButton />
      </View>
    );
}

const styles = StyleSheet.create({
    date: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})