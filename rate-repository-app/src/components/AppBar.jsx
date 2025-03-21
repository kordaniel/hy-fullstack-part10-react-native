import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { ME } from '../graphql/queries';

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

const HandlePress = ({ onPress, children }) => {
  if (!onPress) {
    return (
      <>{children}</>
    );
  }

  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
}

const HandleLink = ({ to, children }) => {
  if (!to) {
    return (
      <>{children}</>
    );
  }

  return (
    <Link to={to}>
      {children}
    </Link>
  )
}

/**
 * Renders a tab with the given title in the appbar.
 * Optionally either navigates to the given routePath or calls the onPress callback.
 * If both optional props are given, the routePath link will take predecence
 * and the callback will be ignored.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the tab (required).
 * @param {string} [props.routePath] - Optional string containing a navigation path. If provided, clicking the title navigates to this link.
 * @param {Function} [props.onPress] - Optional callback function, which will be triggered when the title is clicked is routePath is falsy.
 */
const AppBarTab = ({ title, routePath, onPress }) => {
  const textStyle = {
    color: theme.colors.appBarTabText,
  };

  return (
    <View style={styles.flexItem}>
      <HandlePress onPress={onPress}>
        <HandleLink to={routePath}>
          <Text fontWeight="bold" style={textStyle}>
            {title}
          </Text>
        </HandleLink>
      </HandlePress>
    </View>
  );
};

const AppBar = () => {
  const [,, signOut] = useSignIn();
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    <ActivityIndicator size="large" color={theme.colors.primary} />
  }

  if (error) {
    return (
      <Text color="red">Error while attempting to query authentication status: {error}</Text>
    );
  }

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" routePath="/" />
        {data?.me
          ? (
            <>
              <AppBarTab title="Create a review" routePath="/create-review" />
              <AppBarTab title="Sign Out" onPress={signOut} />
            </>
          )
          : <AppBarTab title="Sign In" routePath="/sign-in" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
