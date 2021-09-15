import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { usersQuery } from './ethConstants';

const client = new ApolloClient({
  uri: process.env.THE_GRAPH_QUERY_URL,
  cache: new InMemoryCache(),
});

export const getUsers = async ({
  limit = 50,
  skip,
  sorting = 'creationTime',
}) => {
  console.log(limit);
  console.log(skip);
  console.log(sorting);
  const users = await client.query({
    query: gql(usersQuery),
    variables: {
      first: limit,
      skip,
      orderBy: sorting,
    },
  });
  // console.log(users.data.users.map((user) => {return user.displayName}))
  return users?.data.users;
};
