import { postsForSearch } from './theGraph';

export async function getResults(query, communityIds) {
  return await postsForSearch(query, communityIds);
}
