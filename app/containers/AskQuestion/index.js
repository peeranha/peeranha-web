/**
 *
 * AskQuestion
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';
import _debounce from 'lodash/debounce';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { PROMOTE_HOUR_COST } from 'components/QuestionForm/constants';

import Seo from 'components/Seo';
import QuestionForm from 'components/QuestionForm';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { askQuestion, getExistingQuestion } from './actions';
import * as askQuestionSelector from './selectors';
import reducer, { existingQuestionReducer } from './reducer';
import saga, { existingQuestionSaga } from './saga';
import messages from './messages';

import { POST_QUESTION_BUTTON, ASK_QUESTION_FORM } from './constants';
import { getAvailableBalance } from '../../utils/profileManagement';

export const AskQuestion = ({
  locale,
  askQuestionLoading,
  communities,
  askQuestionDispatch,
  getQuestionsDispatch,
  existingQuestions,
  profileInfo,
}) => {
  const getQuestionsDispatchDebounced = _debounce(getQuestionsDispatch, 250);

  const [skipExistingQuestions, setSkipExistingQuestions] = useState(false);

  useEffect(() => () => {
    getQuestionsDispatchDebounced.cancel();
  });

  const availableBalance = getAvailableBalance(profileInfo);

  const maxPromotingHours = useMemo(
    () => {
      return Math.floor(availableBalance / PROMOTE_HOUR_COST);
    },
    [availableBalance],
  );

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
        valueHasToBeLessThan={availableBalance}
        maxPromotingHours={maxPromotingHours}
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
      />
    </div>
  );
};

AskQuestion.propTypes = {
  locale: PropTypes.string.isRequired,
  askQuestionLoading: PropTypes.bool.isRequired,
  balance: PropTypes.number,
  askQuestionDispatch: PropTypes.func.isRequired,
  getQuestionsDispatch: PropTypes.func.isRequired,
  communities: PropTypes.array.isRequired,
  existingQuestions: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  profileInfo: makeSelectProfileInfo(),
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
