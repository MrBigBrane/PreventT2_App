import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddActivity({ navigation }) {
    const [selected1, setSelected1] = useState();
    const [text1, setText1] = useState();
    const [text2, setText2] = useState();
    const [text3, setText3] = useState();
    const [text4, setText4] = useState();

    const [loading, setLoading] = useState(false);

    const mealTypes = [
      { "key": 1, value: "Breakfast" },
      { "key": 2, value: "Lunch" },
      { "key": 3, value: "Dinner" },
      { "key": 4, value: "Snack" },

    ];

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("meal_plans")
          .insert({
            created_at: text4,
            item: text1,
            meal_type: selected1,
            amount: text2,
            calories: text3,
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
          <Text>Date and Time</Text>
          <TextInput
            mode="outlined"
            placeholder="MM/DD/YYYY HH:MM:AA"
            onChangeText={(text) => setText4(text)}
            value={text4}
          />
        </View>
        <View style={styles.padding}>
          <Text>Meal Type</Text>
          <DropdownList setSelected={setSelected1} data={mealTypes} />
        </View>
        <View style={styles.padding}>
          <Text>Item</Text>
          <TextInput
            mode="outlined"
            placeholder="Item"
            onChangeText={(text) => setText1(text)}
            value={text1}
          />
        </View>
        <View style={styles.padding}>
          <Text>Amount</Text>
          <TextInput
            mode="outlined"
            placeholder="Amount"
            onChangeText={(text) => setText2(text)}
            value={text2}
          />
        </View>
        <View style={styles.padding}>
          <Text>Calories</Text>
          <TextInput
            mode="outlined"
            placeholder="Calories"
            onChangeText={(text) => setText3(text)}
            value={text3}
          />
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
    }
})