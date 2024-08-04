import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Text, Card, Button, Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import getWeeklyMinutes from "../../serveractions/graph/getWeeklyMinutes";
import { RefreshControl } from "react-native-gesture-handler";
import ViewStudent from "./ViewStudent";
import getWeeklyWeight from "../../serveractions/graph/getWeeklyWeight";

export default function ViewClass({ route, navigation }) {
    const { classData } = route.params;

    const [studentData, setStudentData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    

    const classCode = classData.code;

    async function getStudents() {
      if(searchQuery === "") {
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
      else {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("class_codes", classCode)
          .ilike("name", `%${searchQuery}%`);

        if (error) {
          console.log(error);
        } else {
          setStudentData(data);
        }

        // fix name column in supabase
      }
    }

    useEffect(() => {
        getStudents();
    }, [])

    

    function CardButton({ item }) {
        const [image, setImage] = useState(null);

        useEffect(() => {
            async function fetch() {
                const data = Array.from(await getWeeklyMinutes(item.id))
                setWeekData(data[data.length - 1].value);
                const weekGraph = Array.from(await getWeeklyWeight(item.id))
                item.bmi = (((weekGraph[weekGraph.length - 1].value / (item.height ** 2)) * 703).toFixed(2));

                if(item.avatar_path !== null) {

                const publicURL = await supabase.storage
                .from("user_avatars")
                .getPublicUrl(item.avatar_path);

                const avatarPath = publicURL.data.publicUrl
                console.log(avatarPath)
                console.log('1')
                setImage(avatarPath)
                console.log(image)
                console.log('2')
                }
                else {
                    setImage("https://picsum.photos/700")
                }
            }
            fetch();
        }, [])
        
        const LeftContent = (props) => (
            <Avatar.Image {...props} source={{ uri: image }}  />
          );
          

        const [showDetails, setShowDetails] = useState(false);

        function handleButtonPress() {
            navigation.navigate("View Student", { studentData: item });
        }

        return (
          <Card style={styles.card} onPress={handleButtonPress}>
            <Card.Title
              title={`${item.name}`}
              titleVariant="headlineMedium"
              left={image !== null && LeftContent}
            />
            {showDetails && (
              <Card.Content style={styles.textSpace}>
                <View style={styles.grouping}>
                  <Text variant="bodyMedium">Join Date</Text>
                  <View style={styles.text}>
                    <Text variant="bodySmall">{item.joined_class_at.substring(0, 10)}</Text>
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
              {/* <Button onPress={handleButtonPress}>
                View Student
              </Button> */}
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
        <Searchbar
          placeholder="Search by name"
          onChangeText={setSearchQuery}
          onIconPress={getStudents}
          value={searchQuery}
        />
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