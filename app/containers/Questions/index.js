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
import TopCommunities from 'components/TopCommunities';

import InfinityLoader from 'components/InfinityLoader';
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
import { getCookie } from '../../utils/cookie';
import { QUESTION_FILTER } from './constants';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export const Questions = ({
  locale,
  questionsList,
  questionsLoading,
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
  eosService,
  initLoadedItems,
  nextLoadedItems,
  getQuestionsDispatch,
  topQuestionsLoaded,
  questionFilter,
  loadTopQuestionsDispatch,
}) => {
  const [fetcher, setFetcher] = useState(null);

  const initFetcher = useCallback(
    () => {
      const MARGIN = 1.2;
      const f = new FetcherOfQuestionsForFollowedCommunities(
        Math.floor(MARGIN * initLoadedItems),
        followedCommunities || [],
        eosService,
      );
      setFetcher(f);
      return f;
    },
    [initLoadedItems, followedCommunities, eosService],
  );

  const getInitQuestions = useCallback(
    () => {
      if (!questionFilter) {
        const offset = 0;
        const f = initFetcher();

        getQuestionsDispatch(
          initLoadedItems,
          offset,
          Number(params.communityid) || 0,
          parentPage,
          f,
        );
      }
    },
    [initLoadedItems, params.communityid, parentPage, fetcher, questionFilter],
  );

  const getNextQuestions = useCallback(
    () => {
      const lastItem = questionsList[questionsList.length - 1];
      const offset = lastItem ? +lastItem.id + 1 : 0;
      const next = true;

      if (!questionFilter) {
        const f = do {
          if (parentPage !== feed) {
            initFetcher();
          } else {
            fetcher;
          }
        };

        getQuestionsDispatch(
          nextLoadedItems,
          offset,
          Number(params.communityid) || 0,
          parentPage,
          f,
          next,
        );
      }
    },
    [
      questionsList,
      questionsList.length,
      nextLoadedItems,
      params.communityid,
      parentPage,
      fetcher,
      questionFilter,
    ],
  );

  useEffect(
    () => {
      setFetcher(null);

      return () => {
        setFetcher(null);
      };
    },
    [params.communityid, questionFilter],
  );

  useEffect(
    () => {
      if (
        !fetcher &&
        eosService &&
        ((parentPage === feed &&
          followedCommunities &&
          followedCommunities.length > 0) ||
          parentPage !== feed) &&
        !questionFilter
      ) {
        getInitQuestions();
      }
    },
    [fetcher, eosService, questionFilter],
  );

  useEffect(
    () => {
      if (!fetcher && !questionFilter) {
        getInitQuestions();
      }
    },
    [typeFilter, createdFilter, questionFilter],
  );

  useEffect(() => {
    if (single) {
      loadTopQuestionsDispatch();
    }
  }, []);

  const display = useMemo(
    () => !(single && path === routes.questions(':communityid')),
    [single, path],
  );

  const displayBanner = useMemo(
    () =>
      !(getCookie(QUESTION_FILTER) === '1' || questionFilter === 1)
        ? !questionsList.length && !questionsLoading && !communitiesLoading
        : false,
    [
      questionsList.length,
      questionsLoading,
      communitiesLoading,
      topQuestionsLoaded,
      questionFilter,
    ],
  );

  const lastFetched = useMemo(
    () => (!questionFilter ? isLastFetch : topQuestionsLoaded),
    [isLastFetch, topQuestionsLoaded, questionFilter],
  );

  const displayLoader = useMemo(
    () =>
      questionsLoading ||
      communitiesLoading ||
      (getCookie(QUESTION_FILTER) === '1' && !topQuestionsLoaded),
    [questionsLoading, communitiesLoading, topQuestionsLoaded],
  );

  return display ? (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
      />

      <Header
        communityIdFilter={Number(params.communityid) || 0}
        followedCommunities={followedCommunities}
        parentPage={parentPage}
        typeFilter={typeFilter}
        createdFilter={createdFilter}
        setTypeFilter={setTypeFilterDispatch}
      />

      {displayBanner && (
        <Banner
          isFeed={parentPage === feed}
          followedCommunities={followedCommunities}
          redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
        />
      )}

      {questionsList.length > 0 && (
        <InfinityLoader
          loadNextPaginatedData={getNextQuestions}
          isLoading={questionsLoading}
          isLastFetch={lastFetched}
        >
          <Content
            questionsList={questionsList}
            locale={locale}
            communities={communities}
            typeFilter={typeFilter}
            createdFilter={createdFilter}
          />
        </InfinityLoader>
      )}

      {parentPage === feed && (
        <TopCommunities
          userId={account}
          account={account}
          communities={communities}
          profile={profile}
        />
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
  topQuestionsLoaded: PropTypes.bool,
  questionFilter: PropTypes.number,
  loadTopQuestionsDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    account: makeSelectAccount(),
    profile: makeSelectProfileInfo(),
    eosService: selectEos,
    locale: makeSelectLocale(),
    communities: selectCommunities(),
    communitiesLoading: selectCommunitiesLoading(),
    followedCommunities: makeSelectFollowedCommunities(),
    questionsLoading: questionsSelector.selectQuestionsLoading(),
    initLoadedItems: questionsSelector.selectInitLoadedItems(),
    nextLoadedItems: questionsSelector.selectNextLoadedItems(),
    typeFilter: questionsSelector.selectTypeFilter(),
    createdFilter: questionsSelector.selectCreatedFilter(),
    isLastFetch: questionsSelector.selectIsLastFetch(),
    topQuestionsLoaded: questionsSelector.selectTopQuestionsLoaded(),
    questionFilter: questionsSelector.selectQuestionFilter(),
    questionsList: (state, props) =>
      questionsSelector.selectQuestions(
        props.parentPage,
        Number(props.match.params.communityid),
      )(state),
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
    loadTopQuestionsDispatch: bindActionCreators(
      loadTopCommunityQuestions,
      dispatch,
    ),
  }),
);

const withReducer = injectReducer({ key: 'questionsReducer', reducer });
const withSaga = injectSaga({ key: 'questionsReducer', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Questions);
