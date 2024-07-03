import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddActivity({ navigation }) {
    const [selected1, setSelected1] = useState();
    const [selected2, setSelected2] = useState();
    const [text1, setText1] = useState();
    const [text2, setText2] = useState();

    const [loading, setLoading] = useState(false);

    const exerciseTypes = [
      { "key": 1, value: "Cardio" },
      { "key": 2, value: "Strength" },
      { "key": 3, value: "Balance" },
      { "key": 4, value: "Yoga" },
      { "key": 5, value: "Pilates" },
      { "key": 6, value: "Other" },
      { "key": 7, value: "Core" },
      { "key": 8, value: "HIIT" },
      { "key": 9, value: "Stretching" },
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
          <DropdownList setSelected={setSelected1} data={exerciseTypes} />
        </View>
        <View style={styles.padding}>
          <Text>Duration (in minutes)</Text>
          <TextInput mode="outlined" placeholder="How long was your activity?" onChangeText={(text) => setText2(text)} value={text2} />
        </View>
        <View style={styles.padding}>
          <Text>Perceived Difficulty</Text>
          <DropdownList setSelected={setSelected2} data={perceivedDifficulty} />
        </View>
        <View style={styles.padding}>
            <Button mode="contained" onPress={submit} loading={loading}>Submit</Button>
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