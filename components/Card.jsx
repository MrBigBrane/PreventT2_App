import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DialogComponent from './dialog/Dialog';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon={"account-circle"} />
);

export default function UserCard({
  title,
  col1title,
  col2title,
  col3title,
  col1icon,
  col1,
  col2icon,
  col2,
  col3icon,
  col3,
  date,
  data,
  editPage,
  deleteAction
}) {
  const navigation = useNavigation();

  return (
    <Card style={styles.container}>
      {/* <View style={styles.title}> */}
      <Card.Title
        title={title}
        left={LeftContent}
        titleVariant="titleLarge"
        right={() => <Text variant="labelSmall">{date}</Text>}
        rightStyle={styles.date}
      />
      <Card.Content style={styles.textSpace}>
        <View style={styles.grouping}>
          <Text variant="bodyMedium">{col1title}</Text>
          <View style={styles.text}>
            <Icon name={col1icon} size={17} color="grey" marginTop={0}/>
            <Text variant="bodySmall" marginTop={1} marginLeft={2}>{col1}</Text>
          </View>
        </View>
        <View style={styles.grouping}>
          <Text variant="bodyMedium">{col2title}</Text>
          <View style={styles.text}>
            <Icon name={col2icon} size={17} color="grey" marginTop={0}/>
            <Text variant="bodySmall" marginTop={1} marginLeft={3}>{col2}</Text>
          </View>
        </View>
        <View style={styles.grouping}>
          <Text variant="bodyMedium">{col3title}</Text>
          <View style={styles.text}>
            <Icon name={col3icon} size={17} color="grey" marginTop={0}/>
            <Text variant="bodySmall" marginTop={1} marginHorizontal={3}>{col3}</Text>
          </View>
        </View>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <Card.Actions>
        <Button onPress={() => navigation.navigate(editPage, { datum: data })} style={{ flex: 1}}>
          Edit
        </Button>
        <DialogComponent
          buttonTitle={"Delete"}
          alertActionTitle={"Delete"}
          alertContent={"Are you sure you want to delete this item?"}
          alertTitle={"Delete Item"}
          alertAction={deleteAction}
          style={{ flex: 1}}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
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
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -50,
  }
})