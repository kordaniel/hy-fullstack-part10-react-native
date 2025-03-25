import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    gap: 10,
    margin: 5,
    backgroundColor: theme.colors.white,
  },
});

const EmptyFlatList = ({ message, errorPrefix, error, loading }) => {
  if (error || loading) {
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
        {error && <Text fontSize="subheading" color="red">{errorPrefix}: {error.message}</Text>}
      </View>
    );
  }

  if (message) {
    return (
      <View style={styles.container}>
        <Text fontSize="subheading" color="textSecondary">{message}</Text>
      </View>
    );
  }

  return null;
};

export default EmptyFlatList;
