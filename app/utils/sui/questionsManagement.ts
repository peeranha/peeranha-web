import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { createPost, handleMoveCall, postLib, USER_RATING_COLLECTION } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';

export async function postSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  communitySuiId: string,
  questionData: object,
  postType: number,
  tags: Array<object>,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, createPost, [
    USER_RATING_COLLECTION,
    userSuiId,
    communitySuiId,
    ipfsHash,
    postType,
    tags,
  ]);
}
