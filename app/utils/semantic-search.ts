export enum Network {
  Polygon = 1,
  Edgeware = 2,
  Sui = 3,
}

export async function getSearchResults(
  query: string,
  blockchains: Network[],
  communityId?: number,
): Promise<string[]> {
  const searchResponse = await fetch(process.env.SEARCH_ENDPOINT as RequestInfo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, blockchains, communityId }),
  });
  const result = await searchResponse.json();
  const { ids } = result;
  return ids.map((id: string) => (id.includes('-') ? id.split('-')[1] : id));
}
