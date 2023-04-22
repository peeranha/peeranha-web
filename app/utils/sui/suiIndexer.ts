import { usersQuery } from 'utils/sui/suiQuerries';
import { SUI_INDEXER_URL } from 'utils/sui/sui';

const getDataFromIndexer = async (query: string, variables: object = {}) => {
  const response = await fetch(SUI_INDEXER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: usersQuery, variables }),
  });
  return (await response.json()).data;
};

export const getSuiUsers = async () => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user;
};

export const getSuiUserById = async () => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user;
};

export const getSuiCommunities = async () => {
  const community = `
        id
        avatar
        name
        description
        language
        website
        communitySite
        isBlogger
        tags
    `;

  const query = `
      query(
        $first: Int,
      ) {
        communities(
         first: $first,
        ) {
          ${community}
        }
      }`;

  const variables = { first: '100' };

  try {
    const response = await fetch('https://ue2ez6lhhi.execute-api.us-east-2.amazonaws.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    console.log('data', data);
  } catch (error) {
    console.error(error);
  }
};
