import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MinutesGraph from '../../../components/graph/MinutesGraph';
import WeightGraph from '../../../components/graph/WeightGraph';
import DialogComponent from '../../../components/dialog/Dialog';
import { supabase } from '../../../lib/supabase';

export default function ViewStudentLanding({navigation, route}) {
    const { studentData, image } = route.params;

    function handleClickLog() {

        navigation.navigate('View Student Logs', { studentData: studentData, image: image });
    }

    function handleClickInfo() {
        navigation.navigate('View Student Info', { studentData: studentData });
    }

    async function removeStudent() {

        const { error } = await supabase
        .from("profiles")
        .update({ class_codes: null })
        .eq("id", studentData.id);

        if (error) {
            console.log(error);
        } else {
            navigation.goBack()
        }
    }

    return (
      <ScrollView style={styles.container}>
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
        <View>
          <DialogComponent
          buttonTitle={"Remove Student"}
          alertTitle={"Removing Student"}
          alertContent={"Are you sure you want to remove this student?"}
          alertAction={removeStudent}
          alertActionTitle={"Remove"}
          buttonStyle={{ backgroundColor: "red" }}
          style={{ margin: 10, marginBottom: 60, }}

        />
        </View>
        
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
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
    flex: 1
  }
});