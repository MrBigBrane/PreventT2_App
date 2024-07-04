import { supabase } from '../../lib/supabase'
import { RefreshControl, StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import Graph from '../../components/graph/Graph';
import fetchWeight from '../../serveractions/graph/fetchWeight';

export default function CoachLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);

    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        async function coachLog() {
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
            setData(data);
            const graph = Array.from(await fetchWeight(user.id))
            setGraphData(graph);
          }
        }

        coachLog();
    }, [])

    async function coachLog() {
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
        {/* {graphData.length > 0 && <Graph xdata={graphData[1]} ydata={[0, 0, 0, 0]} hiddenIndex={graphData[2]} yAxisSuffix={" lbs"}/>}   */}
        <Searchbar
          placeholder="Search by Date (YYYY-MM-DD)"
          onChangeText={setSearchQuery}
          onIconPress={coachLog}
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
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={coachLog} />
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