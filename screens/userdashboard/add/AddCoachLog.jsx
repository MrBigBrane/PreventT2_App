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

    const attendanceTypes = [
      { "key": 1, value: "In-Person" },
      { "key": 2, value: "Online" },
      { "key": 3, value: "Distance Learning" },
    ];

    const sessionTypes = [
      { "key": 1, value: "C Core Session" },
      { "key": 2, value: "CM Core Maintenance Session" },
      { "key": 3, value: "OM Ongoing Maintenance Session" },
      { "key": 4, value: "MU-C Make Up Session in Core Phase" },
      { "key": 5, value: "MU-OM Make Up Session in Ongoing Phase" },
      { "key": 6, value: "MU-CM Make Up Session in Core Maintenance Phase" },
    ];

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("lifestyle_coach_log")
          .insert({
            created_at: text1,
            attendance: selected1,
            current_weight: text2,
            sesstype: selected2,
            user: user.id,
          })
          .select();

        if (error) {
          console.log(error);
        } else {
          setLoading(false);
        navigation.replace("User Dashboard", { screen: "Coach Log" });
        }

        
    }

    return (
      <View style={styles.spacing}> 
        <View style={styles.padding}>
          <Text>Date and Time</Text>
          <TextInput mode="outlined" placeholder="MM/DD/YYYY HH:MM:AA" onChangeText={(text) => setText1(text)} value={text1} />
        </View>
        <View style={styles.padding}>
          <Text>Current Weight</Text>
          <TextInput mode="outlined" placeholder="How long was your activity?" onChangeText={(text) => setText2(text)} value={text2} />
        </View>
        <View style={styles.padding}>
          <Text>Attendance</Text>
          <DropdownList setSelected={setSelected1} data={attendanceTypes} />
        </View>
        <View style={styles.padding}>
          <Text>Session Type</Text>
          <DropdownList setSelected={setSelected2} data={sessionTypes} />
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