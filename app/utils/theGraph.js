import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  communitiesQuery,
  tagsQuery,
  userQuery,
  usersQuery,
} from './ethConstants';

const client = new ApolloClient({
  uri: process.env.THE_GRAPH_QUERY_URL,
  cache: new InMemoryCache(),
});

export const getUsers = async ({
  limit = 50,
  skip,
  sorting = 'creationTime',
}) => {
  const users = await client.query({
    query: gql(usersQuery),
    variables: {
      first: limit,
      skip,
      orderBy: sorting,
    },
  });
  return users?.data.users;
};

export const getUser = async id => {
  const user = await client.query({
    query: gql(userQuery),
    variables: {
      id,
    },
  });
  return user?.data.user;
};

export const getCommunities = async count => {
  const communities = await client.query({
    query: gql(communitiesQuery),
    variables: {
      first: count,
    },
  });
  return communities?.data.communities;
};

export const getTags = async (count, communityId) => {
  const tags = await client.query({
    query: gql(tagsQuery),
    variables: {
      first: count,
      communityId,
    },
  });
  return tags?.data.tags;
};
