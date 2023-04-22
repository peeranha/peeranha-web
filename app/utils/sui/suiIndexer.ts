import { userQuery, usersQuery } from 'utils/sui/suiQuerries';
import { SUI_INDEXER_URL } from 'utils/sui/sui';

const getDataFromIndexer = async (query: string, variables: object = {}) => {
  const response = await fetch(SUI_INDEXER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return (await response.json()).data;
};

export const getSuiUsers = async () => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user;
};

export const getSuiUserById = async (id: string) => {
  const data = await getDataFromIndexer(userQuery, { id });
  const user = data.user[0];
  return {
    ...user,
    profile: {
      about: user.about,
      company: user.company,
      location: user.location,
      position: user.position,
    },
    user: id,
    ratings: user.usercommunityrating,
    permissions: user.userpermission,
    highestRating: 0,
    postCount: 0,
    answersGiven: 0,
  };
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
