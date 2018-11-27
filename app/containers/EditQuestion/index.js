/**
 *
 * EditQuestion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';

import LoadingIndicator from 'components/LoadingIndicator';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import QuestionForm from 'components/QuestionForm';
import { FORM_TITLE, FORM_CONTENT } from 'components/QuestionForm/constants';

import * as makeSelectEditQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getAskedQuestion, editQuestion } from './actions';
import { EDIT_QUESTION_FORM, EDIT_QUESTION_BUTTON } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class EditQuestion extends React.Component {
  componentDidMount() {
    const { questionid } = this.props.match.params;
    this.props.getAskedQuestionDispatch(questionid);
  }

  editQuestion = values => {
    const { questionid } = this.props.match.params;
    const question = {
      title: values.get(FORM_TITLE),
      content: values.get(FORM_CONTENT),
    };

    this.props.editQuestionDispatch(question, questionid);
  };

  render() {
    const {
      locale,
      question,
      questionLoading,
      editQuestionLoading,
    } = this.props;

    const sendProps = {
      form: EDIT_QUESTION_FORM,
      formTitle: translationMessages[locale][messages.title.id],
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName:
        translationMessages[locale][messages.submitButtonName.id],
      sendQuestion: this.editQuestion,
      translations: translationMessages[locale],
      questionLoading: editQuestionLoading,
      questionTitle: (question && question.title) || '',
      questionContent: (question && question.content) || '',
    };

    const helmetTitle =
      (question && question.title) || sendProps.translations[messages.title.id];

    const helmetDescription =
      (question && question.content) ||
      sendProps.translations[messages.title.description];

    return (
      <div className="container">
        <Helmet>
          <title>{helmetTitle}</title>
          <meta name="description" content={helmetDescription} />
        </Helmet>

        {!questionLoading && <QuestionForm {...sendProps} />}

        {questionLoading && <LoadingIndicator />}
      </div>
    );
  }
}

EditQuestion.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  question: PropTypes.object,
  getAskedQuestionDispatch: PropTypes.func,
  editQuestionDispatch: PropTypes.func,
  questionLoading: PropTypes.bool,
  editQuestionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  question: makeSelectEditQuestion.selectQuestion(),
  questionLoading: makeSelectEditQuestion.selectQuestionLoading(),
  editQuestionLoading: makeSelectEditQuestion.selectEditQuestionLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAskedQuestionDispatch: questionid =>
      dispatch(getAskedQuestion(questionid)),
    editQuestionDispatch: (question, questionid) =>
      dispatch(editQuestion(question, questionid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editQuestion', reducer });
const withSaga = injectSaga({ key: 'editQuestion', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditQuestion);
