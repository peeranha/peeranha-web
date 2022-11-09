/**
 *
 * AskQuestion
 *
 */

import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
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
import { getAvailableBalance } from 'utils/profileManagement';
import AskQuestionPopup from './AskQuestionPopup';

export const AskQuestion = ({
  match: { path, url },
  locale,
  askQuestionLoading,
  communities,
  askQuestionDispatch,
  getQuestionsDispatch,
  existingQuestions,
  profileInfo,
  questionError,
  documentationMenu,
}) => {
  const getQuestionsDispatchDebounced = _debounce(getQuestionsDispatch, 250);

  const [skipExistingQuestions, setSkipExistingQuestions] = useState(false);
  const isFailed = questionError !== '';

  useEffect(() => () => {
    getQuestionsDispatchDebounced.cancel();
  });

  const availableBalance = getAvailableBalance(profileInfo);

  const maxPromotingHours = useMemo(
    () => Math.floor(availableBalance / PROMOTE_HOUR_COST),
    [availableBalance],
  );
  const urlArray = url.split('/');
  let parentId = urlArray[2];
  const isDocumentation = path.split('/')[1] === 'documentation';

  let formTitle;
  if (isDocumentation) {
    formTitle = !isNaN(parentId) ? 'New sub-article' : 'New article';
  } else {
    formTitle = translationMessages[locale][messages.title.id];
  }
  return (
    <div>
      <AskQuestionPopup />

      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <QuestionForm
        locale={locale}
        path={path}
        valueHasToBeLessThan={availableBalance}
        maxPromotingHours={maxPromotingHours}
        form={ASK_QUESTION_FORM}
        formTitle={formTitle}
        submitButtonId={POST_QUESTION_BUTTON}
        submitButtonName={translationMessages[locale][messages.postQuestion.id]}
        getQuestions={getQuestionsDispatchDebounced}
        sendQuestion={askQuestionDispatch}
        questionLoading={askQuestionLoading}
        communities={communities}
        existingQuestions={existingQuestions}
        doSkipExistingQuestions={skipExistingQuestions}
        skipExistingQuestions={() => setSkipExistingQuestions(true)}
        isFailed={isFailed}
        documentationMenu={documentationMenu}
        isDocumentation={isDocumentation}
        parentId={parentId}
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
  existingQuestions: PropTypes.array.isRequired,
  profileInfo: PropTypes.object,
  questionError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
  profileInfo: makeSelectProfileInfo(),
  existingQuestions: askQuestionSelector.selectExistingQuestions(),
  askQuestionLoading: askQuestionSelector.selectAskQuestionLoading(),
  questionError: askQuestionSelector.selectQuestionError(),
  documentationMenu: selectDocumentationMenu(),
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
const withSaga = injectSaga({
  key: 'askQuestionReducer',
  saga,
  disableEject: true,
});
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
