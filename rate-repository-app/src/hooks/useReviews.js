import { useMutation } from '@apollo/client';

import { DELETE_REPOSITORY_REVIEW } from '../graphql/mutations';

const useReviews = () => {
  const [mutate, result] = useMutation(DELETE_REPOSITORY_REVIEW);

  const deleteReview = async (reviewId) => {
    try {
      const response = await mutate({
        variables: { reviewId },
      });

      return response.data?.deleteReview ? true : false;
    } catch (error) {
      console.error('error deleting review:', error.message);
    }
  };

  return [deleteReview, result];
};

export default useReviews;
