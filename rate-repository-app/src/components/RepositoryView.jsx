import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import Text from './Text';
import RepositoryItem from './RepositoryList/RepositoryItem';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import { formatDate } from '../utils/stringTools';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
    margin: 5,
    backgroundColor: theme.colors.white,
  },
  rowContainer: {
    gap: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  colContainer: {
    gap: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  ratingContainer: {
    margin: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  reviewTextContainer: {
    paddingTop: 10,
  },
  separator: { height: 1, },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.ratingContainer}>
          <Text fontSize="heading" fontWeight="bold" color="primary">{review.rating}</Text>
        </View>
        <View style={styles.colContainer}>
          <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
          <Text fontSize="subheading" color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={styles.reviewTextContainer}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

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
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} renderLink={true} />}
    />
  );
};

export default RepositoryView;
