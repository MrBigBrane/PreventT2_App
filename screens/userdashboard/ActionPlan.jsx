import { supabase } from '../../lib/supabase'
import { StyleSheet, View } from "react-native";
import ActionPlanCard from '../../components/userdashboard/ActionPlanCard';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import { RefreshControl } from 'react-native';

export default function ActionPlan() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [userAvatar, setUserAvatar] = useState('');
    const [counter, setCounter] = useState(0);

    

    async function actionPlan() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (searchQuery === "") {
          const { data, error } = await supabase
            .from("action_plans")
            .select()
            .eq("user", user.id)
            .order("created_at", { ascending: false });

            if(counter === 0) {
              setCounter(1);

            const avatar = await supabase
            .from("profiles")
            .select("avatar_path")
            .eq("id", user.id)

          const image = await supabase
            .storage
            .from("user_avatars")
            .getPublicUrl(avatar.data[0].avatar_path)

            setUserAvatar(image.data.publicUrl);
          }

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
          actionPlan();
        }
      }
    
    useEffect(() => {
      actionPlan();
    }, []);

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          onIconPress={actionPlan}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={useCallback(({ item }) => (
            <View key={item.id} style={styles.container}>
              <ActionPlanCard
                data={item}
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
                avatar={userAvatar}
              />
            </View>
          ))}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={actionPlan} />
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