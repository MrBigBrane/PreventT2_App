import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import ActionPlanCard from '../../components/userdashboard/ActionPlanCard';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';

export default function ActionPlan() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function activityLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("action_plans")
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
            .from("action_plans")
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
            .from("action_plans")
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
          .from("action_plans")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
        } else {
          activityLog();
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
              <ActionPlanCard
                title={`${item.created_at} Action Plan`}
                col1title={"Q1: Routine Change"}
                col2title={"Q2: New Routine"}
                col3title={"Q3: Cue"}
                col1={item.q1}
                col2={item.q2}
                col3={item.q3}
                date={item.created_at}
                editPage={"Add Action Plan"}
                deleteAction={() => deleteItem(item.id)}
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