import { ApplicationError } from 'utils/errors';
import { getOwnedObject, userLib, userObject } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';

export const isSuiUserExists = async (wallet: WalletContextState) => {
  if (!wallet.connected) throw new ApplicationError('No profile');
  const userObjects = await getOwnedObject(userLib, userObject, wallet.account?.address);
  return Boolean(userObjects?.data?.length);
};
