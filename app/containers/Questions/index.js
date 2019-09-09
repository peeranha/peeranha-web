/**
 *
 * Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { FetcherOfQuestionsForFollowedCommunities } from 'utils/questionsManagement';

import InfinityLoader from 'components/InfinityLoader';
import Seo from 'components/Seo';

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

import { getQuestions } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import View from './View';
import Banner from './Banner';

const feed = routes.feed();

/* eslint react/prefer-stateless-function: 0, indent: 0 */
export class Questions extends React.PureComponent {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.fetcher = null;
  }

  componentDidUpdate() {
    const { followedCommunities, parentPage, eosService } = this.props;

    if (
      !this.fetcher &&
      eosService &&
      ((parentPage === feed && followedCommunities) || parentPage !== feed)
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

  getInitQuestions = (communityIdFilter = this.props.communityIdFilter) => {
    const { initLoadedItems, parentPage } = this.props;
    const offset = 0;

    this.initFetcher();

    this.props.getQuestionsDispatch(
      initLoadedItems,
      offset,
      communityIdFilter,
      parentPage,
      this.fetcher,
    );
  };

  getNextQuestions = () => {
    const {
      nextLoadedItems,
      questionsList,
      communityIdFilter,
      parentPage,
    } = this.props;

    const lastItem = questionsList[questionsList.length - 1];
    const offset = lastItem ? +lastItem.id + 1 : 0;
    const next = true;

    if (parentPage !== feed) {
      this.initFetcher();
    }

    this.props.getQuestionsDispatch(
      nextLoadedItems,
      offset,
      communityIdFilter,
      parentPage,
      this.fetcher,
      next,
    );
  };

  render() {
    const {
      locale,
      questionsList,
      questionsLoading,
      isLastFetch,
      communities,
      communityIdFilter,
      followedCommunities,
      parentPage,
      communitiesLoading,
      account,
      profile,
    } = this.props;

    const sendProps = {
      profile,
      account,
      locale,
      questionsList,
      questionsLoading,
      communitiesLoading,
      communities,
      getInitQuestions: this.getInitQuestions,
      communityIdFilter,
      followedCommunities,
      parentPage,
    };

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
        />

        <InfinityLoader
          loadNextPaginatedData={this.getNextQuestions}
          isLoading={questionsLoading}
          isLastFetch={isLastFetch}
        >
          <View {...sendProps} />
        </InfinityLoader>

        {!questionsList.length &&
          !questionsLoading &&
          !communitiesLoading && (
            <Banner
              isFeed={parentPage === feed}
              followedCommunities={followedCommunities}
            />
          )}
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
  communityIdFilter: PropTypes.number,
  getQuestionsDispatch: PropTypes.func,
  eosService: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  profile: makeSelectProfileInfo(),
  eosService: selectEos,
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  communitiesLoading: selectCommunitiesLoading(),
  followedCommunities: makeSelectFollowedCommunities(),
  questionsList: questionsSelector.selectQuestionsList(),
  questionsLoading: questionsSelector.selectQuestionsLoading(),
  initLoadedItems: questionsSelector.selectInitLoadedItems(),
  nextLoadedItems: questionsSelector.selectNextLoadedItems(),
  isLastFetch: questionsSelector.selectIsLastFetch(),
  communityIdFilter: questionsSelector.selectCommunityIdFilter(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    getQuestionsDispatch: (limit, offset, comId, parentPage, fetcher, next) =>
      dispatch(getQuestions(limit, offset, comId, parentPage, fetcher, next)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'questionsReducer', reducer });
const withSaga = injectSaga({ key: 'questionsReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Questions);
