/**
 *
 * AskQuestion
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';
import _debounce from 'lodash/debounce';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import QuestionForm from 'components/QuestionForm';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { askQuestion, getExistingQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer, { existingQuestionReducer } from './reducer';
import saga, { existingQuestionSaga } from './saga';
import messages from './messages';

import { POST_QUESTION_BUTTON, ASK_QUESTION_FORM } from './constants';

export const AskQuestion = ({
  locale,
  askQuestionLoading,
  communities,
  askQuestionDispatch,
  getQuestionsDispatch,
  existingQuestions,
}) => {
  const getQuestionsDispatchDebounced = _debounce(getQuestionsDispatch, 250);

  const [skipExistingQuestions, setSkipExistingQuestions] = useState(false);

  useEffect(() => () => {
    getQuestionsDispatchDebounced.cancel();
  });

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <QuestionForm
        locale={locale}
        form={ASK_QUESTION_FORM}
        formTitle={translationMessages[locale][messages.title.id]}
        submitButtonId={POST_QUESTION_BUTTON}
        submitButtonName={translationMessages[locale][messages.postQuestion.id]}
        getQuestions={getQuestionsDispatchDebounced}
        sendQuestion={askQuestionDispatch}
        questionLoading={askQuestionLoading}
        communities={communities}
        existingQuestions={existingQuestions}
        doSkipExistingQuestions={skipExistingQuestions}
        skipExistingQuestions={() => setSkipExistingQuestions(true)}
        questionTypeExpertDescription={
          translationMessages[locale][messages.onlyExpertQuestionsAllowed.id]
        }
        questionTypeGeneralDescription={
          translationMessages[locale][messages.onlyGeneralQuestionsAllowed.id]
        }
      />
    </div>
  );
};

AskQuestion.propTypes = {
  locale: PropTypes.string.isRequired,
  askQuestionLoading: PropTypes.bool.isRequired,
  askQuestionDispatch: PropTypes.func.isRequired,
  getQuestionsDispatch: PropTypes.func.isRequired,
  communities: PropTypes.array.isRequired,
  existingQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  existingQuestions: askQuestionSelector.selectExistingQuestions(),
  askQuestionLoading: askQuestionSelector.selectAskQuestionLoading(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    askQuestionDispatch: bindActionCreators(askQuestion, dispatch),
    getQuestionsDispatch: bindActionCreators(getExistingQuestion, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'askQuestionReducer', reducer });
const withSaga = injectSaga({ key: 'askQuestionReducer', saga });
const withExistingQuestionReducer = injectReducer({
  key: 'existingQuestionReducer',
  reducer: existingQuestionReducer,
});
const withExistingQuestionSaga = injectSaga({
  key: 'existingQuestionReducer',
  saga: existingQuestionSaga,
});

export default compose(
  withReducer,
  withSaga,
  withExistingQuestionReducer,
  withExistingQuestionSaga,
  withConnect,
)(AskQuestion);
