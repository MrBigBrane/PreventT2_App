import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import DateTimePicker from "../../../components/DatePicker";
import NewDropdownList from "../../../components/inputs/NewDropdownList";


export default function AddCoachLog({ navigation, route }) {
const { data } = route.params;
console.log(data)

    const [selected1, setSelected1] = useState(data?.attendance);
    const [selected2, setSelected2] = useState(data?.sesstype);
    const [text1, setText1] = useState(data?.created_at);
    const [text2, setText2] = useState(data?.current_weight.toString());

    const [loading, setLoading] = useState(false);

    const attendanceTypes = [
      { icon: "human-handsdown", title: "In-Person" },
      { icon: "laptop", title: "Online" },
      { icon: "close-box", title: "None" },
    ];

    const sessionTypes = [
      { icon: "google-classroom", title: "C Core Session" },
      { icon: "account-wrench", title: "CM Core Maintenance Session" },
      { icon: "account-wrench", title: "OM Ongoing Maintenance Session" },
      { icon: "google-classroom", title: "MU-C Make Up Session in Core Phase" },
      { icon: "account-wrench", title: "MU-OM Make Up Session in Ongoing Phase" },
      { icon: "account-wrench", title: "MU-CM Make Up Session in Core Maintenance Phase" },
    ];

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if(data){
          const { data, error } = await supabase
          .from("lifestyle_coach_log")
          .update({
            created_at: text1,
            attendance: selected1,
            current_weight: text2,
            sesstype: selected2,
            user: user.id,
          })
          .eq("id", data?.id)
          .select();
        } else {
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
        }
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
          {/* <TextInput
            mode="outlined"
            placeholder="MM/DD/YYYY HH:MM:AA"
            right={
              <TextInput.Icon
                icon="calendar"
                
              />
            }
            onChangeText={(text) => setText1(text)}
            value={text1}
          /> */}
          <DateTimePicker setInputDate={setText1} value={text1} />
        </View>
        <View style={styles.padding}>
          <Text>Current Weight</Text>
          <TextInput
            mode="outlined"
            placeholder="Current Weight"
            onChangeText={(text) => setText2(text)}
            left={<TextInput.Icon icon="weight" />}
            value={text2}
          />
        </View>
        <View style={styles.padding}>
          <Text>Attendance</Text>
          {/* <DropdownList setSelected={setSelected1} data={attendanceTypes} /> */}
          <NewDropdownList data={attendanceTypes} setSelected={setSelected1} title={"Attendance"} defaultValue={selected1} />
        </View>
        <View style={styles.padding}>
          <Text>Session Type</Text>
          {/* Change this so it supports the new select component */}
          <NewDropdownList setSelected={setSelected2} data={sessionTypes} title={"Session Type"} defaultValue={selected2} />
        </View>
        <View style={styles.padding}>
          <Button mode="contained" onPress={submit} loading={loading}>
            Submit
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
    },
    
})