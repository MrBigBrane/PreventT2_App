import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';

export default function MealLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function activityLog() {
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

        activityLog();
    }, [])

    async function activityLog() {
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
    
    

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          onIconPress={activityLog}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={useCallback(({ item }) => (
            <View key={item.id} style={styles.container}>
              <Card
                title={item.meal_type}
                col1title={"Item"}
                col2title={"Amount"}
                col3title={"Calories"}
                col1={item.item}
                col2={item.amount}
                col3={item.calories}
                date={item.created_at}
              />
            </View>
          ))}
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