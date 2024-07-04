import { supabase } from '../../lib/supabase'
import { RefreshControl, StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar, Text } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import Graph from '../../components/graph/Graph';
import fetchMinutes from '../../serveractions/graph/fetchMinutes';
import NewGraph from '../../components/graph/NewGraph';

export default function ActivityLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);

    const [refreshing, setRefreshing] = useState(true);

    useLayoutEffect(() => {
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

          const graph = Array.from(await fetchMinutes(user.id))
          console.log(graph)
          setGraphData(graph);

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
        {/* {graphData.length > 0 && <Graph xdata={graphData[1]} ydata={graphData[0]} yAxisSuffix={" min"}/>}  */}
        {graphData.length > 0 && <NewGraph datum={graphData} />}
        <Searchbar
          placeholder="Search by activity"
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
