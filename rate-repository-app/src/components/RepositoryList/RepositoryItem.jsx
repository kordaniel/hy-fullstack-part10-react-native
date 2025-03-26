import { Image, Pressable, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';

import Text from '../Text';
import globalStyles from '../../globalStyles';
import theme from '../../theme';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderColor: theme.colors.black,
    borderRadius: 3,
  },
  rowContainer: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  colContainer: {
    gap: 5,
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // prevents text from overflowing and instead wraps it inside the container
  },
});

const ItemHeading = ({ avatarUrl, fullName, description, language }) => (
  <View style={styles.rowContainer}>
    <Image
      style={styles.avatar}
      source={{ uri: avatarUrl }}
    />
    <View style={styles.colContainer}>
      <Text fontSize="subheading" fontWeight="bold">{fullName}</Text>
      <Text fontSize="subheading" color="textSecondary">{description}</Text>
      <View style={styles.rowContainer}>
        <Text
          fontSize="subheading"
          color="white"
          bgColor={theme.colors.primary}
          style={{ borderRadius: 5, padding: 5 }}
        >
          {language}
        </Text>
      </View>
    </View>
  </View>
);

const ItemStats = ({ starsCnt, forksCnt, reviewsCnt, ratingAvg }) => {
  const parseCount = val => val < 1000
    ? `${val}`
    : `${(Math.round(10 * val / 1000) / 10)}k`;

  return (
    <View style={{ ...styles.rowContainer, justifyContent: 'space-around' }}>
      <View style={styles.colContainer}>
        <Text textAlign="center" fontSize="subheading" fontWeight="bold">{parseCount(starsCnt)}</Text>
        <Text textAlign="center">Stars</Text>
      </View>
      <View style={styles.colContainer}>
        <Text textAlign="center" fontSize="subheading" fontWeight="bold">{parseCount(forksCnt)}</Text>
        <Text textAlign="center">Forks</Text>
      </View>
      <View style={styles.colContainer}>
        <Text textAlign="center" fontSize="subheading" fontWeight="bold">{parseCount(reviewsCnt)}</Text>
        <Text textAlign="center">Reviews</Text>
      </View>
      <View style={styles.colContainer}>
        <Text textAlign="center" fontSize="subheading" fontWeight="bold">{ratingAvg}</Text>
        <Text textAlign="center">Rating</Text>
      </View>
    </View>
  );
};

const GitHubLink = ({ url }) => {
  return (
    <Pressable onPress={() => Linking.openURL(url)}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        color="white"
        textAlign="center"
        bgColor={theme.colors.primary}
        style={{ borderRadius: 5, padding: 15 }}
      >
        Open in GitHub
      </Text>
    </Pressable>
  );
}

const RepositoryItem = ({ item, renderLink }) => {
  return (
    <View testID="repositoryItem" style={globalStyles.container}>
      <ItemHeading
        avatarUrl={item.ownerAvatarUrl}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
      />
      <ItemStats
        starsCnt={item.stargazersCount}
        forksCnt={item.forksCount}
        reviewsCnt={item.reviewCount}
        ratingAvg={item.ratingAverage}
      />
      {renderLink && item.url && <GitHubLink url={item.url} />}
    </View>
  );
};

export default RepositoryItem;
