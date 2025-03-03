import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
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

const AppBarTab = ({ title, routePath }) => {
  const textStyle = {
    color: theme.colors.appBarTabText,
  };

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={null}>
        <Link to={routePath}>
          <Text fontWeight="bold" style={textStyle}>
            {title}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

const AppBar = () => (
  <View style={styles.flexContainer}>
    <ScrollView horizontal>
      <AppBarTab title="Repositories" routePath="/" />
      <AppBarTab title="Sign In" routePath="sign-in" />
      {/* horizontal scrolling works
      <AppBarTab title="Extra tab 1" routePath="/" />
      <AppBarTab title="Extra tab 2" routePath="sign-in" />
      <AppBarTab title="Extra tab 3" routePath="/" />
      <AppBarTab title="Extra tab 4" routePath="sign-in" />
      */}
    </ScrollView>
  </View>
);

export default AppBar;
