import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function CardButton({ title, icon, onPress}) {
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

const styles = StyleSheet.create({
    card: {
        padding: 12,
        margin: 12,
        marginTop: 16
      },
})