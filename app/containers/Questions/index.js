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

import {
  getInitQuestions,
  getNextQuestions,
  setDefaultReducer,
} from './actions';
import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import QuestionsContainer from './QuestionsContainer';

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentDidMount() {
    this.getInitQuestions();
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  getInitQuestions = (communityIdFilter = this.props.communityIdFilter) => {
    const { initLoadedItems } = this.props;
    const offset = 0;

    this.props.getInitQuestionsDispatch(
      initLoadedItems,
      offset,
      communityIdFilter,
    );
  };

  getNextQuestions = () => {
    const { nextLoadedItems, questionsList, communityIdFilter } = this.props;
    const lastItem = questionsList[questionsList.length - 1];
    const offset = (lastItem && +lastItem.id + 1) || 0;

    this.props.getNextQuestionsDispatch(
      nextLoadedItems,
      offset,
      communityIdFilter,
    );
  };

  render() {
    const {
      locale,
      questionsList,
      questionsLoading,
      isLastFetch,
      communities,
    } = this.props;

    const sendProps = {
      locale,
      questionsList,
      questionsLoading,
      communities,
      translations: translationMessages[locale],
      getInitQuestions: this.getInitQuestions,
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
  communities: PropTypes.array,
  questionsList: PropTypes.array,
  questionsLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  communityIdFilter: PropTypes.number,
  getInitQuestionsDispatch: PropTypes.func,
  getNextQuestionsDispatch: PropTypes.func,
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
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    getInitQuestionsDispatch: (limit, offset, communityIdFilter) =>
      dispatch(getInitQuestions(limit, offset, communityIdFilter)),
    getNextQuestionsDispatch: (limit, offset, communityIdFilter) =>
      dispatch(getNextQuestions(limit, offset, communityIdFilter)),
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
