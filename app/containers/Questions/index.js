/**
 *
 * Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { getQuestionsList } from './actions';
import * as questionsSelector from './selectors';
import reducer from './reducer';
import saga from './saga';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Questions extends React.Component {
  componentDidMount() {
    this.props.getQuestionsListDispatch();
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <Helmet>
          <title>Questions</title>
          <meta name="description" content="Description of Questions" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Questions.propTypes = {
  getQuestionsListDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  questionsList: questionsSelector.selectQuestionsList(),
  questionsLoading: questionsSelector.selectQuestionsLoading(),
  questionsError: questionsSelector.selectQuestionsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getQuestionsListDispatch: limit => dispatch(getQuestionsList(limit)),
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
