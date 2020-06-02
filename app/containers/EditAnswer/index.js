import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import commonMessages from 'common-messages';

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
import messages from './messages';

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

  const msg = useMemo(() => translationMessages[locale], [locale]);
  const { properties, communityId, content } = useMemo(
    () => answer || { properties: [] },
    [answer],
  );

  const sendProps = useMemo(
    () => ({
      form: EDIT_ANSWER_FORM,
      formHeader: msg[messages.title.id],
      sendButtonId: EDIT_ANSWER_BUTTON,
      sendAnswer,
      sendAnswerLoading: editAnswerLoading,
      submitButtonName: msg[messages.submitButtonName.id],
      answer: content,
      locale,
      label: msg[commonMessages.answer.id],
      previewLabel: msg[commonMessages.preview.id],
      properties,
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
    ],
  );

  const [title, description] = useMemo(
    () => [
      answer?.content ?? msg[messages.title.id],
      answer?.content ?? msg[messages.title.description],
    ],
    [answer],
  );

  const available = useMemo(
    () => !!profile && !!answer && answer.user === profile.user,
    [answer, profile],
  );

  return (
    <div>
      {available ? (
        <>
          <Seo
            title={title}
            description={description}
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
  injectSaga({ key: 'editAnswer', saga }),
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
