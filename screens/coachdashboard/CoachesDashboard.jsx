import { View, Text, StyleSheet, Pressable, RefreshControl, ScrollView } from "react-native";
import { useEffect, useState } from "react";
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

        console.log(data)

        for(let i = 0; i < data.length; i++) {
          if(data[i].background_picture_path !== null) {
            const pictureFetch = await supabase.storage
              .from("class_backgrounds") // Replace with your bucket name
              .getPublicUrl(data[i].background_picture_path);

            if (pictureFetch.error) {
              console.log(pictureFetch.error);
            } else {
              data[i].background_picture_path = pictureFetch.data.publicUrl;
            }
          }
        }

          

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
            renderItem={({ item }) => {
              return <View key={item.code} style={styles.container}>
                <CoachClassCard
                  classId={item.code}
                  className={item.class_name}
                  backgroundUri={item.background_picture_path !== null ? item.background_picture_path : 'https://picsum.photos/700'}
                />
              </View>;
            }}
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