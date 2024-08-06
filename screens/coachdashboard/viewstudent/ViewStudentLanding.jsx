import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function ViewStudentLanding({navigation, route}) {
    // const { studentData } = route.params;

    function handleClickLog() {

        navigation.navigate('View Student Logs');
    }

    function handleClickInfo() {
        navigation.navigate('View Student Info');
    }
    return (
      <View style={styles.container}>
        {/* <Text>View Student Landing</Text> */}
        <Button
          mode="elevated"
          style={styles.buttons}
          labelStyle={styles.labelButton}
        >
          Data Graphs
        </Button>
        <Button
          mode="elevated"
          style={styles.buttons}
          labelStyle={styles.labelButton}
          onPress={handleClickLog}
        >
          Personal Logs
        </Button>
        <Button
          mode="elevated"
          style={styles.buttons}
          labelStyle={styles.labelButton}
          onPress={handleClickInfo}
        >
          Student Info
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: "10%",
    width: "80%",
    padding: 10,
  },
  labelButton: {
    textAlignment: "center",
  },
});