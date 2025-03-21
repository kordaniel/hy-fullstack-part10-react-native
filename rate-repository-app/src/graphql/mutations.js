import { gql } from '@apollo/client';

export const CREATE_REPOSITORY_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repository {
        id
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken,
      expiresAt
  }
}
`;
