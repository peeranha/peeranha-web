import { ApplicationError } from 'utils/errors';
import { IS_USER_EXISTS } from 'utils/ethConstants';
import { getOwnedObject, userLib, userObject } from 'utils/sui/sui';

export const isSuiUserExists = async (wallet) => {
  const profile = await getOwnedObject(userLib, userObject, wallet.account?.address);
  console.log(profile);
  if (!profile) throw new ApplicationError('No profile');
};
