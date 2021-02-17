import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { strLength8x100 } from 'components/FormFields/validate';

import facebookIcon from 'images/logo-facebook.svg?external';
import instagramIcon from 'images/logo-instagram.svg?external';
import youtubeIcon from 'images/logo-youtube.svg?external';
import pinterestIcon from 'images/logo-pinterest.svg?external';

import TextInputField from 'components/FormFields/TextInputField';
import { Wrapper } from 'components/FormFields/Wrapper';

import {
  FACEBOOK_LINK_FIELD,
  INSTAGRAM_LINK_FIELD,
  YOUTUBE_LINK_FIELD,
  VK_LINK_FIELD,
} from './constants';
import messages from './messages';

const SOCIAL_MEDIA = {
  facebook: {
    fieldName: FACEBOOK_LINK_FIELD,
    icon: facebookIcon,
  },
  instagram: {
    fieldName: INSTAGRAM_LINK_FIELD,
    icon: instagramIcon,
  },
  youtube: {
    fieldName: YOUTUBE_LINK_FIELD,
    icon: youtubeIcon,
  },
  vk: {
    fieldName: VK_LINK_FIELD,
    icon: pinterestIcon,
  },
};

const SocialLinksGroup = ({ disabled, intl, meta }) => (
  <Wrapper
    label={intl.formatMessage(messages.socialLinks)}
    tip={intl.formatMessage(messages.socialLinksTip)}
    meta={meta}
    disabled={disabled}
  >
    {Object.keys(SOCIAL_MEDIA).map(key => (
      <Field
        disabled={disabled}
        name={SOCIAL_MEDIA[key].fieldName}
        component={TextInputField}
        validate={[strLength8x100]}
        warn={[strLength8x100]}
        splitInHalf
        iconLabel={SOCIAL_MEDIA[key].icon}
        key={key}
        isShowLabel={false}
      />
    ))}
  </Wrapper>
);

SocialLinksGroup.propTypes = {
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  meta: PropTypes.object,
};

export default memo(SocialLinksGroup);
