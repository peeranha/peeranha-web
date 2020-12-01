import { GOOGLE_SEARCH_FORM_PATH } from './constants';
import { ApplicationError } from './errors';

import { getGoogleVerificationData } from './communityManagement';

export async function getResults(query) {
  const { formKey, engineKey } = getGoogleVerificationData();

  const res = await fetch(
    `${GOOGLE_SEARCH_FORM_PATH(formKey, engineKey)}&q=${query}`,
  ).then(x => x.json());

  if (res.error) {
    throw new ApplicationError(res.error.message);
  }

  return res.items;
}
