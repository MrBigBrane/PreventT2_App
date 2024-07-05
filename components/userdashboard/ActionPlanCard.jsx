import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, Surface } from 'react-native-paper';
import DialogComponent from '../dialog/Dialog';
import { useNavigation } from '@react-navigation/native';


const LeftContent = (props) => (
  <Avatar.Icon {...props} icon={"account-circle"} />
);

const ActionPlan = ({
  title,
  col1title,
  col2title,
  col3title,
  col1,
  col2,
  col3,
  date,
  data,
  editPage,
  deleteAction,
}) => {
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
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.text} variant="titleMedium">
              {col1title}
            </Text>
            <View style={styles.text}>
              <Text variant="bodySmall">{col1}</Text>
            </View>
          </Surface>
        </View>
        <View style={styles.grouping}>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.text} variant="titleMedium">
              {col2title}
            </Text>
            <View style={styles.text}>
              <Text variant="bodySmall">{col2}</Text>
            </View>
          </Surface>
        </View>
        <View style={styles.grouping}>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.text} variant="titleMedium">
              {col3title}
            </Text>
            <View style={styles.text}>
              <Text variant="bodySmall">{col3}</Text>
            </View>
          </Surface>
        </View>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <Card.Actions>
        <Button onPress={() => navigation.navigate(editPage, { data: data })}>
          Edit
        </Button>
        <DialogComponent
          buttonTitle={"Delete"}
          alertActionTitle={"Delete"}
          alertContent={"Are you sure you want to delete this item?"}
          alertTitle={"Delete Item"}
          alertAction={deleteAction}
        />
      </Card.Actions>
    </Card>
  );
};

export default ActionPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  grouping: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    textAlign: 'center',
  },
  textSpace: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 0,
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
  },
  surface: {
    padding: 8,
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})