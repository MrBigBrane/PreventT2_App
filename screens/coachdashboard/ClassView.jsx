import { View, Text, StyleSheet, Image } from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ClassView({ navigation, route }) {
    const [classData, setClassData] = useState({});

    const { classId, className, backgroundUri } = route.params;
    console.log(backgroundUri)

    async function getClass() {
        const { data, error } = await supabase
          .from("coach_codes")
          .select()
          .eq("code", classId);

          

        if (error) {
          console.log(error);
        } else {
          setClassData(data[0]);
        }
    }

    useEffect(() => {
        getClass();
    }, [])

    

    function CardButton({ title, icon, onPress}) {
        return (
          <Card style={styles.card} onPress={onPress}>
            <Card.Title
              title={title}
              titleVariant="headlineMedium"
              left={(props) => (
                <Icon name={icon} size={24} color="black" {...props} />
              )}
            />
          </Card>
        );
    }
    

    return (
      <View>
        <Image
          source={{ uri: backgroundUri }}
          style={{ width: "100%", height: 200 }}
        />
        <CardButton
          title={"View Class"}
          icon={"google-classroom"}
          onPress={() =>
            navigation.navigate("View Class", { classData: classData })
          }
        />
        <CardButton
          title="Announcements"
          icon={"bullhorn"}
          onPress={() => {
            navigation.navigate("Announcements", { classData: classData });
          }}
        />
        <CardButton
          title="Settings"
          icon={"cog"}
          onPress={() => {
            navigation.navigate("Settings", { classData: classData, backgroundUri: backgroundUri });
          }}
        />
      </View>
    );
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    card: {
      padding: 12,
      margin: 12,
    },
  })
