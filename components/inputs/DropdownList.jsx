import { SelectList } from 'react-native-dropdown-select-list'

export default function DropdownList({ data, setSelected, defaultValue }) {

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={defaultValue && { key: '1',value: defaultValue }}
    />
  );

};