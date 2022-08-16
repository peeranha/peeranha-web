import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectBalance,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import QuestionForm from 'components/QuestionForm';
import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  PROMOTE_HOUR_COST,
} from 'components/QuestionForm/constants';

import * as makeSelectEditQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getAskedQuestion, editQuestion } from './actions';
import { EDIT_QUESTION_FORM, EDIT_QUESTION_BUTTON } from './constants';

const TITLE = [
  'common.EditExpertQ&A',
  'common.EditDiscussion',
  'common.EditTutorial',
];

const EditQuestion = ({
  match,
  locale,
  question,
  balance,
  questionLoading,
  editQuestionLoading,
  communities,
  editQuestionDispatch,
  getAskedQuestionDispatch,
  profile,
  account,
  editQuestionError,
}) => {
  const { t } = useTranslation();
  const { questionid } = match.params;
  useEffect(
    () => {
      if (account) {
        getAskedQuestionDispatch(questionid);
      }
    },
    [questionid, getAskedQuestionDispatch, account],
  );

  const sendQuestion = useCallback(
    values => {
      const val = values.toJS();
      editQuestionDispatch(
        {
          title: val[FORM_TITLE],
          content: val[FORM_CONTENT],
          communityId: val[FORM_COMMUNITY].id,
          tags: val[FORM_TAGS].map(tag => +tag.id.split('-')[1]),
        },
        questionid,
      );
    },
    [questionid],
  );

  const maxPromotingHours = useMemo(
    () => Math.floor(balance / PROMOTE_HOUR_COST),
    [balance],
  );

  const titleMessage = useMemo(() => t(TITLE[(question?.postType)]), [
    question?.postType,
  ]);

  const isFailed = editQuestionError !== null;

  const sendProps = useMemo(
    () => ({
      form: EDIT_QUESTION_FORM,
      formTitle: titleMessage,
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName: t('common.editQuestion.submitButtonName'),
      sendQuestion,
      questionLoading: editQuestionLoading,
      valueHasToBeLessThan: balance,
      communities,
      question,
      questionid,
      locale,
      maxPromotingHours,
      profile,
      isFailed,
    }),
    [questionid, question, communities, editQuestionLoading, sendQuestion],
  );

  const [helmetTitle, helmetDescription] = useMemo(
    () => [
      question?.title ?? t('common.editQuestion.title'),
      question?.content ?? t('common.editQuestion.description'),
    ],
    [question],
  );

  return (
    <div>
      <Seo
        title={helmetTitle}
        description={helmetDescription || ''}
        language={locale}
        index={false}
      />

      {!questionLoading && <QuestionForm {...sendProps} />}

      {questionLoading && <LoadingIndicator />}
    </div>
  );
};

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
  profile: PropTypes.object,
  balance: PropTypes.number,
  editQuestionError: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'editQuestion', reducer }),
  injectSaga({
    key: 'editQuestion',
    saga,
    disableEject: true,
  }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      account: makeSelectAccount(),
      communities: selectCommunities(),
      balance: makeSelectBalance(),
      question: makeSelectEditQuestion.selectQuestion(),
      questionLoading: makeSelectEditQuestion.selectQuestionLoading(),
      editQuestionLoading: makeSelectEditQuestion.selectEditQuestionLoading(),
      editQuestionError: makeSelectEditQuestion.selectEditQuestionError(),
      profile: makeSelectProfileInfo(),
    }),
    dispatch => ({
      getAskedQuestionDispatch: bindActionCreators(getAskedQuestion, dispatch),
      editQuestionDispatch: bindActionCreators(editQuestion, dispatch),
    }),
  ),
)(EditQuestion);
