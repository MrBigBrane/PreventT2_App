import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
//import DropdownList from "../../../components/inputs/DropdownList";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import NewDropdownList from "../../../components/inputs/NewDropdownList";
import DateTimePicker from "../../../components/DatePicker";

export default function AddMeal({ navigation, route }) {
  const  mealData = route ? route.params : null;
  let datum = mealData ? mealData.datum : null

    const [selected1, setSelected1] = useState(datum ? datum?.meal_type : null);
    const [text1, setText1] = useState(datum ? datum?.item : null);
    const [text2, setText2] = useState(datum ?datum?.amount.toString() : null);
    const [text3, setText3] = useState(datum ? datum?.calories.toString() : null);
    const [text4, setText4] = useState(datum ? datum?.created_at : null);

    const [loading, setLoading] = useState(false);

    const mealTypes = [
      { icon: "coffee", title: "Breakfast" },
      { icon: "hamburger", title: "Lunch" },
      { icon: "silverware-fork-knife", title: "Dinner" },
      { icon: "food-fork-drink", title: "Snack" },
      { icon: "bottle-wine", title: "Drink"},
      { icon: "food-variant", title: "Other" },

    ];

    async function submit() {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if(datum){
          const { data, error } = await supabase
          .from("meal_plans")
          .update({
            created_at: text4,
            meal_type: selected1,
            item: text1,
            amount: text2,
            calories: text3,
            user: user.id,
          })
          .eq("id", datum?.id)
          .select();
        } else {
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
        
        }
      }

        navigation.replace("User Dashboard", { screen: "Meal Log" });
    }

    return (
      <View style={styles.spacing}>
        <View style={styles.padding}>
          <Text>Date and Time</Text>
          {/* <TextInput
            mode="outlined"
            placeholder="MM/DD/YYYY HH:MM:AA"
            onChangeText={(text) => setText4(text)}
            value={text4}
          /> */}
          <DateTimePicker setInputDate={setText4} value={text4} />
        </View>
        <View style={styles.padding}>
          <Text>Meal Type</Text>
          <NewDropdownList setSelected={setSelected1} data={mealTypes} title={"Meal Type"} defaultValue={selected1} />
        </View>
        <View style={styles.padding}>
          <Text>Item</Text>
          <TextInput
            mode="outlined"
            placeholder="Item"
            onChangeText={(text) => setText1(text)}
            value={text1}
            left={<TextInput.Icon icon="food" />}
          />
        </View>
        <View style={styles.padding}>
          <Text>Amount</Text>
          <TextInput
            mode="outlined"
            placeholder="Amount"
            onChangeText={(text) => setText2(text)}
            value={text2}
            left={<TextInput.Icon icon="weight" />}
          />
        </View>
        <View style={styles.padding}>
          <Text>Calories</Text>
          <TextInput
            mode="outlined"
            placeholder="Calories"
            onChangeText={(text) => setText3(text)}
            value={text3}
            left={<TextInput.Icon icon="fire" />}
          />
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