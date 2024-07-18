import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CoachClassCard({ className, classId, backgroundUri }) {

  const navigation = useNavigation();

  function handleButtonPress() {
    navigation.navigate("ClassView", { classId: classId, className: className, backgroundUri: backgroundUri });
  }

  return (
    <Card onPress={handleButtonPress}>
      <Card.Cover source={{ uri: backgroundUri }} height={100} />
      <Card.Title
        title={className}
        titleVariant="displaySmall"
        style={styles.textSpace}
        titleStyle={styles.title}
        contentstyle={styles.content}
        
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    // textAlign: 'center',
    padding: 12,
  },
  
});
  