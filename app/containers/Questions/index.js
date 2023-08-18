import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import history from 'createdHistory';
import * as routes from 'routes-config';
import usePagination from 'hooks/usePagination';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getSearchParams } from 'utils/url';
import { DAEMON, POST_TYPE, AMOUNT_POSTS_PAGINATION } from 'utils/constants';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getCookie } from 'utils/cookie';
import { isUserTopCommunityQuestionsModerator } from 'utils/properties';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectAccount,
  makeSelectFollowedCommunities,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { showLoginModal, loginWithSui } from 'containers/Login/actions';
import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import ScrollToTop from 'components/ScrollToTop/index';
import TopCommunities from 'components/TopCommunities';
import Seo from 'components/Seo';

import { getQuestions, setCreatedFilter, setTypeFilter } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';

import Content from './Content/Content';
import Banner from './Banner';
import Header from './Header';
import NotFound from '../ErrorPage';
import { QUESTION_FILTER } from './constants';

const single = isSingleCommunityWebsite();

export const Questions = ({
  locale,
  questionsList,
  questionsLoading,
  topQuestionsLoading,
  communities,
  followedCommunities,
  parentPage,
  communitiesLoading,
  profile,
  match: { params, path },
  redirectToAskQuestionPageDispatch,
  typeFilter,
  createdFilter,
  setTypeFilterDispatch,
  initLoadedItems,
  nextLoadedItems,
  getQuestionsDispatch,
  questionFilter,
  isLastTopQuestionLoaded,
  loginWithSuiDispatch,
  postsTypes,
  questionsCount,
}) => {
  const { t } = useTranslation();
  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } =
    usePagination({
      contentPerPage: AMOUNT_POSTS_PAGINATION,
      count: questionsCount,
    });

  const skip = page * AMOUNT_POSTS_PAGINATION;
  const isFeed = window.location.pathname === routes.feed(params.communityid);
  const isNotFollowedCommunities = isEmpty(followedCommunities) || followedCommunities[0] === 0;
  const isExpert = path === routes.expertPosts() || path === routes.expertPosts(':communityid');
  const isTopCommunitiesDisplay =
    isFeed &&
    !single &&
    questionsList.length === 0 &&
    !questionsLoading &&
    isNotFollowedCommunities;
  const getInitQuestions = useCallback(() => {
    if (!questionFilter) {
      const searchParamsTags = getSearchParams(history.location.search);
      getQuestionsDispatch(
        initLoadedItems,
        0,
        postsTypes,
        searchParamsTags,
        params.communityid || 0,
        parentPage,
        false,
        true,
      );
    }
  }, [
    questionFilter,
    getQuestionsDispatch,
    initLoadedItems,
    postsTypes,
    params.communityid,
    parentPage,
  ]);
  useEffect(() => {
    if (page > 1 && !questionFilter) {
      const searchParamsTags = getSearchParams(history.location.search);
      getQuestionsDispatch(
        nextLoadedItems,
        skip,
        postsTypes,
        searchParamsTags,
        params.communityid || 0,
        parentPage,
        true,
      );
    }
  }, [
    getQuestionsDispatch,
    nextLoadedItems,
    page,
    params.communityid,
    parentPage,
    postsTypes,
    questionFilter,
    skip,
  ]);

  useEffect(() => {
    getInitQuestions();
    if (page !== 1) {
      setPage(1);
    }
  }, [postsTypes]);

  useEffect(() => {
    setTypeFilterDispatch(params.communityid ? +params.communityid : 0);
  }, [params.communityid, setTypeFilterDispatch]);

  const display = useMemo(() => !(single && path === routes.questions(':communityid')), [path]);

  const displayBanner = useMemo(
    () =>
      !(getCookie(QUESTION_FILTER) === '1' || questionFilter === 1)
        ? !questionsList.length && !questionsLoading && !topQuestionsLoading && !communitiesLoading
        : false,
    [
      questionsList.length,
      questionsLoading,
      topQuestionsLoading,
      communitiesLoading,
      questionFilter,
    ],
  );

  const displayLoader = useMemo(
    () =>
      (!questionsList.length && questionsLoading) ||
      questionsLoading ||
      topQuestionsLoading ||
      communitiesLoading ||
      (getCookie(QUESTION_FILTER) === '1' && !isLastTopQuestionLoaded),
    [
      questionsList,
      questionsLoading,
      topQuestionsLoading,
      communitiesLoading,
      isLastTopQuestionLoaded,
    ],
  );

  const isModerator = useMemo(
    () => isUserTopCommunityQuestionsModerator(profile?.permissions ?? [], single),
    [profile],
  );

  const getTabTitle = () => {
    if (postsTypes.length === 1) {
      switch (postsTypes[0]) {
        case POST_TYPE.generalPost:
          return 'common.discussions';
        case POST_TYPE.expertPost:
          return 'common.expertPosts';
        case POST_TYPE.tutorial:
          return 'common.tutorials';
        default:
          return 'post.questions.title';
      }
    } else {
      return `common.${profile ? 'myFeed' : 'feed'}`;
    }
  };

  const questionFilterFromCookies = getCookie(QUESTION_FILTER);
  return display ? (
    <div>
      <Seo
        title={t(getTabTitle())}
        description={t('post.questions.description')}
        language={locale}
      />
      <ScrollToTop />
      <Header
        communityIdFilter={params.communityid || 0}
        followedCommunities={followedCommunities}
        parentPage={parentPage}
        typeFilter={typeFilter}
        createdFilter={createdFilter}
        setTypeFilter={setTypeFilterDispatch}
        questionFilterFromCookies={questionFilterFromCookies}
        isExpert={isExpert}
        postsTypes={postsTypes}
        locale={locale}
      />
      {displayBanner && (
        <Banner
          isFeed={isFeed}
          followedCommunities={followedCommunities}
          redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
          isEmpty={questionsList.length === 0}
          isSingleCommunityMode={single}
          profileInfo={profile}
          loginWithSuiDispatch={loginWithSuiDispatch}
        />
      )}
      {questionsList.length > 0 && (
        <Content
          isFeed={isFeed}
          questionsList={questionsList}
          locale={locale}
          communities={communities}
          typeFilter={typeFilter}
          createdFilter={createdFilter}
          isModerator={isModerator}
          profileInfo={profile}
          firstContentIndex={firstContentIndex}
          lastContentIndex={lastContentIndex}
          nextPage={nextPage}
          prevPage={prevPage}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
      {isTopCommunitiesDisplay && (
        <TopCommunities
          communities={communities}
          profile={profile}
          isTopCommunitiesOnly
          locale={locale}
        />
      )}
      {!questionsList.length && displayLoader && <LoadingIndicator />}
    </div>
  ) : (
    <NotFound />
  );
};

Questions.propTypes = {
  locale: PropTypes.string,
  parentPage: PropTypes.string,
  account: PropTypes.string,
  communities: PropTypes.array,
  followedCommunities: PropTypes.array,
  questionsList: PropTypes.array,
  questionsLoading: PropTypes.bool,
  topQuestionsLoading: PropTypes.bool,
  promotedQuestions: PropTypes.object,
  communitiesLoading: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  match: PropTypes.object,
  getQuestionsDispatch: PropTypes.func,
  redirectToAskQuestionPageDispatch: PropTypes.func,
  profile: PropTypes.object,
  typeFilter: PropTypes.any,
  createdFilter: PropTypes.any,
  setTypeFilterDispatch: PropTypes.func,
  questionFilter: PropTypes.number,
  loginWithSuiDispatch: PropTypes.func,
  isLastTopQuestionLoaded: PropTypes.bool,
};

export default compose(
  injectReducer({ key: 'questionsReducer', reducer }),
  injectSaga({ key: 'questionsReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      account: makeSelectAccount(),
      profile: makeSelectProfileInfo(),
      locale: makeSelectLocale(),
      communities: selectCommunities(),
      communitiesLoading: selectCommunitiesLoading(),
      questionsCount: questionsSelector.selectQuestionsCount(),
      followedCommunities: makeSelectFollowedCommunities(),
      questionsLoading: questionsSelector.selectQuestionsLoading(),
      topQuestionsLoading: questionsSelector.selectTopQuestionsLoading(),
      initLoadedItems: questionsSelector.selectInitLoadedItems(),
      nextLoadedItems: questionsSelector.selectNextLoadedItems(),
      typeFilter: questionsSelector.selectTypeFilter(),
      createdFilter: questionsSelector.selectCreatedFilter(),
      questionFilter: questionsSelector.selectQuestionFilter(),
      questionsList: (state, props) =>
        questionsSelector.selectQuestions(props.parentPage, props.match.params.communityid)(state),
      isLastTopQuestionLoaded: questionsSelector.isLastTopQuestionLoadedSelector,
      promotedQuestions: questionsSelector.selectPromotedQuestions(),
    }),
    (dispatch) => ({
      setTypeFilterDispatch: bindActionCreators(setTypeFilter, dispatch),
      setCreatedFilterDispatch: bindActionCreators(setCreatedFilter, dispatch),
      getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
      showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
      redirectToAskQuestionPageDispatch: bindActionCreators(redirectToAskQuestionPage, dispatch),
      loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
    }),
  ),
)(Questions);
