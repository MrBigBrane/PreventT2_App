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
      <FAB.Group
      theme={theme}
        // style={styles.container}
        open={open}
        visible
        icon={open ? "minus" : "plus"}
        actions={[
          {
            icon: "run",
            label: "Add Activity",
            onPress: () => navigation.navigate("Add Activity"),
          },
          {
            icon: "hand-heart",
            label: "Add Coach Log",
            onPress: () => navigation.navigate("Add Coach Log"),
          },
          {
            icon: "food-fork-drink",
            label: "Add Meal",
            onPress: () => navigation.navigate("Add Meal"),
          },
          {
            icon: "notebook-edit",
            label: "Add Action Plan",
            onPress: () => navigation.navigate("Add Action Plan"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        backdropColor='gray'
      />
  );
};

// const styles = StyleSheet.create({
//     container: {
//       marginBottom: 100,
//     },
  // });