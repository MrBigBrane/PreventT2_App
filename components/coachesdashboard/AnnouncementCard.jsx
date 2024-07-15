import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function AnnouncementCard({ item, classData }) {

    const navigation = useNavigation();

  return (
    <Card style={styles.container} onPress={() => navigation.navigate('View Announcement', { announcementData: item, classData: classData })}>
      <Card.Title
        title={item.title}
        titleVariant="titleLarge"
        right={() => <Text variant="labelSmall">{item.created_at.substring(0, 10)}</Text>}
        rightStyle={styles.date}
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