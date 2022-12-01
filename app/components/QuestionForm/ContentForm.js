import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { strLength25x30000, required } from 'components/FormFields/validate';
import TextEditorField from 'components/FormFields/TextEditorField';

import messages from './messages';

import { FORM_CONTENT, FORM_MEDIA } from './constants';

import MediaInputField from '../FormFields/MediaInputField';

import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/Toast/reducer';

import { addToast } from '../../containers/Toast/actions';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';

const ContentForm = ({ questionLoading, intl, showToastDispatch, locale }) => {
  const [mediaLink, setMediaLink] = useState('');
  return (
    <>
      <Field
        name={FORM_CONTENT}
        component={TextEditorField}
        disabled={questionLoading}
        label={intl.formatMessage(messages.questionBodyLabel)}
        validate={[strLength25x30000, required]}
        warn={[strLength25x30000, required]}
        mediaLink={mediaLink}
      />
      <Field
        name={FORM_MEDIA}
        component={MediaInputField}
        disabled={questionLoading}
        label={intl.formatMessage(messages.media)}
        mediaLink={mediaLink}
        setMediaLink={setMediaLink}
        showToastDispatch={showToastDispatch}
        locale={locale}
      />
    </>
  );
};

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
  showToastDispatch: PropTypes.func,
  locale: PropTypes.string,
};

export default compose(
  injectReducer({ key: 'toast', reducer }),
  connect(
    createStructuredSelector({ locale: makeSelectLocale() }),
    (dispatch) => ({
      showToastDispatch: bindActionCreators(addToast, dispatch),
    }),
  ),
)(ContentForm);
