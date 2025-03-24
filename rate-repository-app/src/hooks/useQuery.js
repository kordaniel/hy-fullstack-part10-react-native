import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';

import { GET_REPOSITORIES } from '../graphql/queries';

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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 700);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ...queryOrderings[querySelection].variables,
      searchKeyword: debouncedSearchKeyword,
    },
  });

  const setSelectedQueryOrderingIdx = (idx) => {
    if (!(idx === undefined || idx === null) && idx < queryOrderings.length) {
      setQuerySelection(idx);
    }
  };

  const updateSearchKeyword = (str) => {
    setSearchKeyword(str ? str.trim() : '');
  };

  return {
    repositories: data?.repositories,
    error: error?.message,
    loading,
    queryOrderings,
    selectedQueryOrderingIdx: querySelection,
    setSelectedQueryOrderingIdx,
    searchKeyword,
    updateSearchKeyword,
  };
};

export default useRepositoriesGql;
