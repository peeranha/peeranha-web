import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape, FormattedMessage } from 'react-intl';

import Span from 'components/Span';
import { strLength25x30000, required } from 'components/FormFields/validate';
import TextEditorField from 'components/FormFields/TextEditorField';

import commonMessages from 'common-messages';
import messages from './messages';

import { TEXT_SECONDARY } from 'style-constants';
import { FORM_CONTENT } from './constants';

import { PreviewWrapper } from '../AnswerForm';
import Wrapper from '../FormFields/Wrapper';

const ContentForm = ({ questionLoading, intl, formValues }) => (
  <Field
    name={FORM_CONTENT}
    component={TextEditorField}
    disabled={questionLoading}
    label={intl.formatMessage(messages.questionBodyLabel)}
    validate={[strLength25x30000, required]}
    warn={[strLength25x30000, required]}
  />
);

ContentForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
};

export default memo(ContentForm);
