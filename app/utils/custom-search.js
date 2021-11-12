import { postsForSearch } from './theGraph';

export async function getResults(query) {
  return await postsForSearch(query);
}
