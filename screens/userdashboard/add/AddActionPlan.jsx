import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddActivity({ navigation, route }) {
const actionData = route ? route.params : null;
let datum = actionData ? actionData.datum : null

    const [text1, setText1] = useState(datum ? datum?.q1 : null);
    const [text2, setText2] = useState(datum ? datum?.q2 : null);
    const [text3, setText3] = useState(datum ? datum?.q3 : null);

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
        if(datum){
          const { data, error } = await supabase
          .from("action_plans")
          .update({
            q1: text1,
            q2: text2,
            q3: text3,
            user: user.id,
          })
          .eq("id", datum?.id)
          .select();
          if (error) {
            console.log(error);
          } else {
            setLoading(false);
          navigation.replace("User Dashboard", { screen: "Coach Log" });
          }
        } else {
        const { data, error } = await supabase
          .from("action_plans")
          .insert({
            q1: text1,
            q2: text2,
            q3: text3,
            user: user.id,
          })
          .select();

        if (error) {
          console.log(error);
        } else {
          setLoading(false);
        
        }}

        navigation.replace("User Dashboard", { screen: "Action Plan" });
    }

    return (
      <ScrollView style={styles.spacing}> 
        <View style={styles.padding}>
          <Text>Question 1: What routine do you want to add, stop, or change?</Text>
          <TextInput mode="outlined" placeholder="Routine Change" onChangeText={(text) => setText1(text)} value={text1} multiline={true} />
        </View>
        <View style={styles.padding}>
          <Text>Question 2: What new routine do I want to try?</Text>
          <TextInput mode="outlined" placeholder="New Routine" onChangeText={(text) => setText2(text)} value={text2} multiline={true} />
        </View>
        <View style={styles.padding}>
          <Text>Question 3: What cue will help me remember my new routine</Text>
          <TextInput mode="outlined" placeholder="Cues" onChangeText={(text) => setText3(text)} value={text3} multiline={true} />
        </View>
        <View style={styles.padding}>
            <Button mode="contained" onPress={submit} loading={loading}>
              {datum ? "Update" : "Submit"}
            </Button>
        </View>
      </ScrollView>
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