import { supabase } from '../../lib/supabase'
import { RefreshControl, StyleSheet, View } from "react-native";
import Card from '../../components/Card'
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import FloatingButton from '../../components/userdashboard/FloatingButton';
import WeightGraph from '../../components/graph/WeightGraph';

export default function CoachLog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [userAvatar, setUserAvatar] = useState('');

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        coachLog();
    }, [])

    async function coachLog() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (searchQuery === "") {
        const { data, error } = await supabase
          .from("lifestyle_coach_log")
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
        // Fix on the backend so there is new column that is date as a string not a date

        const { data, error } = await supabase
          .from("lifestyle_coach_log")
          .select()
          .eq("user", user.id)
          .ilike("created_at_string", `%${searchQuery}%`);

        if (error) {
          console.log(error);
        } else {
          setData(data);
        }
      }
    }

      async function deleteItem(id) {
        const { error } = await supabase
          .from("lifestyle_coach_log")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
        } else {
          coachLog();
        }
      }
    
    

    return (
      <View style={styles.container}>
        {/* {user.id && <WeightGraph user={user} />} */}
        <Searchbar
          placeholder="Search by Date (YYYY-MM-DD)"
          onChangeText={setSearchQuery}
          onIconPress={coachLog}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={useCallback(({ item }) => {
            let sessType;
            if (item.sesstype.title.includes("-")) {
              sessType = item.sesstype.title.substring(0, 4);
            } else {
              sessType = item.sesstype.title.substring(0, 2).replace(/\s/g, "");
            }

            return (
              <View key={item.id} style={styles.container}>
                <Card
                  data={item}
                  title={`Week of ${item.created_at.substring(0, 10)}`}
                  col1title={"Current Weight"}
                  col2title={"Attendance"}
                  col3title={"Session Type"}
                  col1={item.current_weight}
                  col1icon={"weight"}
                  col2icon={item.attendance.icon}
                  col2={item.attendance.title}
                  col3icon={item.sesstype.icon}
                  col3={sessType}
                  date={item.created_at.substring(0, 10)}
                  editPage={"Add Coach Log"}
                  deleteAction={() => deleteItem(item.id)}
                  hideDate={true}
                  avatar={userAvatar}
                />
              </View>
            );
          })}
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