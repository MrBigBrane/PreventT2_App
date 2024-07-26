import { supabase } from '../../lib/supabase'
import { RefreshControl, StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar, Text } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import NewGraph from '../../components/graph/MinutesGraph';

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [counter, setCounter] = useState(0);

  async function activityLog() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);

    if (searchQuery === "") {
      const { data, error } = await supabase
        .from("activity_log")
        .select()
        .eq("user", user.id)
        .order("created_at", { ascending: false });

      if (counter === 0) {
        setCounter(1);

        const avatar = await supabase
          .from("profiles")
          .select("avatar_path")
          .eq("id", user.id);

        const image = await supabase.storage
          .from("user_avatars")
          .getPublicUrl(avatar.data[0].avatar_path);

        setUserAvatar(image.data.publicUrl);
      }

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
      }
    }
  }

  async function deleteItem(id) {
    const { error } = await supabase.from("activity_log").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      activityLog();
    }
  }

  useLayoutEffect(() => {
    activityLog();
  }, []);

  return (
    <View style={styles.container}>
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
              col1={item.exercise_type?.title}
              col1icon={item.exercise_type?.icon}
              col2={`${item.minutes} min`}
              col2icon={"timer-outline"}
              col3={item.difficulty?.title}
              col3icon={item.difficulty?.icon}
              date={`${item.created_at.substring(0, 10)}`}
              data={item}
              editPage={"Add Activity"}
              deleteAction={() => deleteItem(item.id)}
              avatar={userAvatar}
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
