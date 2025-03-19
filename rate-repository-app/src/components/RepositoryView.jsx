import { ActivityIndicator, View } from 'react-native';
import { useParams } from 'react-router-native';

import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryList/RepositoryItem';

const RepositoryView = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error } = useRepository(repositoryId);

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

  return (
    <RepositoryItem item={repository} renderLink={true} />
  );
};

export default RepositoryView;
