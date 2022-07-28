import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import facebookIcon from 'images/logo-facebook.svg?external';
import instagramIcon from 'images/logo-instagram.svg?external';
import youtubeIcon from 'images/logo-youtube.svg?external';
import vkIcon from 'images/logo-vk.svg?external';

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
    icon: vkIcon,
  },
};

const SocialLinksGroup = ({ disabled, intl }) => (
  <Wrapper
    label={intl.formatMessage(messages.socialLinks)}
    tip={intl.formatMessage(messages.socialLinksTip)}
    disabled={disabled}
  >
    {Object.keys(SOCIAL_MEDIA).map(key => (
      <Field
        disabled={disabled}
        name={SOCIAL_MEDIA[key].fieldName}
        component={TextInputField}
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
};

export default memo(SocialLinksGroup);
