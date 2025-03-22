import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';
import { useState } from 'react';

const queryOrderings = [
  {
    label: 'Latest repositories',
    variables: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Highest rated repositores',
    variables: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Lowest rated repositories',
    variables: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  },
];

const useRepositoriesGql = () => {
  const [querySelection, setQuerySelection] = useState(0);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: queryOrderings[querySelection].variables,
  });

  const setSelectedQueryOrderingIdx = (idx) => {
    if (!(idx === undefined || idx === null) && idx < queryOrderings.length) {
      setQuerySelection(idx);
    }
  };

  return {
    repositories: data?.repositories,
    error: error?.message,
    loading,
    queryOrderings,
    selectedQueryOrderingIdx: querySelection,
    setSelectedQueryOrderingIdx
  };
};

export default useRepositoriesGql;
