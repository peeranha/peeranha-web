const executeQuery = async ({ query, communityId, threadId }) => {
  const requestBody = {
    query,
    communityId,
  };

  if (threadId) {
    requestBody.threadId = threadId;
  }
  return fetch('https://orpbzrwr25kteba3dsftyghdom0nykmi.lambda-url.us-east-2.on.aws/', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getSearchResult = async (query, communityId, threadId) => {
  const response = await executeQuery({
    query,
    communityId,
    threadId,
  });
  return response.body.getReader();
};
