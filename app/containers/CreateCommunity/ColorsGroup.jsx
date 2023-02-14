import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { PEER_PRIMARY_COLOR, PEER_WARNING_COLOR } from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import ColorField from 'components/FormFields/ColorField';

import { MAIN_COLOR_FIELD, HIGHLIGHT_COLOR_FIELD } from './constants';

const ColorsGroup = ({ disabled, formValues, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Wrapper splitInHalf disabled={disabled} label={t('common.colors')}>
      <Field
        disabled={disabled}
        name={MAIN_COLOR_FIELD}
        component={ColorField}
        label={t('common.mainColor')}
        formValues={formValues}
        defaultValue={
          initialValues?.toJS()[MAIN_COLOR_FIELD] ?? PEER_PRIMARY_COLOR
        }
      />

      <Field
        disabled={disabled}
        name={HIGHLIGHT_COLOR_FIELD}
        component={ColorField}
        label={t('common.highlightColor')}
        formValues={formValues}
        defaultValue={
          initialValues?.toJS()[HIGHLIGHT_COLOR_FIELD] ?? PEER_WARNING_COLOR
        }
      />
    </Wrapper>
  );
};

ColorsGroup.propTypes = {
  disabled: PropTypes.bool,
  meta: PropTypes.object,
  formValues: PropTypes.object,
  initialValues: PropTypes.object,
};

export default memo(ColorsGroup);
