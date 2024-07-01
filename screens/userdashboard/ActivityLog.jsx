import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export default function ActivityLog() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function activityLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { data, error } = await supabase
            .from("activity_log")
            .select()
            .eq("user", user.id);

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        }

        activityLog();
    }, [])
    
    

    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.container}>
              <Card
                title={item.activity}
                col1={item.activity}
                col2={item.minutes}
                col3={item.difficulty}
                date={item.created_at}
              />
            </View>
          )}
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
