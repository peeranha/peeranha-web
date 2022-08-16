import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import AnswerForm from 'components/AnswerForm';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  ANSWER_TYPE_FORM,
  TEXT_EDITOR_ANSWER_FORM,
} from 'components/AnswerForm/constants';

import {
  selectAnswer,
  selectAnswerLoading,
  selectEditAnswerLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Wrapper from './Wrapper';

import { editAnswer, getAnswer } from './actions';
import { EDIT_ANSWER_BUTTON, EDIT_ANSWER_FORM } from './constants';
import NotFound from '../ErrorPage';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const EditAnswer = ({
  match: {
    params: { questionid, answerid },
  },
  locale,
  answer,
  profile,
  answerLoading,
  editAnswerLoading,
  getAnswerDispatch,
  editAnswerDispatch,
}) => {
  const { t } = useTranslation();

  useEffect(
    () => {
      getAnswerDispatch(+questionid, +answerid);
    },
    [questionid, answerid],
  );

  const sendAnswer = useCallback(
    values =>
      editAnswerDispatch(
        values.get(TEXT_EDITOR_ANSWER_FORM),
        +questionid,
        +answerid,
        values.get(ANSWER_TYPE_FORM),
      ),
    [questionid, answerid],
  );

  const { properties, communityId, content, isOfficialReply } = useMemo(
    () => answer || { properties: [] },
    [answer],
  );

  const sendProps = useMemo(
    () => ({
      form: EDIT_ANSWER_FORM,
      formHeader: t('post.title'),
      sendButtonId: EDIT_ANSWER_BUTTON,
      sendAnswer,
      sendAnswerLoading: editAnswerLoading,
      submitButtonName: t('post.submitButtonName'),
      answer: content,
      locale,
      label: t('common.answer'),
      previewLabel: t('common.preview'),
      isOfficialReply,
      communityId,
    }),
    [
      sendAnswer,
      editAnswerLoading,
      answer,
      locale,
      properties,
      communityId,
      content,
      t,
    ],
  );

  const [title, description] = useMemo(
    () => [
      answer?.content ?? t('post.title'),
      answer?.content ?? t('post.description'),
    ],
    [answer],
  );

  const available = useMemo(
    () => (!!profile && answer?.user === profile.user) || !answer?.user,
    [answer, profile, answer, editAnswerLoading],
  );

  return (
    <div>
      {available ? (
        <>
          <Seo
            title={title}
            description={description || ''}
            language={locale}
            index={false}
          />

          {!answerLoading && (
            <Wrapper questionid={questionid} answerid={answerid}>
              <AnswerForm {...sendProps} />
            </Wrapper>
          )}

          {answerLoading && <LoadingIndicator />}
        </>
      ) : (
        <NotFound withSeo={false} />
      )}
    </div>
  );
};

EditAnswer.propTypes = {
  answerLoading: PropTypes.bool,
  editAnswerLoading: PropTypes.bool,
  locale: PropTypes.string,
  answer: PropTypes.object,
  match: PropTypes.object,
  getAnswerDispatch: PropTypes.func,
  editAnswerDispatch: PropTypes.func,
  properties: PropTypes.array,
  communityId: PropTypes.number,
  profile: PropTypes.object,
};

export default compose(
  injectReducer({ key: 'editAnswer', reducer }),
  injectSaga({
    key: 'editAnswer',
    saga,
    disableEject: true,
  }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      answer: selectAnswer(),
      answerLoading: selectAnswerLoading(),
      editAnswerLoading: selectEditAnswerLoading(),
      profile: makeSelectProfileInfo(),
    }),
    dispatch => ({
      getAnswerDispatch: bindActionCreators(getAnswer, dispatch),
      editAnswerDispatch: bindActionCreators(editAnswer, dispatch),
    }),
  ),
)(EditAnswer);
