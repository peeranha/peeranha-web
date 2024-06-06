const executeQuery = async ({ query, communityId }) =>
  fetch('https://orpbzrwr25kteba3dsftyghdom0nykmi.lambda-url.us-east-2.on.aws/', {
    method: 'POST',
    body: JSON.stringify({
      query,
      communityId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getSearchResult = async (query, communityId) => {
  const response = await executeQuery({
    query,
    communityId,
  });
  return response.body.getReader();
};
