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
import TopCommunities from 'components/TopCommunities';
import ScrollToTop from 'components/ScrollToTop/index';
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
import ShowMoreButton from './Content/ShowMoreButton';

import { QUESTION_FILTER, UPDATE_PROMO_QUESTIONS } from './constants';

const feed = routes.feed();
const single = isSingleCommunityWebsite();

export const Questions = ({
  locale,
  questionsList,
  questionsLoading,
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
  eosService,
  initLoadedItems,
  nextLoadedItems,
  getQuestionsDispatch,
  questionFilter,
  loadTopQuestionsDispatch,
  isLastTopQuestionLoaded,
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
      } else if (single) {
        loadTopQuestionsDispatch(false);
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
      loadTopQuestionsDispatch,
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
        setCookie({
          name: UPDATE_PROMO_QUESTIONS,
          value: 1,
        });
        getInitQuestions();
      }
    },
    [typeFilter, createdFilter, questionFilter],
  );

  useEffect(() => {
    if (single) {
      loadTopQuestionsDispatch(true);
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
      questionFilter,
    ],
  );

  const lastFetched = useMemo(
    () => (!questionFilter ? isLastFetch : isLastTopQuestionLoaded),
    [isLastFetch, isLastTopQuestionLoaded, questionFilter],
  );

  const displayLoader = useMemo(
    () =>
      questionsLoading ||
      communitiesLoading ||
      (getCookie(QUESTION_FILTER) === '1' && !isLastTopQuestionLoaded),
    [questionsLoading, communitiesLoading, isLastTopQuestionLoaded],
  );

  const isModerator = useMemo(
    () =>
      isUserTopCommunityQuestionsModerator(profile?.permissions ?? [], single),
    [profile],
  );

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
            promotedQuestionsList={promotedQuestions[+questionFilterFromCookies ? 'top' : 'all']}
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
      initLoadedItems: questionsSelector.selectInitLoadedItems(),
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
      loadTopQuestionsDispatch: bindActionCreators(
        loadTopCommunityQuestions,
        dispatch,
      ),
    }),
  ),
)(Questions);
