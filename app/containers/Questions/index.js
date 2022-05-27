/* eslint no-unused-expressions: 0 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { translationMessages } from 'i18n';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getCookie, setCookie } from 'utils/cookie';
import { isUserTopCommunityQuestionsModerator } from 'utils/properties';
import { FetcherOfQuestionsForFollowedCommunities } from 'utils/questionsManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  makeSelectAccount,
  makeSelectFollowedCommunities,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import ScrollToTop from 'components/ScrollToTop/index';
import InfinityLoader from 'components/InfinityLoader';
import TopCommunities from 'components/TopCommunities';
import Seo from 'components/Seo';

import {
  getQuestions,
  loadTopCommunityQuestions,
  setCreatedFilter,
  setTypeFilter,
} from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Content from './Content/Content';
import Banner from './Banner';
import Header from './Header';
import NotFound from '../ErrorPage';
import ShowMoreButton from './Content/ShowMoreButton';

import { QUESTION_FILTER, UPDATE_PROMO_QUESTIONS } from './constants';

const single = isSingleCommunityWebsite();

export const Questions = ({
  locale,
  questionsList,
  questionsLoading,
  topQuestionsLoading,
  promotedQuestions,
  isLastFetch,
  communities,
  followedCommunities,
  parentPage,
  communitiesLoading,
  account,
  profile,
  match: { params, path },
  redirectToAskQuestionPageDispatch,
  typeFilter,
  createdFilter,
  setTypeFilterDispatch,
  initLoadedItems,
  loadedItems,
  nextLoadedItems,
  getQuestionsDispatch,
  questionFilter,
  loadTopQuestionsDispatch,
  isLastTopQuestionLoaded,
  postsTypes,
}) => {
  const isFeed = window.location.pathname === routes.feed(params.communityid);

  const isExpert =
    path === routes.expertPosts() ||
    path === routes.expertPosts(':communityid');
  const isTopCommunitiesDisplay =
    isFeed && !single && questionsList.length === 0;
  const getInitQuestions = useCallback(
    () => {
      if (!questionFilter) {
        getQuestionsDispatch(
          initLoadedItems,
          0,
          postsTypes,
          Number(params.communityid) || 0,
          parentPage,
          false,
          true,
        );
      }
    },
    [
      initLoadedItems,
      params.communityid,
      parentPage,
      questionFilter,
      postsTypes,
    ],
  );

  const getNextQuestions = useCallback(
    () => {
      if (!questionFilter) {
        getQuestionsDispatch(
          nextLoadedItems,
          loadedItems,
          postsTypes,
          Number(params.communityid) || 0,
          parentPage,
          true,
        );
      }
    },
    [
      questionsList,
      questionsList.length,
      nextLoadedItems,
      params.communityid,
      parentPage,
      questionFilter,
      loadTopQuestionsDispatch,
      postsTypes,
    ],
  );

  useEffect(
    () => {
      getInitQuestions();
    },
    [typeFilter, createdFilter, postsTypes],
  );

  useEffect(
    () => {
      setTypeFilterDispatch(params.communityid ? +params.communityid : 0);
    },
    [params.communityid],
  );

  const display = useMemo(
    () => !(single && path === routes.questions(':communityid')),
    [single, path],
  );

  const displayBanner = useMemo(
    () =>
      !(getCookie(QUESTION_FILTER) === '1' || questionFilter === 1)
        ? !questionsList.length &&
          !questionsLoading &&
          !topQuestionsLoading &&
          !communitiesLoading
        : false,
    [
      questionsList.length,
      questionsLoading,
      topQuestionsLoading,
      communitiesLoading,
      questionFilter,
    ],
  );

  const lastFetched = useMemo(
    () => (!questionFilter ? isLastFetch : isLastTopQuestionLoaded),
    [isLastFetch, isLastTopQuestionLoaded, questionFilter],
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
    () =>
      isUserTopCommunityQuestionsModerator(profile?.permissions ?? [], single),
    [profile],
  );

  const isCommunityFeed = params.hasOwnProperty('communityid');

  const questionFilterFromCookies = getCookie(QUESTION_FILTER);
  return display ? (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
      />
      <ScrollToTop />
      <Header
        communityIdFilter={Number(params.communityid) || 0}
        followedCommunities={followedCommunities}
        parentPage={parentPage}
        typeFilter={typeFilter}
        createdFilter={createdFilter}
        setTypeFilter={setTypeFilterDispatch}
        questionFilterFromCookies={questionFilterFromCookies}
        isExpert={isExpert}
        postsTypes={postsTypes}
      />
      {displayBanner && (
        <Banner
          isFeed={isFeed}
          followedCommunities={followedCommunities}
          redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
        />
      )}
      {questionsList.length > 0 && (
        <InfinityLoader
          loadNextPaginatedData={getNextQuestions}
          isLoading={questionsLoading || topQuestionsLoading}
          isLastFetch={lastFetched}
        >
          <Content
            isFeed={isFeed}
            isCommunityFeed={isCommunityFeed}
            questionsList={questionsList}
            // promotedQuestionsList={
            //   promotedQuestions[+questionFilterFromCookies ? 'top' : 'all']
            // }
            locale={locale}
            communities={communities}
            typeFilter={typeFilter}
            createdFilter={createdFilter}
            isModerator={isModerator}
            profileInfo={profile}
          />

          {!!+questionFilterFromCookies &&
            !displayLoader && (
              <div className="d-flex justify-content-center mb-3">
                <ShowMoreButton
                  questionFilterFromCookies={questionFilterFromCookies}
                >
                  {translationMessages[locale][messages.showAllQuestions.id]}
                </ShowMoreButton>
              </div>
            )}
        </InfinityLoader>
      )}
      {isTopCommunitiesDisplay && (
        <TopCommunities communities={communities} profile={profile} />
      )}
      {displayLoader && <LoadingIndicator />}
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
  isLastFetch: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  match: PropTypes.object,
  getQuestionsDispatch: PropTypes.func,
  redirectToAskQuestionPageDispatch: PropTypes.func,
  eosService: PropTypes.object,
  profile: PropTypes.object,
  typeFilter: PropTypes.any,
  createdFilter: PropTypes.any,
  setTypeFilterDispatch: PropTypes.func,
  questionFilter: PropTypes.number,
  loadTopQuestionsDispatch: PropTypes.func,
  isLastTopQuestionLoaded: PropTypes.bool,
};

export default compose(
  injectReducer({ key: 'questionsReducer', reducer }),
  injectSaga({ key: 'questionsReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      account: makeSelectAccount(),
      profile: makeSelectProfileInfo(),
      eosService: selectEos,
      locale: makeSelectLocale(),
      communities: selectCommunities(),
      communitiesLoading: selectCommunitiesLoading(),
      followedCommunities: makeSelectFollowedCommunities(),
      questionsLoading: questionsSelector.selectQuestionsLoading(),
      topQuestionsLoading: questionsSelector.selectTopQuestionsLoading(),
      initLoadedItems: questionsSelector.selectInitLoadedItems(),
      loadedItems: questionsSelector.selectLoadedItems(),
      nextLoadedItems: questionsSelector.selectNextLoadedItems(),
      typeFilter: questionsSelector.selectTypeFilter(),
      createdFilter: questionsSelector.selectCreatedFilter(),
      isLastFetch: questionsSelector.selectIsLastFetch(),
      questionFilter: questionsSelector.selectQuestionFilter(),
      questionsList: (state, props) =>
        questionsSelector.selectQuestions(
          props.parentPage,
          Number(props.match.params.communityid),
        )(state),
      isLastTopQuestionLoaded:
        questionsSelector.isLastTopQuestionLoadedSelector,
      promotedQuestions: questionsSelector.selectPromotedQuestions(),
    }),
    dispatch => ({
      setTypeFilterDispatch: bindActionCreators(setTypeFilter, dispatch),
      setCreatedFilterDispatch: bindActionCreators(setCreatedFilter, dispatch),
      getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
      showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
      redirectToAskQuestionPageDispatch: bindActionCreators(
        redirectToAskQuestionPage,
        dispatch,
      ),
      loadTopQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    }),
  ),
)(Questions);
