import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { saveText } from 'utils/ipfs';
import { selectEditTagData } from 'containers/TagsOfCommunity/selectors';
import { selectExistingTags } from 'containers/Tags/selectors';

import { getTagsSuccess, updateTagOfCommunity } from 'containers/DataCacheProvider/actions';
import { editTag } from 'utils/communityManagement';
import { getEditTagFormSuccess, getEditTagFormErr, editTagSuccess, editTagErr } from './actions';
import { EDIT_TAG, GET_EDIT_TAG_FORM } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { GET_EXISTING_TAGS } from '../Tags/constants';
import { getExistingTagsWorker } from '../Tags/saga';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { updateSuiTag } from 'utils/sui/communityManagement';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { getSuiCommunityTags } from 'utils/sui/suiIndexer';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

export function* getEditTagFormWorker() {
  try {
    yield put(getEditTagFormSuccess());
  } catch (err) {
    yield put(getEditTagFormErr(err));
  }
}

export function* editTagWorker({ tag, reset }) {
  try {
    console.log(tag);
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const communities = yield select(selectCommunities());
      const suiCommunityId = communities.find((community) => community.id == tag.communityId).suiId;
      const txResult = yield call(
        updateSuiTag,
        wallet,
        suiCommunityId,
        tag.tagId.split('-')[1],
        tag,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
      const tags = (yield call(getSuiCommunityTags, suiCommunityId)).map((tag) => ({
        ...tag,
        label: tag.name,
      }));

      yield put(getTagsSuccess({ [tag.communityId]: tags }));
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);
      const { communityId, tagId } = yield select(selectEditTagData());
      const tags = yield select(selectExistingTags());
      console.log(tags);
      console.log(communityId);
      const editingTag = tags[communityId]?.find((tg) => tg.id === tagId);

      const tagIpfsHash = yield saveText(JSON.stringify(tag));
      const updatedTag = {
        ...editingTag,
        name: tag.name,
        label: tag.name,
        description: tag.description,
        ipfs_description: tagIpfsHash,
      };

      yield call(editTag, selectedAccount, ethereumService, tag, tag.tagId);
      yield put(updateTagOfCommunity(communityId, tagId, updatedTag));
    }

    yield put(editTagSuccess());

    yield call(reset);

    yield call(createdHistory.push, routes.communityTags(tag.communityId));
    yield put(editTagErr());
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(editTagErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_EDIT_TAG_FORM, getEditTagFormWorker);
  yield takeLatest(EDIT_TAG, editTagWorker);
  yield takeLatest(GET_EXISTING_TAGS, getExistingTagsWorker);
}
