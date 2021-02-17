import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { PEER_PRIMARY_COLOR, PEER_WARNING_COLOR } from 'style-constants';

import { imageValidation } from 'components/FormFields/validate';

import BannerField from 'components/FormFields/BannerField';
import ColorField from 'components/FormFields/ColorField';
import { Wrapper } from 'components/FormFields/Wrapper';

import {
  COMM_BANNER_FIELD,
  MAIN_COLOR_FIELD,
  HIGHLIGHT_COLOR_FIELD,
} from './constants';
import messages from './messages';
import SocialLinksGroup from './SocialLinksGroup';

const BloggerModeForm = ({ disabled, formValues, intl, initialValues }) => (
  <>
    <Field
      name={COMM_BANNER_FIELD}
      component={BannerField}
      validate={[imageValidation]}
      warn={[imageValidation]}
      disabled={disabled}
    />
    <br />
    <SocialLinksGroup disabled={disabled} intl={intl} />

    <Wrapper splitInHalf disabled={disabled}>
      <div style={{ float: 'left', width: '50%' }}>
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
      </div>

      <div style={{ width: '50%', marginLeft: '50%' }}>
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
      </div>
    </Wrapper>
  </>
);

BloggerModeForm.propTypes = {
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(BloggerModeForm);
