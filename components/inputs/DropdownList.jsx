import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function DropdownList({ data, setSelected, defaultValue }) {

  return (
    <View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        defaultOption={defaultValue && { key: "1", value: defaultValue }}
        arrowicon={<Icon name="clipboard-check-multiple" size={20} color="grey" />}
      />
    </View>
  );

};
