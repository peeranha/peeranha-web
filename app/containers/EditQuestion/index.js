/**
 *
 * EditQuestion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import QuestionForm from 'components/QuestionForm';
import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from 'components/QuestionForm/constants';

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
      community: values.get(FORM_COMMUNITY),
      chosenTags: values.get(FORM_TAGS),
    };

    this.props.editQuestionDispatch(question, questionid);
  };

  render() {
    const { questionid } = this.props.match.params;

    const {
      locale,
      question,
      questionLoading,
      editQuestionLoading,
      communities,
    } = this.props;

    const sendProps = {
      form: EDIT_QUESTION_FORM,
      formTitle: translationMessages[locale][messages.title.id],
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName:
        translationMessages[locale][messages.submitButtonName.id],
      sendQuestion: this.editQuestion,
      questionLoading: editQuestionLoading,
      communities,
      question,
      questionid,
    };

    const helmetTitle =
      (question && question.title) ||
      translationMessages[locale][messages.title.id];

    const helmetDescription =
      (question && question.content) ||
      translationMessages[locale][messages.title.description];

    return (
      <div>
        <Seo
          title={helmetTitle}
          description={helmetDescription}
          language={locale}
          index={false}
        />

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
  communities: PropTypes.array,
  getAskedQuestionDispatch: PropTypes.func,
  editQuestionDispatch: PropTypes.func,
  questionLoading: PropTypes.bool,
  editQuestionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  question: makeSelectEditQuestion.selectQuestion(),
  questionLoading: makeSelectEditQuestion.selectQuestionLoading(),
  editQuestionLoading: makeSelectEditQuestion.selectEditQuestionLoading(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getAskedQuestionDispatch: bindActionCreators(getAskedQuestion, dispatch),
    editQuestionDispatch: bindActionCreators(editQuestion, dispatch),
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
