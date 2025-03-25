import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import RepositoryReview from './RepositoryReview';
import Text from './Text';
import useCurrentUser from '../hooks/useCurrentUser';
import useReviews from '../hooks/useReviews';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    gap: 10,
    margin: 5,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    padding: 5,
    gap: 5,
    margin: 5,
    backgroundColor: theme.colors.appBackground,
  },
  separator: { height: 1, },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: theme.colors.white,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderEmptyList = ({ error, loading }) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text fontSize="subheading" color="red">Error while attempting to query user reviews: {error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" color="textSecondaryy">You haven't created any reviews</Text>
    </View>
  );
};

const MyReviews = () => {
  const { currentUser, error, loading, refetch } = useCurrentUser(true);
  const [deleteReview, result] = useReviews(); // result => .loading, .called, .data, .error
                                               // TODO: Add loading, error rendering to RepositoryReview view for mutation (deletion of review)

  const handleReviewDeletion = async (reviewId) => {
    const wasDeleted = await deleteReview(reviewId);
    if (wasDeleted) {
      refetch();
    }
  };

  const data = currentUser?.reviews
    ? currentUser.reviews.edges.map(edge => edge.node)
    : [];

  return <FlatList
    data={data}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryReview review={item} onDelete={handleReviewDeletion} isUsersOwnReviewView={true} />}
    keyExtractor={item => item.id}
    ListEmptyComponent={<RenderEmptyList error={error} loading={loading} />}
  />
};

export default MyReviews;
