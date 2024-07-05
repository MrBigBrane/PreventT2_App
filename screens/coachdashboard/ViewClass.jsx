import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Text, Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import fetchMinutes from "../../serveractions/graph/fetchMinutes";
import { RefreshControl } from "react-native-gesture-handler";

export default function ViewClass({ route, navigation }) {
    const { classData } = route.params;

    const [studentData, setStudentData] = useState([]);
    const [weekData, setWeekData] = useState([]);

    

    const classCode = classData.code;

    async function getStudents() {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("class_codes", classCode);

        if (error) {
          console.log(error);
        } else {
          setStudentData(data);
        }
    }

    useEffect(() => {
        getStudents();
    }, [])

    

    function CardButton({ item }) {
        useEffect(() => {
            async function fetch() {
                const data = Array.from(await fetchMinutes("92649add-ea69-402d-82c6-dbe144f8f7cc"))
                setWeekData(data[data.length - 1].value);
            }
            fetch();
        }, [])
        
        const LeftContent = (props) => (
            <Avatar.Icon {...props} icon={"account-circle"} />
          );

        const [showDetails, setShowDetails] = useState(false);

        return (
          <Card style={styles.card}>
            <Card.Title
              title={`${item.first_name} ${item.last_name}`}
              titleVariant="headlineMedium"
              left={(props) => <LeftContent {...props} />}
            />
            {showDetails && (
              <Card.Content style={styles.textSpace}>
                <View style={styles.grouping}>
                  <Text variant="bodyMedium">Join Date</Text>
                  <View style={styles.text}>
                    <Text variant="bodySmall">{item.created_at.substring(0, 10)}</Text>
                  </View>
                </View>
                <View style={styles.grouping}>
                  <Text variant="bodyMedium">{"BMI"}</Text>
                  <View style={styles.text}>
                    <Text variant="bodySmall">{item.bmi ? item.bmi : "N/A"}</Text>
                  </View>
                </View>
                <View style={styles.grouping}>
                  <Text variant="bodyMedium">{"This Week"}</Text>
                  <View style={styles.text}>
                    <Text variant="bodySmall">{`${weekData} min`}</Text>
                  </View>
                </View>
              </Card.Content>
            )}
            <Card.Actions>
              <Button
                onPress={() => setShowDetails(!showDetails)}
                icon={showDetails ? "chevron-up" : "chevron-down"}
              >
                {showDetails ? "Hide" : "Details"}
              </Button>
            </Card.Actions>
          </Card>
        );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={studentData}
          renderItem={({ item }) => (
            <View key={item.id}>
              <CardButton item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getStudents} />
          }
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
  grouping: {
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 5,
  },
  textSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});