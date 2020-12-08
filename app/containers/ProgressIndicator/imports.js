import { selectEditCommunityLoading } from 'containers/EditCommunity/selectors';
import { selectFollowHandlerLoading } from 'containers/FollowCommunityButton/selectors';
import { selectAskQuestionLoading } from 'containers/AskQuestion/selectors';
import {
  selectChangeEmailProcessing,
  selectSendOldEmailProcessing,
  selectConfirmOldEmailProcessing,
} from 'containers/ChangeEmail/selectors';
import {
  selectSendEmailProcessing,
  selectSubmitEmailProcessing,
  selectChangePasswordProcessing,
} from 'containers/ChangePasswordByPrevious/selectors';
import { selectCreateCommunityLoading } from 'containers/CreateCommunity/selectors';
import { selectSuggestTagLoading } from 'containers/CreateTag/selectors';
import {
  selectSendEmailProcessing as sendEmailDeleteAccount,
  selectDeleteAccountProcessing,
} from 'containers/DeleteAccount/selectors';
import { selectEditAnswerLoading } from 'containers/EditAnswer/selectors';
import { selectIsProfileSaving } from 'containers/EditProfilePage/selectors';
import { selectEditQuestionLoading } from 'containers/EditQuestion/selectors';
import {
  selectChangePasswordLoading,
  selectVerifyEmailLoading,
  selectVerificationCodeLoading,
} from 'containers/ForgotPassword/selectors';
import {
  selectLoginWithWalletProcessing,
  selectFinishRegistrationProcessing,
  selectLoginWithEmailProcessing,
} from 'containers/Login/selectors';
import { selectSendTokensProcessing } from 'containers/SendTokens/selectors';
import { selectShowActiveKeyProcessing } from 'containers/ShowActiveKey/selectors';
import {
  selectShowOwnerKeyProcessing,
  selectSendEmailProcessing as sendEmailShowOwnerKey,
} from 'containers/ShowOwnerKey/selectors';
import {
  selectEmailVerificationProcessing,
  selectIHaveEosAccountProcessing,
  selectIdontHaveEosAccountProcessing,
  selectSignUpWithWalletProcessing,
  selectShowWalletSignUpProcessing,
} from 'containers/SignUp/selectors';
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
  selectVoteToDeleteLoading,
  selectChangeQuestionTypeLoading,
} from 'containers/ViewQuestion/selectors';
import {
  selectUpVoteLoading as upvoteCommunity,
  selectDownVoteLoading as downvoteCommunity,
} from 'containers/VoteForNewCommunityButton/selectors';
import {
  selectUpVoteLoading as upvoteTag,
  selectDownVoteLoading as downvoteTag,
} from 'containers/VoteForNewTagButton/selectors';
import { selectPickupRewardProcessing } from 'containers/Wallet/selectors';
import { selectIsSaveCryptoAccountsProcessing } from '../ViewProfilePage/Tip/selectors';
import {
  selectedAccountProcessingSelector,
  selectSendTipsProcessing,
} from '../SendTips/selectors';
import { selectTopQuestionActionProcessing } from '../Questions/selectors';
import {
  selectGetConfirmTelegramAccountProcessing,
  selectGetUnlinkTelegramAccountProcessing,
} from '../TelegramAccountAction/selectors';

export default {
  selectAskQuestionLoading: selectAskQuestionLoading(),
  selectChangeEmailProcessing: selectChangeEmailProcessing(),
  selectEditCommunityLoading: selectEditCommunityLoading(),
  selectSendOldEmailProcessing: selectSendOldEmailProcessing(),
  selectConfirmOldEmailProcessing: selectConfirmOldEmailProcessing(),
  selectSendEmailProcessing: selectSendEmailProcessing(),
  selectSubmitEmailProcessing: selectSubmitEmailProcessing(),
  selectChangePasswordProcessing: selectChangePasswordProcessing(),
  selectCreateCommunityLoading: selectCreateCommunityLoading(),
  selectSuggestTagLoading: selectSuggestTagLoading(),
  sendEmailDeleteAccount: sendEmailDeleteAccount(),
  selectDeleteAccountProcessing: selectDeleteAccountProcessing(),
  selectEditAnswerLoading: selectEditAnswerLoading(),
  selectIsProfileSaving: selectIsProfileSaving(),
  selectEditQuestionLoading: selectEditQuestionLoading(),
  selectFollowHandlerLoading: selectFollowHandlerLoading(),
  selectVerificationCodeLoading: selectVerificationCodeLoading(),
  selectVerifyEmailLoading: selectVerifyEmailLoading(),
  selectChangePasswordLoading: selectChangePasswordLoading(),
  selectLoginWithEmailProcessing: selectLoginWithEmailProcessing(),
  selectFinishRegistrationProcessing: selectFinishRegistrationProcessing(),
  selectLoginWithWalletProcessing: selectLoginWithWalletProcessing(),
  selectSendTokensProcessing: selectSendTokensProcessing(),
  selectShowActiveKeyProcessing: selectShowActiveKeyProcessing(),
  selectShowOwnerKeyProcessing: selectShowOwnerKeyProcessing(),
  sendEmailShowOwnerKey: sendEmailShowOwnerKey(),
  selectEmailVerificationProcessing: selectEmailVerificationProcessing(),
  selectIHaveEosAccountProcessing: selectIHaveEosAccountProcessing(),
  selectIdontHaveEosAccountProcessing: selectIdontHaveEosAccountProcessing(),
  selectSignUpWithWalletProcessing: selectSignUpWithWalletProcessing(),
  selectShowWalletSignUpProcessing: selectShowWalletSignUpProcessing(),
  selectPostAnswerLoading: selectPostAnswerLoading(),
  selectPostCommentLoading: selectPostCommentLoading(),
  selectUpVoteLoading: selectUpVoteLoading(),
  selectDownVoteLoading: selectDownVoteLoading(),
  selectMarkAsAcceptedLoading: selectMarkAsAcceptedLoading(),
  selectDeleteQuestionLoading: selectDeleteQuestionLoading(),
  selectDeleteAnswerLoading: selectDeleteAnswerLoading(),
  selectDeleteCommentLoading: selectDeleteCommentLoading(),
  selectSaveCommentLoading: selectSaveCommentLoading(),
  selectVoteToDeleteLoading: selectVoteToDeleteLoading(),
  selectChangeQuestionTypeLoading: selectChangeQuestionTypeLoading(),
  upvoteCommunity: upvoteCommunity(),
  downvoteCommunity: downvoteCommunity(),
  upvoteTag: upvoteTag(),
  downvoteTag: downvoteTag(),
  selectPickupRewardProcessing: selectPickupRewardProcessing(),
  selectIsSaveCryptoAccountsProcessing: selectIsSaveCryptoAccountsProcessing(),
  selectedAccountProcessing: selectedAccountProcessingSelector(),
  selectSendTipsProcessing: selectSendTipsProcessing(),
  selectPinActionProcessing: selectTopQuestionActionProcessing(),
  selectGetConfirmTelegramAccountProcessing: selectGetConfirmTelegramAccountProcessing(),
  selectGetUnlinkTelegramAccountProcessing: selectGetUnlinkTelegramAccountProcessing(),
};
