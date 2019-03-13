/**
 *
 * Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { FetcherOfQuestionsForFollowedCommunities } from 'utils/questionsManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import InfinityLoader from 'components/InfinityLoader';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { getQuestions } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import QuestionsContainer from './QuestionsContainer';

const feed = routes.feed();

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.PureComponent {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.fetcher = null;
  }

  componentDidUpdate() {
    const { followedCommunities, parentPage, eosService } = this.props;

    if (!this.fetcher && eosService) {
      if (parentPage === feed && followedCommunities) {
        this.initFetcher(followedCommunities);
      } else if (parentPage !== feed) {
        this.initFetcher();
      }
    }
  }

  initFetcher = (followedCommunities = []) => {
    const { eosService, initLoadedItems } = this.props;
    const MARGIN = 1.2;

    this.fetcher = new FetcherOfQuestionsForFollowedCommunities(
      Math.floor(MARGIN * initLoadedItems),
      followedCommunities,
      eosService,
    );

    this.getInitQuestions();
  };

  getInitQuestions = (communityIdFilter = this.props.communityIdFilter) => {
    const { initLoadedItems, parentPage } = this.props;
    const offset = 0;

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
    } = this.props;

    const sendProps = {
      locale,
      questionsList,
      questionsLoading,
      communitiesLoading,
      communities,
      translations: translationMessages[locale],
      getInitQuestions: this.getInitQuestions,
      communityIdFilter,
      followedCommunities,
      parentPage,
    };

    return (
      <InfinityLoader
        loadNextPaginatedData={this.getNextQuestions}
        isLoading={questionsLoading}
        isLastFetch={isLastFetch}
      >
        <div>
          <Helmet>
            <title>{sendProps.translations[messages.title.id]}</title>
            <meta
              name="description"
              content={sendProps.translations[messages.description.id]}
            />
          </Helmet>
          <QuestionsContainer {...sendProps} />
        </div>
      </InfinityLoader>
    );
  }
}

Questions.propTypes = {
  locale: PropTypes.string,
  parentPage: PropTypes.string,
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
};

const mapStateToProps = createStructuredSelector({
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
