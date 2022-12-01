import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form/immutable';

import messages from 'containers/Profile/messages';
import { ABOUT_FIELD } from 'containers/Profile/constants';

import TextEditorField from 'components/FormFields/TextEditorField';
import { strLength20x1000 } from 'components/FormFields/validate';

const AboutForm = ({ intl, isProfileSaving }) => (
  <Field
    name={ABOUT_FIELD}
    component={TextEditorField}
    label={intl.formatMessage(messages.aboutLabel)}
    tip={intl.formatMessage(messages.companyTip)}
    disabled={isProfileSaving}
    validate={strLength20x1000}
    warn={strLength20x1000}
  />
);

AboutForm.propTypes = {
  formValues: PropTypes.object,
  intl: intlShape.isRequired,
  isProfileSaving: PropTypes.bool,
};

export default memo(AboutForm);
