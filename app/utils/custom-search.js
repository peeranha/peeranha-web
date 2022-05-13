import { postsForSearch } from './theGraph';

export async function getResults(query, single) {
  return postsForSearch(query, single);
}
