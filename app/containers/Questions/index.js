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
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import InfinityLoader from 'components/InfinityLoader';
import LoadingIndicator from 'components/LoadingIndicator';

import { getQuestionsList, setDefaultReducer } from './actions';
import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';

const StyledDiv = styled.div`
  padding: 20px;
  border-bottom: 2px solid red;
`;

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentDidMount() {
    const { initLoadedItems } = this.props;
    this.getQuestionsList(initLoadedItems, 0);
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  getQuestionsList = (
    limit = this.props.nextLoadedItems,
    offset = this.props.questionsList.size,
  ) => {
    console.log(this.props.questionsList);
    this.props.getQuestionsListDispatch(limit, offset);
  };

  render() {
    return (
      <InfinityLoader
        loadNextPaginatedData={this.getQuestionsList}
        isLoading={this.props.questionsLoading}
        isLastFetch={this.props.isLastFetch}
      >
        <div className="container">
          <Helmet>
            <title>Questions</title>
            <meta name="description" content="Description of Questions" />
          </Helmet>

          {this.props.questionsList.map(item => (
            <StyledDiv key={item.id}>{JSON.stringify(item)}</StyledDiv>
          ))}

          {this.props.questionsLoading && <LoadingIndicator />}
        </div>
      </InfinityLoader>
    );
  }
}

Questions.propTypes = {
  questionsList: PropTypes.array,
  questionsLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  initLoadedItems: PropTypes.number,
  nextLoadedItems: PropTypes.number,
  getQuestionsListDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  questionsList: questionsSelector.selectQuestionsList(),
  questionsLoading: questionsSelector.selectQuestionsLoading(),
  initLoadedItems: questionsSelector.selectInitLoadedItems(),
  nextLoadedItems: questionsSelector.selectNextLoadedItems(),
  isLastFetch: questionsSelector.selectIsLastFetch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionsListDispatch: (limit, offset) =>
      dispatch(getQuestionsList(limit, offset)),
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
