import { postsForSearch } from './theGraph';

export async function getResults(query, single) {
  return await postsForSearch(query, single);
}
