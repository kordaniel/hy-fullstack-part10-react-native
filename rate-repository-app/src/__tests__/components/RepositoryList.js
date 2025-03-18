import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';


const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
  },
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
      cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
      cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    },
  ],
};

const parseCount = val => val < 1000
  ? `${val}`
  : `${(Math.round(10 * val / 1000) / 10)}k`;


describe('RepositoryList', () => {

  describe('RepositoryListContainer', () => {

    it('renders repository information correctly', () => {
      const expectedHeadingFields = ['fullName', 'description', 'language'];
      const expectedBodyFields = ['forksCount', 'stargazersCount', 'ratingAverage', 'reviewCount'];

      render(<RepositoryListContainer repositories={repositories} />);
      //screen.debug();
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);
      //const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      repositoryItems.forEach((repositoryItem, i)  => {
        expectedHeadingFields.forEach(field => {
          const expectedText = repositories.edges[i].node[field];
          const textElement = within(repositoryItem).getByText(expectedText); // test does not pass if text is not found, no need to expect
          expect(textElement).toHaveTextContent(expectedText);
        });

        expectedBodyFields.forEach(field => {
          // NOTE: currently all body fields are numbers
          const expectedText = parseCount(repositories.edges[i].node[field]);
          const textElement = within(repositoryItem).getByText(expectedText); // test does not pass if text is not found, no need to expect
          expect(textElement).toHaveTextContent(expectedText);
        });
      });
    }); // renders repository information correctly

  }); // RepositoryListContainer

}); // RepositoryList
