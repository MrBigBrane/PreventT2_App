import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { supabase } from "../../lib/supabase";


export default function AddClass({ navigation }) {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit() {
      setLoading(true);

      const codes = await supabase.from("coach_codes").select("code");

      let codeList = codes.data.map((code) => code.code);

      console.log(codeList);

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      while (true) {
        for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
       }
       if(!codeList.includes(result)) break;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("coach_codes")
        .insert({
          code: result,
          class_name: text1,
          coachid: text2,
          cohortid: text3,
          orgcode: text4,
          coach_user: user.id,
        })
        .select();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setLoading(false);
      }

      navigation.replace("Coaches Dashboard", { screen: "Class View" });
    }


    return (
        <View style={styles.spacing}> 
        <View style={styles.padding}>
          <Text>Class Name</Text>
          <TextInput mode="outlined" placeholder="Enter Class Name" onChangeText={(text) => setText1(text)} value={text1} />
        </View>
        <View style={styles.padding}>
          <Text>Coach ID</Text>
          {/* <DropdownList setSelected={setSelected1} data={exerciseTypes} defaultValue={data?.exercise_type} /> */}
          {/* <NewDropdownList data={exerciseTypes} setSelected={setSelected1} title={"Exercise Type"} defaultValue={selected1} /> */}
          <TextInput mode="outlined" placeholder="Coach ID (if applicable)" onChangeText={(text) => setText2(text)} value={text3} />
        </View>
        <View style={styles.padding}>
          <Text>Cohort ID</Text>
          <TextInput mode="outlined" placeholder="Cohort ID (if applicable)" onChangeText={(text) => setText3(text)} value={text3} />
        </View>
        <View style={styles.padding}>
          <Text>Org Code</Text>
          {/* <DropdownList setSelected={setSelected2} data={perceivedDifficulty} defaultValue={data?.difficulty}/> */}
          {/* <NewDropdownList data={perceivedDifficulty} setSelected={setSelected2} title={"Perceived Difficulty"} defaultValue={selected2} /> */}
          <TextInput mode="outlined" placeholder="Org Code (if applicable)" onChangeText={(text) => setText4(text)} value={text4} />
        </View>
        <View style={styles.padding}>
            <Button mode="contained" onPress={submit} loading={loading}>Create</Button>
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