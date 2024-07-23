import { StyleSheet, View } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CoachClassCard({ className, classId, backgroundUri, createdAt }) {

  const navigation = useNavigation();

  function handleButtonPress() {
    navigation.navigate("ClassView", { classId: classId, className: className, backgroundUri: backgroundUri });
  }

  return (
    <Card onPress={handleButtonPress}>
      <Card.Cover source={{ uri: backgroundUri }} height={100} />

      <Card.Content>
        <Card.Title
          title={className}
          titleVariant="displaySmall"
          style={styles.textSpace}
          titleStyle={styles.title}
          contentstyle={styles.content}
          right={() => (
            <IconButton
              icon="pencil"
              size={20}
              color="black"
              // onPress={() => navigation.navigate("EditClass", { classId: item.code })}
            />
          )}
        />
        <Text variant="bodyLarge" style={styles.content}>Created at: {createdAt}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  content: {
    // alignItems: 'center',
    marginLeft: 17,
  },
  title: {
    // textAlign: 'center',
    // padding: 12,
  },
  // title: {
  //   // flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   // flex: 1
  // },
  
});
