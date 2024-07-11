import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import { RefreshControl } from 'react-native';

export default function MealLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function mealLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("meal_plans")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        }

        mealLog();
    }, [])

    async function mealLog() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (searchQuery === "") {
          const { data, error } = await supabase
            .from("meal_plans")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        } else {
          const { data, error } = await supabase
            .from("meal_plans")
            .select()
            .eq("user", user.id)
            .ilike("activity", `%${searchQuery}%`)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        }
        
      }

      async function deleteItem(id) {
        const { error } = await supabase
          .from("meal_plans")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
        } else {
          mealLog();
        }
      }
    
    

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          onIconPress={mealLog}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={useCallback(({ item }) => (
            <View key={item.id} style={styles.container}>
              <Card
                data={item}
                title={item.meal_type.title}
                col1title={"Item"}
                col2title={"Amount"}
                col3title={"Calories"}
                col1icon={"food"}
                col1={item.item}
                col2icon={"weight"}
                col2={item.amount}
                col3icon={"fire"}
                col3={`${item.calories} cal`}
                date={item.created_at}
                editPage={"Add Meal"}
                deleteAction={() => deleteItem(item.id)}
              />
            </View>
          ))}

          refreshControl={
            <RefreshControl refreshing={false} onRefresh={mealLog} />
          }

          keyExtractor={(item) => item.id}
        />
        <FloatingButton />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});