import { ApplicationError } from 'utils/errors';
import {
  getOwnedObject,
  userLib,
  userObject,
  handleMoveCall,
  grantRole,
  revokeRole,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getVector8FromRole } from 'utils/ipfs';

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

export const giveSuiRolePermission = async (
  wallet: WalletContextState,
  adminId: string,
  userId: string,
  role: number,
  suiCommunityId: string,
) => {
  const roleTransactionData = getVector8FromRole(role, suiCommunityId);
  return handleMoveCall(
    wallet,
    userLib,
    grantRole,
    [process.env.USER_ROLES_COLLECTION_ID, adminId, userId, roleTransactionData],
    false,
  );
};

export const revokeSuiRolePermission = async (
  wallet: WalletContextState,
  adminId: string,
  userId: string,
  role: number,
  suiCommunityId: string,
) => {
  const roleTransactionData = getVector8FromRole(role, suiCommunityId);
  return handleMoveCall(
    wallet,
    userLib,
    revokeRole,
    [process.env.USER_ROLES_COLLECTION_ID, adminId, userId, roleTransactionData],
    false,
  );
};
