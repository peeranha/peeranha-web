export const getSuiUsers = async () => {
  const query = `query {
    user {
      id
      displayName
      company
      position
      location
      about
      avatar
    }
  }`;

  try {
    const response = await fetch('https://ue2ez6lhhi.execute-api.us-east-2.amazonaws.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data.data.user);
  } catch (error) {
    console.error(error);
  }
};
