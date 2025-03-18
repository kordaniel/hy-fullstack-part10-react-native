import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositoriesGql from '../../hooks/useQuery';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: { height: 1, },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const { loading, error, repositories } = useRepositoriesGql();

  if (loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );
  }

  if (error) {
    return (
      <Text color="red">Error while attempting to query repositories: {error}</Text>
    );
  }

  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;
