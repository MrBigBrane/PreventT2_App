import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { RefreshControl } from 'react-native';

export default function ViewStudentLogs({ route, navigation }) {
    // const { studentData } = route.params;


    const [data, setData] = useState([]);
    // const [user, setUser] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    async function coachLog() {
        const {
            data: { user },
          } = await supabase.auth.getUser();
          // setUser(user);
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

          const { data, error } = await supabase
            .from("lifestyle_coach_log")
            .select()
            .eq("user", user.id)
            .ilike("created_at_string", `%${searchQuery}%`)

          if (error) {
            console.log(error);
          } else {
            setData(data);
          }
        }
        
      }

    useEffect(() => {
        async function coachLog() {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          // setUser(user);
            const { data, error } = await supabase
              .from("lifestyle_coach_log")
              .select()
              .eq("user", user.id)
              .order("created_at", { ascending: false });
  
            if (error) {
              console.log(error);
            } else {
              console.log(data);
              setData(data);
            }
          }
  
          coachLog();
        // getStudent();
    }, [])

    // let coachLogs = data.map((item) => {
    //   let sessType;
    //   if(item.sesstype.title.includes('-')) {
    //     sessType = item.sesstype.title.substring(0, 4);
    //   }
    //   else{
    //     sessType = item.sesstype.title.substring(0, 2).replace(/\s/g, '')
    //   }

    //   // console.log(item)


    //   return <View key={item.id} style={styles.container}>
    //     <Card
    //       data={item}
    //       title={`Week of ${item.created_at.substring(0, 10)}`}
    //       col1title={"Current Weight"}
    //       col2title={"Attendance"}
    //       col3title={"Session Type"}
    //       col1={item.current_weight}
    //       col1icon={"weight"}
    //       col2icon={item.attendance.icon}
    //       col2={item.attendance.title}
    //       col3icon={item.sesstype.icon}
    //       col3={sessType}
    //       date={item.created_at.substring(0, 10)}
    //       coach={true} 
    //     />
    //   </View>
    // })

    return (
      <View>
        <Searchbar
          placeholder="Search by Date (YYYY-MM-DD)"
          onChangeText={setSearchQuery}
          onIconPress={coachLog}
          value={searchQuery}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => {
            let sessType;
            console.log(item);
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
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={coachLog} />
          }
          keyExtractor={(item) => item.id}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})