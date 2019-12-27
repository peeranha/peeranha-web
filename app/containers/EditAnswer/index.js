/**
 *
 * EditAnswer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import commonMessages from 'common-messages';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import AnswerForm from 'components/AnswerForm';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

import * as makeSelectEditAnswer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Wrapper from './Wrapper';

import { getAnswer, editAnswer } from './actions';
import { EDIT_ANSWER_FORM, EDIT_ANSWER_BUTTON } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class EditAnswer extends React.PureComponent {
  componentDidMount() {
    const { questionid, answerid } = this.props.match.params;
    this.props.getAnswerDispatch(questionid, answerid);
  }

  editAnswer = values => {
    const { questionid, answerid } = this.props.match.params;
    const answer = values.get(TEXT_EDITOR_ANSWER_FORM);

    this.props.editAnswerDispatch(answer, questionid, answerid);
  };

  render() {
    const {
      locale,
      answer,
      answerLoading,
      editAnswerLoading,
      match,
    } = this.props;

    const msg = translationMessages[locale];

    const { questionid, answerid } = match.params;

    const sendProps = {
      form: EDIT_ANSWER_FORM,
      formHeader: msg[messages.title.id],
      sendButtonId: EDIT_ANSWER_BUTTON,
      sendAnswer: this.editAnswer,
      sendAnswerLoading: editAnswerLoading,
      submitButtonName: msg[messages.submitButtonName.id],
      answer,
      locale,
      label: msg[commonMessages.answer.id],
      previewLabel: msg[commonMessages.preview.id],
    };

    const helmetTitle = answer || msg[messages.title.id];
    const helmetDescription = answer || msg[messages.title.description];

    return (
      <div>
        <Seo
          title={helmetTitle}
          description={helmetDescription}
          language={locale}
          index={false}
        />

        {!answerLoading && (
          <Wrapper questionid={questionid} answerid={answerid}>
            <AnswerForm {...sendProps} />
          </Wrapper>
        )}

        {answerLoading && <LoadingIndicator />}
      </div>
    );
  }
}

EditAnswer.propTypes = {
  answerLoading: PropTypes.bool,
  editAnswerLoading: PropTypes.bool,
  locale: PropTypes.string,
  answer: PropTypes.string,
  match: PropTypes.object,
  getAnswerDispatch: PropTypes.func,
  editAnswerDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  answer: makeSelectEditAnswer.selectAnswer(),
  answerLoading: makeSelectEditAnswer.selectAnswerLoading(),
  editAnswerLoading: makeSelectEditAnswer.selectEditAnswerLoading(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getAnswerDispatch: bindActionCreators(getAnswer, dispatch),
    editAnswerDispatch: bindActionCreators(editAnswer, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editAnswer', reducer });
const withSaga = injectSaga({ key: 'editAnswer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditAnswer);
