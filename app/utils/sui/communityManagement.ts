import { getText, getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { communityLib, createCommunity, handleMoveCall } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getSuiUserObject } from 'utils/sui/accountManagement';

export const createSuiCommunity = async (wallet: WalletContextState, community) => {
  const communityIpfsHash = await saveText(JSON.stringify(community));
  const communityTransactionData = getVector8FromIpfsHash(communityIpfsHash);
  const userObj = await getSuiUserObject(wallet);

  const tagsStringData = community.tags.map(async (tag) => JSON.parse(await getText(tag)));

  const tagsTransactionData = tagsStringData.map((tag) => getVector8FromIpfsHash(tag));

  return handleMoveCall(wallet, communityLib, createCommunity, [
    userObj.data.pop().data.objectId,
    communityTransactionData,
    tagsTransactionData,
  ]);
};
