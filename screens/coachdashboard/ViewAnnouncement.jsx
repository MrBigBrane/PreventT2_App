import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function ViewAnnouncement({ navigation, route }) {

    const { announcementData } = route.params;

    let date = new Date(announcementData.created_at);

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
            style={{flex: 1, margin: 8}}
          >
            Edit
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() =>
              navigation.navigate("Delete Announcement", {
                announcementData: announcementData,
              })
            }
            style={{flex: 1 , margin: 8}}
          >
            Delete
          </Button>
        </View>
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