import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import SelectionPicker from '../SelectionPicker';
import Text from '../Text';
import useRepositoriesGql from '../../hooks/useQuery';
import theme from '../../theme';

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

  renderEmptyList = () => {
    const { error, loading } = this.props.repositoriesQuery;

    if (error) {
      return (
        <View style={styles.container}>
          <Text fontSize="subheading" color="red">Error while attempting to query repositories: {error}</Text>
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
        <Text fontSize="subheading" color="textSecondary">No repositories</Text>
      </View>
    );
  };

  render() {
    const {
      repositories,
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
        ListEmptyComponent={this.renderEmptyList}
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
