/**
 *
 * AskQuestion
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

import QuestionForm from 'components/QuestionForm';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { FORM_TITLE, FORM_CONTENT } from 'components/QuestionForm/constants';

import { askQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { POST_QUESTION_BUTTON, ASK_QUESTION_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class AskQuestion extends React.Component {
  postQuestion = values => {
    const translations = translationMessages[this.props.locale];
    const postButtonId = POST_QUESTION_BUTTON;

    const question = {
      title: values.get(FORM_TITLE),
      content: values.get(FORM_CONTENT),
    };

    this.props.askQuestionDispatch(
      this.props.account,
      question,
      postButtonId,
      translations,
    );
  };

  render() {
    const sendProps = {
      form: ASK_QUESTION_FORM,
      formTitle: translationMessages[this.props.locale][messages.title.id],
      submitButtonId: POST_QUESTION_BUTTON,
      submitButtonName:
        translationMessages[this.props.locale][messages.postQuestion.id],
      sendQuestion: this.postQuestion,
      translations: translationMessages[this.props.locale],
      questionLoading: this.props.askQuestionLoading,
    };

    return (
      <div className="container">
        <Helmet>
          <title>{sendProps.translations[messages.title.id]}</title>
          <meta
            name="description"
            content={sendProps.translations[messages.description.id]}
          />
        </Helmet>
        <QuestionForm {...sendProps} />
      </div>
    );
  }
}

AskQuestion.propTypes = {
  locale: PropTypes.string.isRequired,
  account: PropTypes.string,
  askQuestionLoading: PropTypes.bool.isRequired,
  askQuestionDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  askQuestionLoading: askQuestionSelector.selectAskQuestionLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    askQuestionDispatch: (user, questionData, postButtonId, translations) =>
      dispatch(askQuestion(user, questionData, postButtonId, translations)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'askQuestionReducer', reducer });
const withSaga = injectSaga({ key: 'askQuestionReducer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AskQuestion);
