import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { postQuestion } from 'utils/questionsManagement';
import { call } from 'redux-saga/effects';

export const filecoinQADiscussionsQuery = `
query {
  repository(owner: "filecoin-project", name: "community") {
    discussions(first: 50, categoryId: "MDE4OkRpc2N1c3Npb25DYXRlZ29yeTE3NDIwNjEw") {
        edges {
            node {
            author {
                login
              }
            title
            body
            }
        }
    }
  }
}
`;

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});
// Generate and set the header with the auth details
const authLink = setContext((_, { headers }) => {
  const token = 'github_oauth_token';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const getFilecoinForumData = async () => {
  const forumData = await client.query({
    query: gql(filecoinQADiscussionsQuery),
  });

  const formattedForumData = forumData.data.repository.discussions.edges.map(
    discussion => ({
      user: discussion.node.author.login,
      title: discussion.node.title,
      content: discussion.node.body,
    }),
  );

  localStorage.setItem('filecoinData', JSON.stringify(formattedForumData));
};

export function* setFilecoinPosts(selectedAccount, ethereumService) {
  const filecoinData = localStorage.getItem('filecoinData');
  const parsedData = JSON.parse(filecoinData);

  for (let i = 0; i < parsedData.length; i++) {
    yield call(
      postQuestion,
      selectedAccount,
      6,
      { title: parsedData[i].title, content: parsedData[i].content },
      1,
      [1, 2],
      ethereumService,
    );
  }
}
