import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { scrollToSection } from 'utils/animation';
import { getPermissions, hasGlobalModeratorRole } from 'utils/properties';

import * as routes from 'routes-config';

import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { redirectToEditAnswerPage } from 'containers/EditAnswer/actions';
import { loginWithWallet, loginWithSui } from 'containers/Login/actions';

import {
  saveComment,
  deleteComment,
  deleteAnswer,
  deleteQuestion,
  getQuestionData,
  postAnswer,
  postComment,
  checkAddCommentAvailable,
  hideAddCommentForm,
  upVote,
  downVote,
  markAsAccepted,
  voteToDelete,
  resetStore,
  getHistories,
} from './actions';

import * as makeSelectViewQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';

import ViewQuestionContainer from './ViewQuestionContainer';
import { POST_TYPE } from 'utils/constants';

const getRoute = (postType) => {
  if (postType === POST_TYPE.generalPost) {
    return 'questionView';
  }

  if (postType === POST_TYPE.expertPost) {
    return 'expertPostView';
  }

  return 'tutorialView';
};

export const ViewQuestion = ({
  locale,
  histories,
  account,
  questionData,
  postAnswerLoading,
  postCommentLoading,
  questionDataLoading,
  questionDataError,
  saveCommentLoading,
  communities,
  upVoteLoading,
  downVoteLoading,
  markAsAcceptedLoading,
  deleteQuestionLoading,
  deleteAnswerLoading,
  deleteCommentLoading,
  voteToDeleteLoading,
  postAnswerDispatch,
  deleteAnswerDispatch,
  deleteQuestionDispatch,
  postCommentDispatch,
  checkAddCommentAvailableDispatch,
  hideAddCommentFormDispatch,
  addCommentFormDisplay,
  saveCommentDispatch,
  deleteCommentDispatch,
  upVoteDispatch,
  downVoteDispatch,
  markAsAcceptedDispatch,
  voteToDeleteDispatch,
  getQuestionDataDispatch,
  redirectToEditQuestionPageDispatch,
  redirectToEditAnswerPageDispatch,
  ids,
  resetStoreDispatch,
  getHistoriesDispatch,
  match,
  profile,
  loginWithSuiDispatch,
  history,
  loginWithWalletDispatch,
}) => {
  const { t } = useTranslation();
  const showLoginModal = () => loginWithWalletDispatch({ metaMask: true });
  useEffect(() => {
    if (questionData) {
      const route = getRoute(questionData.postType);

      if (match.url !== routes[route](match.params.id, questionData.title)) {
        history.push(routes[route](match.params.id, questionData.title));
      }
    }
  }, [history, match.params.id, match.url, questionData]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      resetStoreDispatch();
    };
  }, []);

  useEffect(() => {
    getQuestionDataDispatch(match.params.id);
  }, [match.params.id, account]);

  useEffect(() => {
    getHistoriesDispatch(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (questionData) {
      setTimeout(scrollToSection, 250);
    }

    if (questionData && !questionDataLoading) {
      window.isRendered = true;
    }

    if (!questionDataLoading && !questionData) {
      history.push(questionDataError ? routes.errorPage() : routes.notFound());
    }

    if (questionData?.isDeleted) {
      history.push(routes.notFound('type=deleted'));
    }
  }, [questionData, questionDataLoading]);

  const [isChangeTypeAvailable, infiniteImpact] = useMemo(
    () => [
      hasGlobalModeratorRole(getPermissions(profile)),
      hasGlobalModeratorRole(getPermissions(profile)),
    ],
    [profile, questionData],
  );

  const isAnswered = !!questionData?.answers.filter((x) => x.author.id === account).length;

  const commId = questionData?.communityId ?? null;

  const sendProps = {
    account,
    histories,
    locale,
    communities,
    questionData,
    translations: questionData?.translations,
    id2: questionData?.id2,
    postAnswerLoading,
    postCommentLoading,
    saveCommentLoading,
    postAnswer: postAnswerDispatch,
    deleteAnswer: deleteAnswerDispatch,
    deleteQuestion: deleteQuestionDispatch,
    postComment: postCommentDispatch,
    checkAddCommentAvailable: checkAddCommentAvailableDispatch,
    hideAddCommentForm: hideAddCommentFormDispatch,
    addCommentFormDisplay,
    saveComment: saveCommentDispatch,
    deleteComment: deleteCommentDispatch,
    upVote: upVoteDispatch,
    downVote: downVoteDispatch,
    markAsAccepted: markAsAcceptedDispatch,
    voteToDelete: voteToDeleteDispatch,
    upVoteLoading,
    downVoteLoading,
    markAsAcceptedLoading,
    deleteQuestionLoading,
    deleteAnswerLoading,
    deleteCommentLoading,
    voteToDeleteLoading,
    redirectToEditQuestionPage: redirectToEditQuestionPageDispatch,
    redirectToEditAnswerPage: redirectToEditAnswerPageDispatch,
    ids,
    isChangeTypeAvailable,
    infiniteImpact,
    isAnswered,
    commId,
    profile,
    loginWithSuiDispatch,
    showLoginModal,
  };

  const helmetTitle = questionData?.title || t('post.Post');

  const helmetDescription = questionData?.content ?? t('post.Post');

  const articlePublishedTime = questionData?.postTime ? new Date(questionData.postTime * 1000) : ``;

  const articleModifiedTime = questionData?.lastEditedDate
    ? new Date(questionData.lastEditedDate * 1000)
    : ``;

  const keywords = [...(questionData?.tags?.map((tag) => tag.name) ?? []), helmetTitle];

  return (
    <>
      <Seo
        title={helmetTitle}
        description={helmetDescription}
        language={locale}
        keywords={keywords}
        articlePublishedTime={articlePublishedTime}
        articleModifiedTime={articleModifiedTime}
      />

      {questionData && <ViewQuestionContainer {...sendProps} />}
      {!questionData && <LoadingIndicator />}
    </>
  );
};

