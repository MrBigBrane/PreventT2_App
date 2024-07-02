import { SelectList } from 'react-native-dropdown-select-list'

export default function DropdownList({ data, setSelected }) {

  return (
    <SelectList
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
    />
  );

};