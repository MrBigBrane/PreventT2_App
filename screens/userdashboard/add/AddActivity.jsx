import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddActivity({ navigation, route }) {
  const { data } = route.params;
  

    const [selected1, setSelected1] = useState(data?.exercise_type);
    const [selected2, setSelected2] = useState(data?.difficulty);
    const [text1, setText1] = useState(data?.activity);
    const [text2, setText2] = useState(data?.minutes.toString());

    const [loading, setLoading] = useState(false);

    const exerciseTypes = [
      { "key": 1, value: "Run" },
      { "key": 2, value: "Walk" },
      { "key": 3, value: "Swim" },
      { "key": 4, value: "Weight Training" },
      { "key": 5, value: "Pilates" },
      { "key": 6, value: "Bike" },
      { "key": 7, value: "Crossfit " },
      { "key": 8, value: "Calisthenics" },
      { "key": 9, value: "Other" },
    ];

    const perceivedDifficulty = [
      { "key": 1, value: "Easy" },
      { "key": 2, value: "Medium" },
      { "key": 3, value: "Difficult" },
    ];

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if(data){
          const { data, error } = await supabase
          .from("activity_log")
          .update({
            activity: text1,
            exercise_type: selected1,
            minutes: parseInt(text2),
            difficulty: selected2,
            user: user.id,
          })
          .eq("id", data?.id)
          .select();
        }
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
          setLoading(false);
        navigation.replace("User Dashboard", { screen: "Activity Log" });
        }

        
    }

    return (
      <View style={styles.spacing}> 
        <View style={styles.padding}>
          <Text>Activity Name</Text>
          <TextInput mode="outlined" placeholder="Enter Activity Name" onChangeText={(text) => setText1(text)} value={text1} />
        </View>
        <View style={styles.padding}>
          <Text>Exercise Type</Text>
          <DropdownList setSelected={setSelected1} data={exerciseTypes} defaultValue={data?.exercise_type} />
        </View>
        <View style={styles.padding}>
          <Text>Duration (in minutes)</Text>
          <TextInput mode="outlined" placeholder="How long was your activity?" onChangeText={(text) => setText2(text)} value={text2} />
        </View>
        <View style={styles.padding}>
          <Text>Perceived Difficulty</Text>
          <DropdownList setSelected={setSelected2} data={perceivedDifficulty} defaultValue={data?.difficulty}/>
        </View>
        <View style={styles.padding}>
            <Button mode="contained" onPress={submit} loading={loading}>{data ? "Update" : "Submit"}</Button>
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