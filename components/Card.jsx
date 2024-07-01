import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon={"account-circle"} />
);

const MyComponent = ({ title, col1, col2, col3, date }) => (
  <Card style={styles.container}>
    <Card.Title title={title} left={LeftContent} titleVariant="titleLarge" />
    <Card.Content style={styles.textSpace}>
      <View style={styles.grouping}>
        <Text variant="bodyMedium">Exercise Type</Text>
        <View style={styles.text}>
          <Text variant="bodySmall">{col1}</Text>
        </View>
      </View>
      <View style={styles.grouping}>
        <Text variant="bodyMedium">Duration</Text>
        <View style={styles.text}>
          <Text variant="bodySmall">{col2}</Text>
        </View>
      </View>
      <View style={styles.grouping}>
        <Text variant="bodyMedium">Perceived Difficulty</Text>
        <View style={styles.text}>
          <Text variant="bodySmall">{col3}</Text>
        </View>
      </View>
    </Card.Content>
    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    <Card.Actions>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Card.Actions>
  </Card>
);

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  grouping: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  textSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  }
})