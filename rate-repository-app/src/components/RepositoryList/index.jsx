import React from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';

import EmptyFlatList from '../FlatListComponents/EmptyFlatList';
import ItemSeparator from '../FlatListComponents/ItemSeparator';
import RepositoryItem from './RepositoryItem';
import SelectionPicker from '../SelectionPicker';
import useRepositoriesGql from '../../hooks/useQuery';
import theme from '../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    padding: 5,
    gap: 5,
    margin: 5,
    backgroundColor: theme.colors.appBackground,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: theme.colors.white, 
  },
});

const RepositoryListHeader = ({
  orderingOptions,
  selectedOrdering,
  setSelectedOrdering,
  setFilterByString,
  filterByString
}) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
          style={styles.textInput}
          placeholder='Search by name or username.'
          placeholderTextColor={theme.colors.textSecondary}
          clearButtonMode='always'
          value={filterByString}
          onChangeText={setFilterByString}
      />
      <SelectionPicker
        selections={orderingOptions}
        selectionIdx={selectedOrdering}
        setSelectionIdx={setSelectedOrdering}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  };

  handlePress = (e, repositoryId) => {
    e.preventDefault();
    this.props.navigate(`repository/${repositoryId}`);
  };

  render() {
    const {
      repositories,
      error,
      loading,
      queryOrderings,
      selectedQueryOrderingIdx,
      setSelectedQueryOrderingIdx,
      searchKeyword,
      updateSearchKeyword
    } = this.props.repositoriesQuery;
    const data = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={(e) => this.handlePress(e, item.id)}>
            <RepositoryItem item={item} renderLink={false} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <RepositoryListHeader
            orderingOptions={queryOrderings.map(o => o.label)}
            selectedOrdering={selectedQueryOrderingIdx}
            setSelectedOrdering={setSelectedQueryOrderingIdx}
            filterByString={searchKeyword}
            setFilterByString={updateSearchKeyword}
          />
        }
        ListEmptyComponent={<EmptyFlatList
          message="No repositories"
          errorPrefix="Error while attempting to query repositories"
          error={error}
          loading={loading}
        />}
      />
    );
  };
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const repositoriesQuery = useRepositoriesGql();

  return (
    <RepositoryListContainer
      navigate={navigate}
      repositoriesQuery={repositoriesQuery}
    />
  );
};

export default RepositoryList;
