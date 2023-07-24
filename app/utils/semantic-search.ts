import { callService, SEARCH_SERVICE } from 'utils/web_integration/src/util/aws-connector';

export enum Network {
  Polygon = 1,
  Edgeware = 2,
  Sui = 3,
}

export async function getSearchResults(
  query: string,
  blockchains: Network[],
  communityId?: string,
): Promise<string[]> {
  const searchResponse = await callService(SEARCH_SERVICE, { query, blockchains, communityId });
  const { ids } = searchResponse.body;
  return ids.map((id: string) => (id.includes('-') ? id.split('-')[1] : id));
}
