import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function AnnouncementCard({ item, classData }) {

    const navigation = useNavigation();
    console.log(item.edited ? true : false)

    function EditText() {
      return <Text variant="labelSmall">Edited</Text>
    }


  return (
    <Card
      style={styles.container}
      onPress={() =>
        navigation.navigate("View Announcement", {
          announcementData: item,
          classData: classData,
        })
      }
    >
      {/* <View style={{ flexDirection: 'row' }}> */}

      {/* <Card.Title title={item.created_at.substring(0, 10)} titleVariant="titleSmall" /> */}
      {/* </View> */}
      <Text titleVariant="titleSmall" style={{ marginLeft: 10, marginTop: 5 }}>
        {item.created_at.substring(0, 10)} {item.edited && `• Edited`}
      </Text>
      <Card.Title
        title={item.title}
        titleVariant="titleLarge"
      />

      <Card.Content>
        <Text variant="bodyMedium">{item.message}</Text>
      </Card.Content>
      <Card.Actions>
        {/* <Button>Edit</Button>
        <Button>Delete</Button> */}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 6,
    },
    date: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: -50,
    }
  })