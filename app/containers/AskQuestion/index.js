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
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from 'components/QuestionForm/constants';

import { askQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { POST_QUESTION_BUTTON, ASK_QUESTION_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class AskQuestion extends React.PureComponent {
  postQuestion = (...args) => {
    const translations = translationMessages[this.props.locale];
    const { postButtonId } = args[2];

    const question = {
      title: args[0].get(FORM_TITLE),
      content: args[0].get(FORM_CONTENT),
      community: args[0].get(FORM_COMMUNITY),
      chosenTags: args[0].get(FORM_TAGS),
    };

    this.props.askQuestionDispatch(
      this.props.account,
      question,
      postButtonId,
      translations,
    );
  };

  render() {
    const { locale, askQuestionLoading, communities } = this.props;

    const sendProps = {
      form: ASK_QUESTION_FORM,
      formTitle: translationMessages[locale][messages.title.id],
      submitButtonId: POST_QUESTION_BUTTON,
      submitButtonName: translationMessages[locale][messages.postQuestion.id],
      sendQuestion: this.postQuestion,
      questionLoading: askQuestionLoading,
      communities,
    };

    return (
      <div>
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
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
  communities: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
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
