import { ActivityIndicator, View } from 'react-native';

import Text from '../Text';
import globalStyles from '../../globalStyles';
import theme from '../../theme';

const EmptyFlatList = ({ message, errorPrefix, error, loading }) => {
  if (error || loading) {
    return (
      <View style={globalStyles.container}>
        {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}
        {error && <Text fontSize="subheading" color="red">{errorPrefix}: {error.message}</Text>}
      </View>
    );
  }

  if (message) {
    return (
      <View style={globalStyles.container}>
        <Text fontSize="subheading" color="textSecondary">{message}</Text>
      </View>
    );
  }

  return null;
};

export default EmptyFlatList;
