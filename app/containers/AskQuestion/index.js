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
import { addToast } from 'containers/Toast/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { askQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { FORM_TITLE } from './constants';

import AskQuestionForm from './AskQuestionForm';

/* eslint-disable react/prefer-stateless-function */
export class AskQuestion extends React.Component {
  postQuestion = values => {
    const question = {
      title: values.get(FORM_TITLE),
      content: window.tinyMCE.activeEditor.getContent(),
    };

    if (question.content) {
      this.props.askQuestionDispatch(this.props.account, question);
    } else {
      const toast = {
        type: 'error',
        text:
          translationMessages[this.props.locale][messages.wrongLength1000.id],
      };
      this.props.addToastDispatch(toast);
    }
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
  account: PropTypes.string.isRequired,
  askQuestionLoading: PropTypes.bool.isRequired,
  askQuestionDispatch: PropTypes.func.isRequired,
  addToastDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  askQuestionLoading: askQuestionSelector.selectAskQuestionLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    askQuestionDispatch: (user, questionData) =>
      dispatch(askQuestion(user, questionData)),
    addToastDispatch: addedToast => dispatch(addToast(addedToast)),
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
