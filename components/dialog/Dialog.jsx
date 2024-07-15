import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

export default function DialogComponent({ buttonTitle, alertTitle, alertContent, alertAction, alertActionTitle, mode, style }) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.buttonStyle}>
      <Button
        onPress={showDialog}
        mode={mode ? mode : "contained"}
        style={[style ? style : null]}
      >
        {buttonTitle}
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{alertTitle}</Dialog.Title>
          <Dialog.Content>
            <Text>{alertContent}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={alertAction}>{alertActionTitle}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    marginLeft: 10
  }
})