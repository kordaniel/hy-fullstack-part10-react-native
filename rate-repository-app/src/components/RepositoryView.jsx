import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import EmptyFlatList from './FlatListComponents/EmptyFlatList';
import ItemSeparator from './FlatListComponents/ItemSeparator';
import RepositoryItem from './RepositoryList/RepositoryItem';
import RepositoryReview from './RepositoryReview';
import useRepository from '../hooks/useRepository';

const RepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error, fetchMoreReviews } = useRepository(repositoryId);

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  if (error || loading) {
    return (
      <EmptyFlatList
        errorPrefix="Error while attempting to query repository"
        error={error}
        loading={loading}
      />
    );
  }

  return (
    <FlatList
      data={reviews}
      onEndReached={fetchMoreReviews}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} renderLink={true} />}
      ListEmptyComponent={<EmptyFlatList message="No reviews.." />}
    />
  );
};

export default RepositoryView;
