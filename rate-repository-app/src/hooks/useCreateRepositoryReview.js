import { useMutation } from '@apollo/client';

import { CREATE_REPOSITORY_REVIEW } from '../graphql/mutations';

const useCreateRepositoryReview = () => {
  const [mutateFunc, result] = useMutation(CREATE_REPOSITORY_REVIEW);

  const createReview = async (review) => {
    try {
      const response = await mutateFunc({
        variables: {
          review: { ...review, rating: Math.round(review.rating) }
        }
      });

      if (response.data?.createReview?.repository?.id) {
        return response.data.createReview.repository.id;
      }
    } catch (error) {
      console.error('error creating review:', error);
    }

    return null;
  }

  return [createReview, result];
};

export default useCreateRepositoryReview;
