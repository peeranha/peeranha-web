const executeQuery = async ({ query, reCaptchaToken, communityId }) => {
  const res = await fetch(process.env.SEMANTIC_SEARCH_URL, {
    method: 'POST',
    body: JSON.stringify({
      query,
      communityId,
    }),
    headers: {
      'Content-Type': 'application/json',
      reCaptchaToken,
    },
  });

  return res.json();
};

export const getSearchResult = async (query, reCaptchaToken, communityId) =>
  await executeQuery({
    query,
    reCaptchaToken,
    communityId,
  });
