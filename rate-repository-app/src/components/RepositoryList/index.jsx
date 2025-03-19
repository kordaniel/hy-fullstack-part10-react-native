import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import Text from '../Text';
import useRepositoriesGql from '../../hooks/useQuery';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: { height: 1, },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ navigate, repositories }) => {
  const handlePress = (e, repositoryId) => {
    e.preventDefault();
    navigate(`repository/${repositoryId}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={(e) => handlePress(e, item.id)}>
          <RepositoryItem item={item} renderLink={false} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
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
    <RepositoryListContainer navigate={navigate} repositories={repositories} />
  );
};

export default RepositoryList;
