import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

export default function DialogComponent({ buttonTitle, alertTitle, alertContent, alertAction, alertActionTitle, mode, style, buttonStyle, textColor }) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={[style ? style : null]}>
      <Button
        mode={mode ? mode : "contained"}
        onPress={showDialog}
        style={[buttonStyle ? buttonStyle : null]}
        textColor={textColor ? textColor : "white"}
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