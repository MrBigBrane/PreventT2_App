import { Divider, Surface, Text } from "react-native-paper";
import ChangeEmail from "../../components/reset/ChangeEmail";
import ChangePassword from "../../components/reset/ChangePassword";
import { StyleSheet, View } from "react-native";

export default function AccountInfo({ navigation, route }) {
    const { user, data } = route.params;

    return (
      <View style={styles.container}>
        <Text variant="titleLarge">Contact Information</Text>
        <Divider style={styles.divider} />
        
        <ChangeEmail phoneNum={data.phone} email={data.email_address}/>
        <Divider style={styles.divider} />
        <Text variant="bodyLarge">Change/Reset Password:</Text>
        <ChangePassword />
      </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    divider: {
        marginVertical: 8,
    }
})