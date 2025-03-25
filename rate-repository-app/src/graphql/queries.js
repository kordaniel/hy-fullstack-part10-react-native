import { gql } from '@apollo/client';

import {
  PAGE_INFO_DETAILS,
  REPOSITORY_DETAILS,
  REPOSITORY_REVIEW_DETAILS
} from './fragments';

export const GET_REPOSITORIES = gql`
  query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        },
        cursor,
      },
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO_DETAILS}
`;

// The only query that actually utilizes pagination, even if all the other
// queries request PageInfo with cursor
export const GET_REPOSITORY = gql`
  query(
    $id: ID!
    $reviewFirst: Int
    $reviewAfterCursor: String
  ) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(
        first: $reviewFirst
        after: $reviewAfterCursor
      ) {
        totalCount
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REPOSITORY_REVIEW_DETAILS}
  ${PAGE_INFO_DETAILS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser(
    $includeReviews: Boolean = false
  ) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repositoryId
            repository {
              fullName
            }
          }
          cursor
        },
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${REPOSITORY_REVIEW_DETAILS}
  ${PAGE_INFO_DETAILS}
`;
