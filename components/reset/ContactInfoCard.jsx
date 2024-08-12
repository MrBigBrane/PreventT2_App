import { Pressable, StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ContactInfoCard({ contactDetails }) {
    console.log('hello')
    console.log(contactDetails);

    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Contact Information"
            titleVariant="titleLarge"
            style={{ marginTop: 8 }}
          />
          <Card.Content>
            <Divider style={{ marginBottom: 16 }} />
            <Pressable onPress={() => navigation.navigate("Edit Name", { contactDetails })}>
              <View style={styles.grouping}>
                <Text variant="bodyLarge">Name</Text>
                <Text variant="bodyLarge" style={styles.text}>{contactDetails.name} ⇨</Text>
              </View>
            </Pressable>

            <Divider style={styles.divider} />

            <Pressable onPress={() => navigation.navigate("Edit Email", { contactDetails })}>
              <View style={styles.grouping}>
                <Text variant="bodyLarge">Email Address</Text>
                <Text variant="bodyLarge" style={styles.text}>{contactDetails.email_address} ⇨</Text>
              </View>
            </Pressable>

            <Divider style={styles.divider} />

            <Pressable onPress={() => navigation.navigate("Edit Phone", { contactDetails })}>
              <View style={styles.grouping}>
                <Text variant="bodyLarge">Phone Number</Text>
                <Text variant="bodyLarge" style={styles.text}>{`+1 (${contactDetails.phone.substring(0, 3)}) ${contactDetails.phone.substring(3, 6)} ${contactDetails.phone.substring(6)}`} ⇨</Text>
              </View>
            </Pressable>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Change Password"
            titleVariant="titleLarge"
            style={{ marginTop: 8 }}
          />
          <Card.Content>
            <Divider style={{ marginBottom: 16 }} />
            <Pressable onPress={() => navigation.navigate("Edit Password")}>
              <View style={styles.grouping}>
                <Text variant="bodyLarge">Password</Text>
                <Text variant="bodyLarge" style={styles.text}>******** ⇨</Text>
              </View>
            </Pressable>
          </Card.Content>
        </Card>

        {/* <Button mode="contained" style={styles.card}>Delete Account</Button> */}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 12,
    },
    grouping: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    divider: {
        marginVertical: 16,
    },
    card: {
        marginVertical: 8,
    },
    text: {
        color: "gray"
    }
})