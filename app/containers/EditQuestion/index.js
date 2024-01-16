import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { compose, bindActionCreators } from 'redux';
import { isSuiBlockchain } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectBalance,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';
import { selectCommunities, selectTagsLoading } from 'containers/DataCacheProvider/selectors';

import QuestionForm from 'components/QuestionForm';
import Seo from 'components/Seo';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  PROMOTE_HOUR_COST,
  FORM_TYPE,
} from 'components/QuestionForm/constants';

import * as makeSelectEditQuestion from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getAskedQuestion, editQuestion } from './actions';
import { getQuestionData } from '../ViewQuestion/actions';
import { selectQuestionTitle } from '../ViewQuestion/selectors';
import { EDIT_QUESTION_FORM, EDIT_QUESTION_BUTTON } from './constants';

const TITLE = ['common.editExpertQ&A', 'common.editDiscussion', 'common.editTutorial'];

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
  getQuestionDataDispatch,
  questionTitle,
  tagsLoading,
}) => {
  const { t } = useTranslation();
  const { questionid } = match.params;
  const isDocumentation = match.url.split('/')[1] === 'documentation';
  useEffect(() => {
    if (account) {
      getQuestionDataDispatch(questionid);
      getAskedQuestionDispatch(questionid);
    }
  }, [questionid, getAskedQuestionDispatch, account]);

  const sendQuestion = useCallback(
    (values) => {
      const val = values.toJS();
      editQuestionDispatch(
        {
          title: val[FORM_TITLE],
          content: val[FORM_CONTENT],
          communityId: val[FORM_COMMUNITY].id,
          tags: val[FORM_TAGS].map((tag) => +tag.id.split('-')[2]),
          postType: isNaN(val[FORM_TYPE]) ? question.postType : Number(val[FORM_TYPE]),
        },
        questionid,
        question.id2,
        question.author.id,
        questionTitle,
      );
    },
    [questionid, question],
  );

  const maxPromotingHours = useMemo(() => Math.floor(balance / PROMOTE_HOUR_COST), [balance]);

  const titleMessage = useMemo(
    () => (isDocumentation ? 'Edit article' : t(TITLE[question?.postType])),
    [question?.postType, t],
  );

  const isFailed = editQuestionError !== null;
  const networkCommunities = communities.filter(
    ({ networkId }) => networkId === question?.networkId,
  );

  const sendProps = useMemo(
    () => ({
      path: match.url,
      form: EDIT_QUESTION_FORM,
      formTitle: titleMessage,
      submitButtonId: EDIT_QUESTION_BUTTON,
      submitButtonName: t('common.editQuestion.submitButtonName'),
      sendQuestion,
      questionLoading: editQuestionLoading,
      valueHasToBeLessThan: balance,
      communities: networkCommunities,
      question,
      questionid,
      locale,
      maxPromotingHours,
      profile,
      isFailed,
      isDocumentation,
      questionTitle,
      tagsLoading,
    }),
    [questionid, question, communities, editQuestionLoading, sendQuestion],
  );

  return (
    <div>
      <Seo
        title={t('common.editQuestion.title')}
        description={t('common.editQuestion.description')}
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
      questionTitle: selectQuestionTitle(),
      tagsLoading: selectTagsLoading(),
    }),
    (dispatch) => ({
      getAskedQuestionDispatch: bindActionCreators(getAskedQuestion, dispatch),
      editQuestionDispatch: bindActionCreators(editQuestion, dispatch),
      getQuestionDataDispatch: bindActionCreators(getQuestionData, dispatch),
    }),
  ),
)(EditQuestion);
