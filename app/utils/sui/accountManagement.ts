import { ApplicationError } from 'utils/errors';
import { getOwnedObject, userLib, userObject } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';

export const isSuiUserExists = async (wallet: WalletContextState) => {
  if (!wallet.connected) throw new ApplicationError('No profile');
  const userObjects = await getOwnedObject(userLib, userObject, wallet.address);
  return Boolean(userObjects?.data?.length);
};

export const getSuiUserObject = async (address: string | undefined) => {
  if (!address) throw new ApplicationError('No profile');

  const profileObjects = (await getOwnedObject(userLib, userObject, address))?.data.sort(
    (first, second) => Number(second?.data?.version) - Number(first?.data?.version),
  );
  return profileObjects ? profileObjects[0]?.data?.content?.fields : null;
};
