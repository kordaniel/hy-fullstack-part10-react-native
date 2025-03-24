import { StyleSheet, View } from 'react-native';

import Text from './Text';
import { formatDate } from '../utils/stringTools';

import theme from '../theme';

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
});

const RepositoryReview = ({ review }) => {
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

export default RepositoryReview;
