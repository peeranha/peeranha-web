const executeQuery = async ({ query, communityId, threadId }) => {
  const requestBody = {
    query,
    communityId,
  };

  if (threadId) {
    requestBody.threadId = threadId;
  }
  return fetch(process.env.SEMANTIC_SEARCH_URL, {
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
