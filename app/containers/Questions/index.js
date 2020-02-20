/**
 *
 * Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import {
  hasCommunitySingleWebsite,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

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

const feed = routes.feed();

/* eslint react/prefer-stateless-function: 0, indent: 0 */
export class Questions extends React.PureComponent {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.fetcher = null;
  }

  componentDidUpdate(prevProps) {
    const {
      followedCommunities,
      parentPage,
      eosService,
      match: {
        params: { communityid },
      },
      typeFilter,
      createdFilter,
    } = this.props;

    const origin = hasCommunitySingleWebsite(communityid);
    const singleCommunityId = isSingleCommunityWebsite();

    if (origin && singleCommunityId !== communityid) {
      window.open(decodeURIComponent(origin), '_parent');
    }

    // location changing
    if (prevProps && prevProps.match.params.communityid !== communityid) {
      this.fetcher = null;
    }

    if (
      (prevProps && typeFilter !== prevProps.typeFilter) ||
      (prevProps && createdFilter !== prevProps.createdFilter) ||
      (!this.fetcher &&
        eosService &&
        ((parentPage === feed &&
          followedCommunities &&
          followedCommunities.length > 0) ||
          parentPage !== feed))
    ) {
      this.getInitQuestions();
    }
  }

  initFetcher = () => {
    const { eosService, initLoadedItems, followedCommunities } = this.props;
    const MARGIN = 1.2;

    this.fetcher = new FetcherOfQuestionsForFollowedCommunities(
      Math.floor(MARGIN * initLoadedItems),
      followedCommunities || [],
      eosService,
    );
  };

  getInitQuestions = () => {
    const { initLoadedItems, parentPage, match } = this.props;
    const offset = 0;

    this.initFetcher();

    this.props.getQuestionsDispatch(
      initLoadedItems,
      offset,
      Number(match.params.communityid) || 0,
      parentPage,
      this.fetcher,
    );
  };

  getNextQuestions = () => {
    const { nextLoadedItems, questionsList, parentPage, match } = this.props;

    const lastItem = questionsList[questionsList.length - 1];
    const offset = lastItem ? +lastItem.id + 1 : 0;
    const next = true;

    if (parentPage !== feed) {
      this.initFetcher();
    }

    this.props.getQuestionsDispatch(
      nextLoadedItems,
      offset,
      Number(match.params.communityid) || 0,
      parentPage,
      this.fetcher,
      next,
    );
  };

  render() /* istanbul ignore next */ {
    const {
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
      match,
      redirectToAskQuestionPageDispatch,
      typeFilter,
      createdFilter,
      setTypeFilterDispatch,
    } = this.props;

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
        />

        <Header
          communityIdFilter={Number(match.params.communityid) || 0}
          followedCommunities={followedCommunities}
          parentPage={parentPage}
          typeFilter={typeFilter}
          createdFilter={createdFilter}
          setTypeFilter={setTypeFilterDispatch}
        />

        {!questionsList.length &&
          !questionsLoading &&
          !communitiesLoading && (
            <Banner
              isFeed={parentPage === feed}
              followedCommunities={followedCommunities}
              redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
            />
          )}

        {questionsList.length > 0 && (
          <InfinityLoader
            loadNextPaginatedData={this.getNextQuestions}
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
    );
  }
}

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

const mapStateToProps = createStructuredSelector({
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
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    setTypeFilterDispatch: bindActionCreators(setTypeFilter, dispatch),
    setCreatedFilterDispatch: bindActionCreators(setCreatedFilter, dispatch),
    getQuestionsDispatch: bindActionCreators(getQuestions, dispatch),
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    redirectToAskQuestionPageDispatch: bindActionCreators(
      redirectToAskQuestionPage,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'questionsReducer', reducer });
const withSaga = injectSaga({ key: 'questionsReducer', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Questions);
