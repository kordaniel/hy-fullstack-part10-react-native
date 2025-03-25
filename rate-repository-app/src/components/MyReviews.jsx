import { FlatList } from 'react-native';

import EmptyFlatList from './FlatListComponents/EmptyFlatList';
import ItemSeparator from './FlatListComponents/ItemSeparator';
import RepositoryReview from './RepositoryReview';
import useCurrentUser from '../hooks/useCurrentUser';
import useReviews from '../hooks/useReviews';


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
    ListEmptyComponent={<EmptyFlatList
      message="You haven't created any reviews"
      errorPrefix="Error while attempting to query user reviews"
      error={error}
      loading={loading}
    />}
  />
};

export default MyReviews;
