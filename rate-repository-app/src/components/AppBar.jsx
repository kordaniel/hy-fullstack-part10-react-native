import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 3,
    gap:3,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexItem: {
    flexGrow: 0,
    backgroundColor: theme.colors.appBarTabBackground,
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colors.appBarTabBorder,
  },
});

const AppBarTab = ({ title }) => {
  const textStyle = {
    color: theme.colors.appBarTabText,
  };

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={null}>
        <Text fontWeight="bold" style={textStyle}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const AppBar = () => (
  <View style={styles.flexContainer}>
    <AppBarTab title="Repositories" />
  </View>
);

export default AppBar;
