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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { FetcherOfQuestionsForFollowedCommunities } from 'utils/questionsManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import InfinityLoader from 'components/InfinityLoader';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { getQuestions, setDefaultReducer } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import QuestionsContainer from './QuestionsContainer';

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentWillMount() {
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
    this.fetcher = null;
  }

  componentDidUpdate() {
    const { followedCommunities, eosService, initLoadedItems } = this.props;

    if (!this.fetcher && followedCommunities && eosService) {
      this.fetcher = new FetcherOfQuestionsForFollowedCommunities(
        Math.floor(1.2 * initLoadedItems),
        followedCommunities,
        eosService,
      );
      setTimeout(() => this.getInitQuestions(), 0);
    }
  }

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
    const offset = (lastItem && +lastItem.id + 1) || 0;
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
    } = this.props;

    const sendProps = {
      locale,
      questionsList,
      questionsLoading,
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
        <div className="container">
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
  isLastFetch: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  communityIdFilter: PropTypes.number,
  getQuestionsDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
  eosService: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  eosService: selectEos,
  locale: makeSelectLocale(),
  communities: selectCommunities(),
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
    setDefaultReducerDispatch: () => dispatch(setDefaultReducer()),
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
