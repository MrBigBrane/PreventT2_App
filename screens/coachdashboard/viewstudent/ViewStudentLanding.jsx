import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MinutesGraph from '../../../components/graph/MinutesGraph';
import WeightGraph from '../../../components/graph/WeightGraph';

export default function ViewStudentLanding({navigation, route}) {
    const { studentData, image } = route.params;

    function handleClickLog() {

        navigation.navigate('View Student Logs', {studentData: studentData, image: image});
    }

    function handleClickInfo() {
        navigation.navigate('View Student Info');
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text>View Student Landing</Text> */}
        <View style={{ flexDirection: "row" }}>
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
        <View style={styles.graphs}>
          {studentData.id && (
            <MinutesGraph user={studentData} coachView={true} />
          )}
          {studentData.id && (
            <WeightGraph user={studentData} coachView={true} />
          )}
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: 10,
    // margin: "10%",
    // width: "80%",
    // padding: 10,
    flex: 1,
    marginBottom: 20,
  },
  labelButton: {
    textAlignment: "center",
  },
  graphs: {
    width: "100%",
  }
});