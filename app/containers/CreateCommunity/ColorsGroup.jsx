import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { PEER_PRIMARY_COLOR, PEER_WARNING_COLOR } from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import ColorField from 'components/FormFields/ColorField';

import { MAIN_COLOR_FIELD, HIGHLIGHT_COLOR_FIELD } from './constants';
import messages from './messages';

const ColorsGroup = ({ disabled, intl, formValues, initialValues }) => (
  <Wrapper
    splitInHalf
    disabled={disabled}
    label={intl.formatMessage(messages.colors)}
  >
    <Field
      disabled={disabled}
      name={MAIN_COLOR_FIELD}
      component={ColorField}
      label={intl.formatMessage(messages.mainColor)}
      formValues={formValues}
      defaultValue={
        initialValues?.toJS()[MAIN_COLOR_FIELD] ?? PEER_PRIMARY_COLOR
      }
    />

    <Field
      disabled={disabled}
      name={HIGHLIGHT_COLOR_FIELD}
      component={ColorField}
      label={intl.formatMessage(messages.highlightColor)}
      formValues={formValues}
      defaultValue={
        initialValues?.toJS()[HIGHLIGHT_COLOR_FIELD] ?? PEER_WARNING_COLOR
      }
    />
  </Wrapper>
);

ColorsGroup.propTypes = {
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  meta: PropTypes.object,
  formValues: PropTypes.object,
  initialValues: PropTypes.object,
};

export default memo(ColorsGroup);
