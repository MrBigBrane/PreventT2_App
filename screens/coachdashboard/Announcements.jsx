import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import AnnouncementCard from "../../components/coachesdashboard/AnnouncementCard";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Announcements({ navigation, route }) {

    const { classData } = route.params;

    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    async function getAnnouncements() {
      if(searchQuery === "") {
          const { data, error } = await supabase.from("announcements").select().eq('class_code', classData.code);

      if (error) {
        console.log(error);
      } else {
        setAnnouncements(data);
      }
      }
      else {
        const { data, error } = await supabase
          .from("announcements")
          .select()
          .eq("class_code", classData.code)
          .ilike("title", `%${searchQuery}%`);

        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setAnnouncements(data);
        }
      }
      
    }

    useEffect(() => {
        getAnnouncements();
    }, [])

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onIconPress={getAnnouncements}
                onChangeText={(query) => setSearchQuery(query)}
                value={searchQuery}
            />
            <FlatList
                data={announcements}
                renderItem={({ item }) => {
                    return (
                      <View key={item.id} style={styles.container}>
                        <AnnouncementCard
                          item={item}
                        />
                      </View>
                    );
                }}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={getAnnouncements} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
    }
})