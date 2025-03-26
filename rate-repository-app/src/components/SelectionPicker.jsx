import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../globalStyles';

const SelectionPicker = ({ selections = [], selectionIdx, setSelectionIdx }) => (
  <View>
    <Picker
      style={globalStyles.picker}
      selectedValue={selectionIdx}
      onValueChange={(itemValue, _itemIndex) => {
        setSelectionIdx(itemValue);
      }}
      prompt="Select an item..."
    >
      {selections.map((label, i) =>
        <Picker.Item key={i} label={label} value={i} />
      )}
    </Picker>
  </View>
);

export default SelectionPicker;
