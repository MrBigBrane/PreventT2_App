import { View, Text, StyleSheet, Pressable, RefreshControl } from "react-native";
import { Button } from "react-native-paper";
import CoachesClassCard from "../../components/CoachClassCard";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FlatList } from "react-native-gesture-handler";
import CoachClassCard from "../../components/CoachClassCard";
import { Searchbar } from 'react-native-paper';
import NewFloatingButton from "../../components/coachesdashboard/NewFloatingButton";

export default function CoachesDashboard({ navigation }) {
    const [data, setData] = useState([]);

    async function getClasses() {
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
          .from('coach_codes')
          .select()
          .eq("coach_user", user.id)
          .order("created_at", { ascending: true });

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
    }

    useEffect(() => {
        getClasses()
    }, [])

    

    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={data}
            renderItem={useCallback(({ item }) => (
              <View key={item.code} style={styles.container}>
                <CoachClassCard
                  classId={item.code}
                  className={item.class_name}
                />
              </View>
            ))}
            keyExtractor={(item) => item.code}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getClasses} />
            }
          />
          
        </View>
        <NewFloatingButton />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      marginTop: 10,
    },
  })