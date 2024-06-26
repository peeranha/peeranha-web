import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import { strLength25x30000, required } from 'components/FormFields/validate';
import TextEditorField from 'components/FormFields/TextEditorField';

import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/Toast/reducer';
import { FORM_CONTENT, FORM_MEDIA } from './constants';
import MediaInputField from '../FormFields/MediaInputField';
import { addToast } from '../../containers/Toast/actions';

const ContentForm = ({
  questionLoading,
  isHasRole,
  isEditForm,
  isPostAuthor,
  showToastDispatch,
}) => {
  const { t } = useTranslation();
  const [mediaLink, setMediaLink] = useState('');

  return (
    <>
      <Field
        name={FORM_CONTENT}
        component={TextEditorField}
        disabled={questionLoading || (isEditForm && !isPostAuthor)}
        label={t('common.questionBodyLabel')}
        validate={[strLength25x30000, required]}
        warn={[strLength25x30000, required]}
        mediaLink={mediaLink}
      />
      {!(isEditForm && !isPostAuthor) && (
        <Field
          name={FORM_MEDIA}
          component={MediaInputField}
          disabled={questionLoading}
          label={t('common.questionMediaLabel')}
          mediaLink={mediaLink}
          setMediaLink={setMediaLink}
          showToastDispatch={showToastDispatch}
        />
      )}
    </>
  );
};

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  formValues: PropTypes.object,
  showToastDispatch: PropTypes.func,
};

export default compose(
  injectReducer({ key: 'toast', reducer }),
  connect(createStructuredSelector({}), (dispatch) => ({
    showToastDispatch: bindActionCreators(addToast, dispatch),
  })),
)(ContentForm);
