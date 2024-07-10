import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import NewDropdownList from "../../components/inputs/NewDropdownList";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";

export default function ViewStudent({ route, navigation }) {
    const { studentData } = route.params;

    console.log(studentData)

    async function getStudent() {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", studentData.id);

      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }

    useEffect(() => {
        getStudent();
    }, [])

    return (
        <View style={styles.container}>
            {/* <FlatList data={studentData} renderItem={({ item }) => <Text>{item.name}</Text>}> */}
                <View>
                    <Text>Hello World</Text>
                    <Card></Card>
                </View>
            {/* </FlatList> */}
            {/* <Text>Hello World</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        marginTop: 10,
    }
})