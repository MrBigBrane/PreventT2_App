import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function MyClass() {
    return (
      <View style={styles.container}>
        <Surface style={{ padding: 8 }}>
          <Text>MyClass</Text>
          <Text>MyClass</Text>
          <Text>MyClass</Text>
        </Surface>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })