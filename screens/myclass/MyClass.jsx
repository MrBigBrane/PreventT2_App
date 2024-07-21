import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function MyClass() {
  const [data, setData] = useState([]);

  async function getMyClass() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("user", user.id)

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  }

  useEffect(() => {
    getMyClass();
  }, []);

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