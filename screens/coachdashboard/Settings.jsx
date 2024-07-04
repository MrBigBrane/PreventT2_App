import { Button, Text, TextInput, Surface, Divider } from 'react-native-paper';
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions, StyleSheet, View } from 'react-native';

export default function Settings({ navigation, route }) {
    const { classData } = route.params;

    const [loading, setLoading] = useState(false);
    const [locked, setLocked] = useState(true);
    const [text1, setText1] = useState(classData.class_name);
    const [text2, setText2] = useState(classData.coachid ? classData.coachid : "N/A");
    const [text3, setText3] = useState(classData.cohortid ? classData.cohortid : "N/A");
    const [text4, setText4] = useState(classData.orgcode ? classData.orgcode : "N/A");



    function handleLock() {
        setLocked(!locked);
    }

    function handleLoading() {
      setLoading(true);
    }


    return (
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={4}>
          <Icon
            name="lock"
            size={24}
            color="black"
            style={styles.lock}
            onPress={handleLock}
          />
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Class Name"
              label={"Class Name"}
              onChangeText={(text) => setText1(text)}
              value={text1}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Coach ID"
              label={"Coach ID"}
              onChangeText={(text) => setText2(text)}
              value={text2}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Cohort ID"
              label={"Cohort ID"}
              onChangeText={(text) => setText3(text)}
              value={text3}
              disabled={locked}
            />
          </View>
          <View style={styles.spacing}>
            <TextInput
              mode="outlined"
              placeholder="Enter Organization Code"
              label={"Organization Code"}
              onChangeText={(text) => setText4(text)}
              value={text4}
              disabled={locked}
            />
          </View>
          {!locked && (
            <Button mode="contained" onPress={handleLoading} loading={loading} style={{ marginBottom: 15 }}>
              Save
            </Button>
          )}
          <Divider style={{ width: "100%" }} bold />
          <Button
            mode="outlined"
            onPress={() => console.log("Delete class")}
            textColor="red"
            style={{ borderColor: "red", marginTop: 15 }}
          >
            Remove Class
          </Button>
        </Surface>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    surface: {
      padding: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    spacing: {
      padding: 40,
      paddingHorizontal: 60,
      width: Dimensions.get('window').width * 0.8,
    },
    lock: {
      position: 'absolute',
      right: 15,
      top: 15,
    }

  });