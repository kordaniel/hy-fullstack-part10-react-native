import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import Text from './Text';
import RepositoryItem from './RepositoryList/RepositoryItem';
import RepositoryReview from './RepositoryReview';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
    margin: 5,
    backgroundColor: theme.colors.white,
  },
  separator: { height: 1, },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error } = useRepository(repositoryId);

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  if (loading) {
    return (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );
  }

  if (error) {
    return (
      <Text color="red">Error while attempting to query repository: {error}</Text>
    );
  }

  if (reviews.length === 0) {
    return (
      <View>
        <View style={styles.container}>
          <RepositoryItem item={repository} renderLink={true} />
        </View>
        <View style={styles.container} >
          <Text fontSize="subheading" color="textSecondary">No reviews..</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} renderLink={true} />}
    />
  );
};

export default RepositoryView;
