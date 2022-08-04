import { selectEditCommunityLoading } from 'containers/EditCommunity/selectors';
import { selectFollowHandlerLoading } from 'containers/FollowCommunityButton/selectors';
import { selectAskQuestionLoading } from 'containers/AskQuestion/selectors';
import { selectCreateCommunityLoading } from 'containers/CreateCommunity/selectors';
import { selectEditTagProcessing } from 'containers/EditTag/selectors';
import { selectDeleteAccountProcessing } from 'containers/DeleteAccount/selectors';
import { selectEditAnswerLoading } from 'containers/EditAnswer/selectors';
import { selectIsProfileSaving } from 'containers/EditProfilePage/selectors';
import { selectEditQuestionLoading } from 'containers/EditQuestion/selectors';
import { selectSendTokensProcessing } from 'containers/SendTokens/selectors';
import {
  selectPostAnswerLoading,
  selectPostCommentLoading,
  selectUpVoteLoading,
  selectDownVoteLoading,
  selectMarkAsAcceptedLoading,
  selectDeleteQuestionLoading,
  selectDeleteAnswerLoading,
  selectDeleteCommentLoading,
  selectSaveCommentLoading,
  selectChangeQuestionTypeLoading,
} from 'containers/ViewQuestion/selectors';
import { selectPickupRewardProcessing } from 'containers/Wallet/selectors';
import { selectTopQuestionActionProcessing } from '../Questions/selectors';
import { selectChangeStakeLoading } from '../Boost/selectors';
import {
  selectTransactionHash,
  selectTransactionInPending,
} from '../EthereumProvider/selectors';

export default {
  selectAskQuestionLoading: selectAskQuestionLoading(),
  selectEditCommunityLoading: selectEditCommunityLoading(),
  selectCreateCommunityLoading: selectCreateCommunityLoading(),
  selectEditTagProcessing: selectEditTagProcessing(),
  selectDeleteAccountProcessing: selectDeleteAccountProcessing(),
  selectEditAnswerLoading: selectEditAnswerLoading(),
  selectIsProfileSaving: selectIsProfileSaving(),
  selectEditQuestionLoading: selectEditQuestionLoading(),
  selectFollowHandlerLoading: selectFollowHandlerLoading(),
  selectSendTokensProcessing: selectSendTokensProcessing(),
  selectPostAnswerLoading: selectPostAnswerLoading(),
  selectPostCommentLoading: selectPostCommentLoading(),
  selectUpVoteLoading: selectUpVoteLoading(),
  selectDownVoteLoading: selectDownVoteLoading(),
  selectMarkAsAcceptedLoading: selectMarkAsAcceptedLoading(),
  selectDeleteQuestionLoading: selectDeleteQuestionLoading(),
  selectDeleteAnswerLoading: selectDeleteAnswerLoading(),
  selectDeleteCommentLoading: selectDeleteCommentLoading(),
  selectSaveCommentLoading: selectSaveCommentLoading(),
  selectChangeQuestionTypeLoading: selectChangeQuestionTypeLoading(),
  selectPickupRewardProcessing: selectPickupRewardProcessing(),
  selectPinActionProcessing: selectTopQuestionActionProcessing(),
  selectChangeStakeLoading: selectChangeStakeLoading(),
  selectTransactionInPending: selectTransactionInPending(),
  selectTransactionHash: selectTransactionHash(),
};
