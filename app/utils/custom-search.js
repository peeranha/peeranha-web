import { postsForSearch } from './queries/ethereumService';

export async function getResults(query, single) {
  return await postsForSearch(query, single);
}
