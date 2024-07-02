import { supabase } from '../../lib/supabase'
import { RefreshControl, StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';

export default function ActivityLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        async function activityLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("activity_log")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
          setRefreshing(false);
        }

        activityLog();
    }, [])

    async function activityLog() {
      setRefreshing(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (searchQuery === "") {
          const { data, error } = await supabase
            .from("activity_log")
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
            .from("activity_log")
            .select()
            .eq("user", user.id)
            .ilike("activity", `%${searchQuery}%`)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
            setRefreshing(false);
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
                title={item.activity}
                col1title={"Exercise Type"}
                col2title={"Duration"}
                col3title={"Difficulty"}
                col1={item.exercise_type}
                col2={`${item.minutes} min`}
                col3={item.difficulty}
                date={`${item.created_at.substring(0, 10)}`}
              />
            </View>
          ))}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={activityLog} />
          }
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
