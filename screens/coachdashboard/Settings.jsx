import { Button, Text, TextInput, Surface, Divider } from 'react-native-paper';
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import PickPhoto from '../../components/pickphoto/PickPhoto';
import { supabase } from '../../lib/supabase';
import DialogComponent from '../../components/dialog/Dialog';

export default function Settings({ navigation, route }) {
    const { classData, backgroundUri } = route.params;

    const [loading, setLoading] = useState(false);
    const [locked, setLocked] = useState(true);
    const [text1, setText1] = useState(classData.class_name);
    const [text2, setText2] = useState(classData.coachid ? classData.coachid : "N/A");
    const [text3, setText3] = useState(classData.cohortid ? classData.cohortid : "N/A");
    const [text4, setText4] = useState(classData.orgcode ? classData.orgcode : "N/A");
    const [text5, setText5] = useState(classData.meet_link ? classData.meet_link : "N/A");



    function handleLock() {
        setLocked(!locked);
    }

    async function handleLoading() {
      setLoading(true);

      const { data, error } = await supabase
        .from("coach_codes")
        .update({
          class_name: text1,
          coachid: text2,
          cohortid: text3,
          orgcode: text4
        })
        .eq("code", classData.code);

        setLoading(false);
        setLocked(true);

        if (error) {
          console.log(error);
          console.log('hey')
        } 
    }

    async function handleDelete() {
      console.log('yo')
      setLoading(true);
      const { data, error } = await supabase
        .from("coach_codes")
        .delete()
        .eq("code", classData.code)
        .select();
        if (error) {
          console.log(error);
        } 
        else {
          setLoading(false);
          console.log(data)
          navigation.replace("Coaches Dashboard");
        }
    }


    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1 }}>
          <PickPhoto classData={classData} backgroundUri={backgroundUri} />
        </View>

        {/* <Surface style={styles.surface} elevation={4}> */}
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Class Name"
              // label={"Class Name"}
              onChangeText={(text) => setText1(text)}
              value={text1}
              disabled={locked}
              maxLength={15}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Coach ID"
              // label={"Coach ID"}
              onChangeText={(text) => setText2(text)}
              value={text2}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Cohort ID"
              // label={"Cohort ID"}
              onChangeText={(text) => setText3(text)}
              value={text3}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Organization Code"
              // label={"Organization Code"}
              onChangeText={(text) => setText4(text)}
              value={text4}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Class Meeting Link"
              // label={"Meeting Link"}
              onChangeText={(text) => setText5(text)}
              value={text5}
              disabled={locked}
            />
          </View>
          <View style={styles.buttons}>
            {locked ? (
              <Button
                mode="elevated"
                icon={"circle-edit-outline"}
                onPress={() => setLocked(!locked)}
                style={{ marginBottom: 15, margin: 10 }}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  mode="elevated"
                  onPress={handleLoading}
                  loading={loading}
                  style={{ marginBottom: 15, margin: 10 }}
                >
                  Save
                </Button>
                <Button
                  mode="elevated"
                  onPress={() => setLocked(!locked)}
                  style={{ marginBottom: 15, margin: 10 }}
                >
                  Cancel
                </Button>
              </>
            )}
          </View>

          <Divider style={{ width: "100%" }} bold />
          {/* <Button
            mode="outlined"
            onPress={() => console.log("Delete class")}
            textColor="red"
            style={{ borderColor: "red", marginTop: 15, marginBottom: 15 }}
          >
            Remove Class
          </Button> */}
          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}> */}
          <DialogComponent
            mode={"outlined"}
            // icon={"trash-can-outline"}
            buttonTitle="Delete Class"
            alertTitle={"Are you sure you want to remove this class?"}
            alertContent={"This cannot be undone."}
            alertAction={handleDelete}
            alertActionTitle={"Remove"}
            style={{ marginTop: 15, marginBottom: 15 }}
            buttonStyle={{ borderColor: "red" }}
            textColor={"red"}
          />
          {/* </View> */}
        {/* </Surface> */}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    surface: {
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    spacing: {
      padding: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      width: Dimensions.get('window').width * 0.8,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }

  });
