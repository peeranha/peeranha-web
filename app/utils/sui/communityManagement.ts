import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { communityLib, createCommunity, handleMoveCall, updateCommunity } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getSuiUserObject } from 'utils/sui/accountManagement';

export const createSuiCommunity = async (wallet: WalletContextState, community) => {
  const communityIpfsHash = await saveText(JSON.stringify(community));
  const communityTransactionData = getVector8FromIpfsHash(communityIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  const tagsStringData = await Promise.all(
    community.tags.map(async (tag) => await saveText(JSON.stringify(tag))),
  );

  const tagsTransactionData = tagsStringData.map((tag) => getVector8FromIpfsHash(tag));

  return handleMoveCall(wallet, communityLib, createCommunity, [
    userObj.id.id,
    communityTransactionData,
    tagsTransactionData,
  ]);
};

export const updateSuiCommunity = async (wallet: WalletContextState, communityId, community) => {
  const communityIpfsHash = await saveText(JSON.stringify(community));
  const communityTransactionData = getVector8FromIpfsHash(communityIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  return handleMoveCall(wallet, communityLib, updateCommunity, [
    userObj.id.id,
    communityId,
    communityTransactionData,
  ]);
};
