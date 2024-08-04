import { FlatList, RefreshControl, View } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { supabase } from "../../lib/supabase";
import { useLayoutEffect, useState } from "react";



export default function Inbox() {
    const [inbox, setInbox] = useState([]);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  function InboxCard({ item }) {
    return (
      <Card style={{ borderRadius: 0}}>
        <Card.Title
          title={"DPP Team"}
          titleVariant="titleLarge"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge" style={{ fontWeight: "bold", marginBottom: 5 }}>{item.title}</Text>
          <Text variant="bodyMedium">{item.message}</Text>
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        {/* <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions> */}
      </Card>
    );
  }

  async function getInbox() {
    const {
      data: { user },
    } = await supabase.auth.getUser();


    const { data, error } = await supabase
      .from("inbox")
      .select()
      .eq("user", user.id)
      .order("created_at", { ascending: false });

    console.log(data);


    const todayDate = new Date()
    if(todayDate.getDay() === 0 && data[0].created_at.substring(0, 10) !== todayDate.toISOString().substring(0, 10)) {
      const { data, error } = await supabase
        .from("inbox")
        .insert([
          {
            user: "DPP Team",
            title: "Coach Log Reminder",
            message:
              "This is a friendly reminder to input your coach log if you have not done so already.",
          },
        ]);
    }

    

    if (error) {
      console.log(error);
    } else {
    //   console.log(data);
      setInbox(data);
    }
  }

  useLayoutEffect(() => {
    getInbox();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={inbox}
        renderItem={InboxCard}
        keyExtractor={(inbox) => inbox.id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getInbox} />
        }
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
}