import { useState } from 'react';
import { FAB, Portal, PaperProvider, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function FloatingButton() {
  const [state, setState] = useState({ open: false });

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
    // <PaperProvider>
    <Portal>
      <FAB.Group
      theme={theme}
        style={styles.container}
        open={open}
        visible
        icon={open ? "minus" : "plus"}
        actions={[
          {
            icon: "run",
            label: "Add Activity",
            onPress: () => console.log("Pressed add"),
          },
          {
            icon: "hand-heart",
            label: "Add Coach Log",
            onPress: () => console.log("Pressed star"),
          },
          {
            icon: "food-fork-drink",
            label: "Add Meal",
            onPress: () => console.log("Pressed email"),
          },
          {
            icon: "notebook-edit",
            label: "Add Action Plan",
            onPress: () => console.log("Pressed notifications"),
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
    </Portal>
    // </PaperProvider>
  );
};

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: 'flex-end',
      marginBottom: 100,
      zIndex: 100
    },
  });