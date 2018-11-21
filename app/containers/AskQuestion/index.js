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

import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import TextEditor from 'components/TextEditor';

import { askQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { FORM_TITLE, FORM_CONTENT, POST_QUESTION_BUTTON } from './constants';

import AskQuestionForm from './AskQuestionForm';

/* eslint-disable react/prefer-stateless-function */
export class AskQuestion extends React.Component {
  postQuestion = values => {
    const translations = translationMessages[this.props.locale];
    const postButtonId = POST_QUESTION_BUTTON;

    const question = {
      title: values.get(FORM_TITLE),
      content: TextEditor.getHtmlText(values.get(FORM_CONTENT)),
    };

    TextEditor.getHtmlText(question.content);
    this.props.askQuestionDispatch(
      this.props.account,
      question,
      postButtonId,
      translations,
    );
  };

  render() {
    const sendProps = {
      postQuestion: this.postQuestion,
      translations: translationMessages[this.props.locale],
      askQuestionLoading: this.props.askQuestionLoading,
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
        <AskQuestionForm {...sendProps} />
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
