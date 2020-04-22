/**
 *
 * Questions
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
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
  makeSelectFollowedCommunities,
  makeSelectAccount,
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

import { getQuestions, setTypeFilter, setCreatedFilter } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Content from './Content';
import Banner from './Banner';
import Header from './Header';
import NotFound from '../ErrorPage';

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
}) => {
  let fetcher = null;

  const initFetcher = () => {
    const MARGIN = 1.2;

    fetcher = new FetcherOfQuestionsForFollowedCommunities(
      Math.floor(MARGIN * initLoadedItems),
      followedCommunities || [],
      eosService,
    );
  };

  const getInitQuestions = () => {
    const offset = 0;

    initFetcher();

    getQuestionsDispatch(
      initLoadedItems,
      offset,
      Number(params.communityid) || 0,
      parentPage,
      fetcher,
    );
  };

  const getNextQuestions = () => {
    const lastItem = questionsList[questionsList.length - 1];
    const offset = lastItem ? +lastItem.id + 1 : 0;
    const next = true;

    if (parentPage !== feed) {
      initFetcher();
    }

    getQuestionsDispatch(
      nextLoadedItems,
      offset,
      Number(params.communityid) || 0,
      parentPage,
      fetcher,
      next,
    );
  };

  useEffect(
    () => {
      fetcher = null;

      return () => {
        fetcher = null;
      };
    },
    [params.communityid],
  );

  useEffect(
    () => {
      if (
        !fetcher &&
        eosService &&
        ((parentPage === feed &&
          followedCommunities &&
          followedCommunities.length > 0) ||
          parentPage !== feed)
      ) {
        getInitQuestions();
      }
    },
    [fetcher, eosService],
  );

  useEffect(
    () => {
      if (!fetcher) {
        getInitQuestions();
      }
    },
    [typeFilter, createdFilter],
  );

  const display = !(single && path === routes.questions(':communityid'));
  const displayBanner =
    !questionsList.length && !questionsLoading && !communitiesLoading;

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
          isLastFetch={isLastFetch}
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

      {(questionsLoading || communitiesLoading) && <LoadingIndicator />}
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
  }),
);

const withReducer = injectReducer({ key: 'questionsReducer', reducer });
const withSaga = injectSaga({ key: 'questionsReducer', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Questions);
