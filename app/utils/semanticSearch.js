import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { AWS_URL } from 'utils/constants';

const client = new ApolloClient({
  uri: 'https://test-api.testpeeranha.io/semantic-search',
  cache: new InMemoryCache(),
});

const executeQuery = async ({ query, variables }) => {
  // const result = await client.query({
  //   query: gql(query),
  //   variables,
  //   fetchPolicy: !enableCache ? 'network-only' : undefined,
  // });
  //
  // return result?.data;
  console.log('pochti');
  const res = await fetch('https://test-api.testpeeranha.io/semantic-search', {
    method: 'POST',
    body: JSON.stringify({
      query,
      communityId: variables.communityId,
    }),
    headers: {
      'Content-Type': 'application/json',
      reCaptchaToken: variables.reCaptchaToken,
    },
    mode: 'no-cors',
  });
  console.log('DAAAA', res);
  return res;
};

export const getSearchResult = async ({ query, reCaptchaToken, communityId }) =>
  await executeQuery({
    query,
    variables: {
      reCaptchaToken,
      communityId,
    },
  });
