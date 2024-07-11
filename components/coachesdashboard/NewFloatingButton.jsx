import { useState } from 'react';
import { FAB, Portal, PaperProvider, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FloatingButton() {
  const [state, setState] = useState({ open: false });

  const navigation = useNavigation();

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backdrop: 'transparent', // Remove backdrop color
    },
  };

  return (
    <FAB
      icon={"plus"}
      label="Add Class"
      onPress={() => navigation.navigate("Add Class")}
      style={styles.fab}
      theme={theme}
    />
  );
};

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })