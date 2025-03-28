import { gql } from '@apollo/client';

export const PAGE_INFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const REPOSITORY_REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
    url
  }
`;
