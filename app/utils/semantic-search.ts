export enum Network {
  Polygon = 1,
  Edgeware = 2,
  Sui = 3,
}

export async function getSearchResults(
  query: string,
  blockchains: number[],
  communityId?: number,
): Promise<string[]> {
  const searchResponse = await fetch(process.env.SEARCH_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, blockchains, communityId }),
  });
  const result = await searchResponse.json();
  const { ids } = result;
  return ids;
}