ViewQuestion.propTypes = {
  account: PropTypes.string,
  histories: PropTypes.array,
  historiesLoading: PropTypes.bool,
  getHistoriesDispatch: PropTypes.func,
  locale: PropTypes.string,
  communities: PropTypes.array,
  questionDataLoading: PropTypes.bool,
  postAnswerLoading: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  saveCommentLoading: PropTypes.bool,
  questionData: PropTypes.object,
  questionBounty: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  getQuestionDataDispatch: PropTypes.func,
  postAnswerDispatch: PropTypes.func,
  postCommentDispatch: PropTypes.func,
  checkAddCommentAvailableDispatch: PropTypes.func,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  markAsAcceptedDispatch: PropTypes.func,
  deleteQuestionDispatch: PropTypes.func,
  deleteAnswerDispatch: PropTypes.func,
  saveCommentDispatch: PropTypes.func,
  deleteCommentDispatch: PropTypes.func,
  voteToDeleteDispatch: PropTypes.func,
  resetStoreDispatch: PropTypes.func,
  upVoteLoading: PropTypes.bool,
  downVoteLoading: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  deleteQuestionLoading: PropTypes.bool,
  deleteAnswerLoading: PropTypes.bool,
  deleteCommentLoading: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  redirectToEditQuestionPageDispatch: PropTypes.func,
  redirectToEditAnswerPageDispatch: PropTypes.func,
  ids: PropTypes.array,
  profile: PropTypes.object,
  loginWithWalletDispatch: PropTypes.func,
  loginWithSuiDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    account: makeSelectAccount(),
    locale: makeSelectLocale(),
    communities: selectCommunities(),
    profile: makeSelectProfileInfo(),
    questionDataLoading: makeSelectViewQuestion.selectQuestionDataLoading(),
    questionDataError: makeSelectViewQuestion.selectQuestionDataError(),
    questionData: makeSelectViewQuestion.selectQuestionData(),
    questionBounty: makeSelectViewQuestion.selectQuestionBounty(),
    addCommentFormDisplay: makeSelectViewQuestion.selectAddCommentFormDisplay(),
    postCommentLoading: makeSelectViewQuestion.selectPostCommentLoading(),
    postAnswerLoading: makeSelectViewQuestion.selectPostAnswerLoading(),
    saveCommentLoading: makeSelectViewQuestion.selectSaveCommentLoading(),
    upVoteLoading: makeSelectViewQuestion.selectUpVoteLoading(),
    downVoteLoading: makeSelectViewQuestion.selectDownVoteLoading(),
    markAsAcceptedLoading: makeSelectViewQuestion.selectMarkAsAcceptedLoading(),
    deleteQuestionLoading: makeSelectViewQuestion.selectDeleteQuestionLoading(),
    deleteAnswerLoading: makeSelectViewQuestion.selectDeleteAnswerLoading(),
    deleteCommentLoading: makeSelectViewQuestion.selectDeleteCommentLoading(),
    voteToDeleteLoading: makeSelectViewQuestion.selectVoteToDeleteLoading(),
    ids: makeSelectViewQuestion.selectIds(),
    histories: makeSelectViewQuestion.selectHistories(),
    historiesLoading: makeSelectViewQuestion.selectHistoriesLoading(),
  }),
  (
    dispatch,
    {
      match: {
        params: { id: questionId },
      },
    },
  ) => ({
    postAnswerDispatch: bindActionCreators(postAnswer.bind(null, questionId), dispatch),
    deleteAnswerDispatch: bindActionCreators(deleteAnswer.bind(null, questionId), dispatch),
    deleteQuestionDispatch: bindActionCreators(
      deleteQuestion.bind(null, questionId, false),
      dispatch,
    ),
    postCommentDispatch: bindActionCreators(postComment.bind(null, questionId), dispatch),
    checkAddCommentAvailableDispatch: bindActionCreators(checkAddCommentAvailable, dispatch),
    hideAddCommentFormDispatch: bindActionCreators(hideAddCommentForm, dispatch),
    saveCommentDispatch: bindActionCreators(saveComment.bind(null, questionId), dispatch),
    deleteCommentDispatch: bindActionCreators(deleteComment.bind(null, questionId), dispatch),
    upVoteDispatch: bindActionCreators(upVote.bind(null, questionId), dispatch),
    downVoteDispatch: bindActionCreators(downVote.bind(null, questionId), dispatch),
    markAsAcceptedDispatch: bindActionCreators(markAsAccepted.bind(null, questionId), dispatch),
    voteToDeleteDispatch: bindActionCreators(voteToDelete.bind(null, questionId), dispatch),
    getQuestionDataDispatch: bindActionCreators(getQuestionData, dispatch),
    resetStoreDispatch: bindActionCreators(resetStore, dispatch),
    redirectToEditQuestionPageDispatch: bindActionCreators(redirectToEditQuestionPage, dispatch),
    redirectToEditAnswerPageDispatch: bindActionCreators(redirectToEditAnswerPage, dispatch),
    getHistoriesDispatch: bindActionCreators(getHistories, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'viewQuestion', reducer });
const withSaga = injectSaga({
  key: 'viewQuestion',
  saga,
  disableEject: true,
});

export default compose(withReducer, withSaga, withConnect)(ViewQuestion);
