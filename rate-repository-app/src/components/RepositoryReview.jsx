import { Alert, Platform, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import Button from './Button';
import Text from './Text';
import { formatDate } from '../utils/stringTools';

import globalStyles from '../globalStyles';
import theme from '../theme';

const styles = StyleSheet.create({
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

const RepositoryReview = ({ review, onDelete, isUsersOwnReviewView = false }) => {
  const navigate = useNavigate();

  const onPressView = (e) => {
    e.preventDefault();
    if (review.repositoryId) {
      navigate(`/repository/${review.repositoryId}`);
    }
  };

  const onPressDelete = (e) => {
    e.preventDefault();
    const alertDetails = [
      'Delete review',
      'Are you sure you want to delete this review?',
    ];

    if (!review.id) {
      return;
    }

    if (Platform.OS === 'web') {
      if (window.confirm(alertDetails.join('\n'))) {
        onDelete(review.id);
      }
    } else {
      Alert.alert(...alertDetails, [
        { text: 'Cancel', style: 'cancel', },
        { text: 'OK', onPress: () => onDelete(review.id), }
      ]);
    }
  };

  const headingText = isUsersOwnReviewView
    ? review.repository.fullName
    : review.user.username;

  return (
    <View style={globalStyles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.ratingContainer}>
          <Text fontSize="heading" fontWeight="bold" color="primary">{review.rating}</Text>
        </View>
        <View style={styles.colContainer}>
          <Text fontSize="subheading" fontWeight="bold">{headingText}</Text>
          <Text fontSize="subheading" color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={styles.reviewTextContainer}>{review.text}</Text>
        </View>
      </View>
      {isUsersOwnReviewView && (
      <View style={styles.rowContainer}>
        <Button onPress={onPressView} bgColor={theme.colors.primary}>View repository</Button>
        <Button onPress={onPressDelete} bgColor={theme.colors.red}>Delete review</Button>
      </View>
      )}
    </View>
  );
};

export default RepositoryReview;
