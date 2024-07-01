import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';

export default function ActivityLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        async function activityLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("lifestyle_coach_log")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            console.log(data[0].created_at)
            let date = new Date(data[0].created_at)
            console.log(date)
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
            .from("lifestyle_coach_log")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        } else {
            // Fix on the backend so there is new column that is date as a string not a date
            let date = new Date(searchQuery)
            console.log(typeof(date))

          const { data, error } = await supabase
            .from("lifestyle_coach_log")
            .select()
            .eq("user", user.id)
            .rangeGte('created_at', `[${date}, ${date.setDate(date.getDate() + 1)})`)
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
          placeholder="Search by Date (YYYY-MM-DD)"
          onChangeText={setSearchQuery}
          onIconPress={activityLog}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={useCallback(({ item }) => (
            <View key={item.id} style={styles.container}>
              <Card
                title={`Week of ${item.created_at}`}
                col1title={"Current Weight"}
                col2title={"Attendance"}
                col3title={"Session Type"}
                col1={item.current_weight}
                col2={item.attendance}
                col3={item.sesstype}
                date={item.created_at}
              />
            </View>
          ))}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});