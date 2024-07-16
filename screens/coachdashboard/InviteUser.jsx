import { View, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { Surface, Text } from "react-native-paper";
import { useEffect, useState } from "react";

export default function InviteUser({ route, navigation }) {
    const { classId } = route.params;

    const [data, setData] = useState([]);


    async function getClasses() {

        const { data, error } = await supabase
          .from('coach_codes')
          .select()
          .eq("code", classId)
        console.log(data)
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
        <View>
            { data.length > 0 &&
            <Surface style={styles.paper}>
                <Text variant="titleLarge">Class Details</Text>
                <Text marginVertical={10}>Class Name: {data[0].class_name}</Text>
                <Text>Class Code: {data[0].code}</Text>
            </Surface>
            } 
        </View>
    );
}

const styles = StyleSheet.create({
    spacing: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    padding: {
        padding: 10,
    },
    paper: {
        padding: 10,
        marginVertical: "60%",
        margin: "auto",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 8, 
        // position: "absolute",
        // // middleTop: 0,
    }
})