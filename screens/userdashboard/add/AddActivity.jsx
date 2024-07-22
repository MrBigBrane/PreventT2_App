import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import NewDropdownList from "../../../components/inputs/NewDropdownList";

export default function AddActivity({ navigation, route }) {
  const activityData = route ? route.params : null
  let datum = activityData ? activityData.datum : null
  

    const [selected1, setSelected1] = useState(datum?.exercise_type);
    const [selected2, setSelected2] = useState(datum?.difficulty);
    const [text1, setText1] = useState(datum?.activity);
    const [text2, setText2] = useState(datum?.minutes.toString());

    const [loading, setLoading] = useState(false);

    const exerciseTypes = [
      { icon: "run", title: "Run" },
      { icon: "walk", title: "Walk" },
      { icon: "swim", title: "Swim" },
      { icon: "weight", title: "Weight Training" },
      { icon: "yoga", title: "Pilates" },
      { icon: "bike", title: "Bike" },
      { icon: "jump-rope", title: "Crossfit" },
      { icon: "human", title: "Calisthenics" },
      { icon: "adjust", title: "Other" },
    ]


    const perceivedDifficulty = [
      { icon: "human-handsdown", title: "Easy" },
      { icon: "human", title: "Medium" },
      { icon: "human-handsup", title: "Difficult" },
    ]

    async function submit() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (datum) {
        console.log(datum.id);
        const { data, error } = await supabase
          .from("activity_log")
          .update({
            activity: text1,
            exercise_type: selected1,
            minutes: text2,
            difficulty: selected2,
            user: user.id,
          })
          .eq("id", datum?.id)
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setLoading(false);
        }
      } else {
        const { data, error } = await supabase
          .from("activity_log")
          .insert({
            activity: text1,
            exercise_type: selected1,
            minutes: text2,
            difficulty: selected2,
            user: user.id,
          })
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setLoading(false);
        }
      }

      navigation.replace("User Dashboard", { screen: "Activity Log" });
    }

    return (
      <View style={styles.spacing}>
        <View style={styles.padding}>
          <Text>Activity Name</Text>
          <TextInput
            mode="outlined"
            placeholder="Enter Activity Name"
            onChangeText={(text) => setText1(text)}
            value={text1}
          />
        </View>
        <View style={styles.padding}>
          <Text>Exercise Type</Text>
          {/* <DropdownList setSelected={setSelected1} data={exerciseTypes} defaultValue={data?.exercise_type} /> */}
          <View style={{ marginBottom: 50 }}>
            <NewDropdownList
              data={exerciseTypes}
              setSelected={setSelected1}
              title={"Exercise Type"}
              defaultValue={selected1}
            />
          </View>
        </View>
        <View style={styles.padding}>
          <Text>Duration (in minutes)</Text>
          <TextInput
            mode="outlined"
            placeholder="How long was your activity?"
            onChangeText={(text) => setText2(text)}
            value={text2}
          />
        </View>
        <View style={styles.padding}>
          <Text>Perceived Difficulty</Text>
          {/* <DropdownList setSelected={setSelected2} data={perceivedDifficulty} defaultValue={data?.difficulty}/> */}
          <View style={{ marginBottom: 50 }}>
            <NewDropdownList
              data={perceivedDifficulty}
              setSelected={setSelected2}
              title={"Perceived Difficulty"}
              defaultValue={selected2}
            />
          </View>
        </View>
        <View style={styles.padding}>
          <Button mode="contained" onPress={submit} loading={loading}>
            {datum ? "Update" : "Submit"}
          </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    spacing: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    padding: {
        padding: 10
    }
})