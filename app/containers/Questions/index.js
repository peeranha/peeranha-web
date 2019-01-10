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

import InfinityLoader from 'components/InfinityLoader';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { getQuestions, setDefaultReducer, followHandler } from './actions';

import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import QuestionsContainer from './QuestionsContainer';

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentDidMount() {
    setTimeout(() => this.getInitQuestions(), 0);
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  getInitQuestions = (communityIdFilter = this.props.communityIdFilter) => {
    const { initLoadedItems, parentPage } = this.props;
    const offset = 0;

    this.props.getQuestionsDispatch(
      initLoadedItems,
      offset,
      communityIdFilter,
      parentPage,
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
      next,
    );
  };

  followHandler = e => {
    const isFollowed = JSON.parse(e.target.dataset.isfollowed);
    const { communityIdFilter } = this.props;

    this.props.followHandlerDispatch(communityIdFilter, isFollowed);
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
      followHandler: this.followHandler,
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
  followHandlerDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  questionsList: questionsSelector.selectQuestionsList(),
  questionsLoading: questionsSelector.selectQuestionsLoading(),
  initLoadedItems: questionsSelector.selectInitLoadedItems(),
  nextLoadedItems: questionsSelector.selectNextLoadedItems(),
  isLastFetch: questionsSelector.selectIsLastFetch(),
  communityIdFilter: questionsSelector.selectCommunityIdFilter(),
  followedCommunities: questionsSelector.selectFollowedCommunities(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    getQuestionsDispatch: (limit, offset, comId, parentPage, next) =>
      dispatch(getQuestions(limit, offset, comId, parentPage, next)),
    setDefaultReducerDispatch: () => dispatch(setDefaultReducer()),
    followHandlerDispatch: (communityIdFilter, isFollowed) =>
      dispatch(followHandler(communityIdFilter, isFollowed)),
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
