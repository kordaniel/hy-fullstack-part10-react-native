import { gql } from '@apollo/client';

import { REPOSITORY_DETAILS, REPOSITORY_REVIEW_DETAILS } from './fragments';

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
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query(
    $id: ID!
  ) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        },
        pageInfo {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REPOSITORY_REVIEW_DETAILS}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
