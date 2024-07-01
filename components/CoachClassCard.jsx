import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = () => (
  <Card>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} height={200} />
    <Card.Title
      title="Card Title"
      titleVariant="displayMedium"
      style={styles.textSpace}
      titleStyle={styles.title}
      contentstyle={styles.content}
    />
  </Card>
);

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  
});
  