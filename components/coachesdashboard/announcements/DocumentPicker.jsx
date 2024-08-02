import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [document, setDocument] = React.useState(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setDocument(result);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a document" onPress={pickDocument} />
      {document && (
        <View style={styles.documentInfo}>
          <Text>URI: {document.uri}</Text>
          <Text>Name: {document.name}</Text>
          <Text>Size: {document.size} bytes</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  documentInfo: {
    marginTop: 20,
  },
});
