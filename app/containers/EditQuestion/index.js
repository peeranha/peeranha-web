import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { getFormattedAsset } from 'utils/numbers';

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
  FORM_BOUNTY,
  FORM_BOUNTY_HOURS,
  FORM_TYPE,
  FORM_PROMOTE,
  PROMOTE_HOUR_COST,
} from 'components/QuestionForm/constants';

import * as makeSelectEditQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getAskedQuestion, editQuestion } from './actions';
import { EDIT_QUESTION_FORM, EDIT_QUESTION_BUTTON } from './constants';

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
                      }) => {
  const questionid = match.params.questionid;
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
          // bounty: +val[FORM_BOUNTY],
          // bountyFull: `${getFormattedAsset(+val[FORM_BOUNTY])} PEER`,
          // bountyHours: +val[FORM_BOUNTY_HOURS],
          // promote: +val[FORM_PROMOTE],
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

  const titleMessage = useMemo(() => {
    if (question?.postType === 0) return translationMessages[locale][messages.title.id[1]];
    if (question?.postType === 1) return translationMessages[locale][messages.title.id[0]];
    if (question?.postType === 2) return translationMessages[locale][messages.title.id[2]];
  }, [question?.postType]);

  const sendProps = useMemo(
    () => ({
      form: EDIT_QUESTION_FORM,
      formTitle: titleMessage,
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName:
        translationMessages[locale][messages.submitButtonName.id],
      sendQuestion,
      questionLoading: editQuestionLoading,
      valueHasToBeLessThan: balance,
      communities,
      question,
      questionid,
      locale,
      maxPromotingHours,
      profile,
    }),
    [questionid, question, communities, editQuestionLoading, sendQuestion],
  );

  const [helmetTitle, helmetDescription] = useMemo(
    () => [
      question?.title ?? translationMessages[locale][messages.title.id],
      question?.content ??
      translationMessages[locale][messages.title.description],
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
};

export default compose(
  injectReducer({ key: 'editQuestion', reducer }),
  injectSaga({ key: 'editQuestion', saga }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      account: makeSelectAccount(),
      communities: selectCommunities(),
      balance: makeSelectBalance(),
      question: makeSelectEditQuestion.selectQuestion(),
      questionLoading: makeSelectEditQuestion.selectQuestionLoading(),
      editQuestionLoading: makeSelectEditQuestion.selectEditQuestionLoading(),
      profile: makeSelectProfileInfo(),
    }),
    dispatch => ({
      getAskedQuestionDispatch: bindActionCreators(getAskedQuestion, dispatch),
      editQuestionDispatch: bindActionCreators(editQuestion, dispatch),
    }),
  ),
)(EditQuestion);
