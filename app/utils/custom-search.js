import { GOOGLE_SEARCH_FORM_PATH } from './constants';
import { ApplicationError } from './errors';

export async function getResults(query) {
  const res = await fetch(`${GOOGLE_SEARCH_FORM_PATH}&q=${query}`).then(x =>
    x.json(),
  );

  if (res.error) {
    throw new ApplicationError(res.error.message);
  }

  return res.items;
}
