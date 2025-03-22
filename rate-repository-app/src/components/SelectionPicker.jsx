import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: theme.colors.appBarTabBackground,
  }
});

const SelectionPicker = ({ selections = [], selectionIdx, setSelectionIdx }) => (
  <View style={styles.container}>
    <Picker
      selectedValue={selectionIdx}
      onValueChange={(itemValue, _itemIndex) => {
        setSelectionIdx(itemValue);
      }}
      prompt="Select an item..."
    >
      {selections.map((label, i) =>
        <Picker.Item key={i} style={styles.picker} label={label} value={i} />
      )}
    </Picker>
  </View>
);

export default SelectionPicker;
