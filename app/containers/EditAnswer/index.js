/**
 *
 * EditAnswer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AnswerForm from 'components/AnswerForm';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { TEXT_EDITOR_ANSWER_FORM } from 'components/AnswerForm/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import * as makeSelectEditAnswer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Box from './Box';
import { getAnswer, editAnswer } from './actions';
import { EDIT_ANSWER_FORM, EDIT_ANSWER_BUTTON } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class EditAnswer extends React.Component {
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
    const { locale, answer, answerLoading, editAnswerLoading } = this.props;

    const sendProps = {
      form: EDIT_ANSWER_FORM,
      formHeader: translationMessages[locale][messages.title.id],
      sendButtonId: `${EDIT_ANSWER_BUTTON}_${0}`,
      translations: translationMessages[locale],
      sendAnswer: this.editAnswer,
      sendAnswerLoading: editAnswerLoading,
      submitButtonName:
        translationMessages[locale][messages.submitButtonName.id],
      answer,
    };

    const helmetTitle = answer || sendProps.translations[messages.title.id];

    const helmetDescription =
      answer || sendProps.translations[messages.title.description];

    return (
      <div className="container">
        <Helmet>
          <title>{helmetTitle}</title>
          <meta name="description" content={helmetDescription} />
        </Helmet>

        {!answerLoading && (
          <Box>
            <AnswerForm {...sendProps} />
          </Box>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAnswerDispatch: (questionid, answerid) =>
      dispatch(getAnswer(questionid, answerid)),
    editAnswerDispatch: (answer, questionid, answerid) =>
      dispatch(editAnswer(answer, questionid, answerid)),
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
