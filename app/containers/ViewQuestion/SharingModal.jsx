import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

import { SECONDARY_SPECIAL, BG_BLACK, BG_LIGHT } from 'style-constants';

import twitter from 'images/social-media-logos/logo-twitter-glyph-24.svg?inline';
import telegram from 'images/social-media-logos/logo-telegram-glyph-24.svg?inline';
import reddit from 'images/social-media-logos/logo-reddit-glyph-24.svg?inline';

import { APP_TWITTER_NICKNAME } from 'utils/constants';

import Input from 'components/Input';

import messages from './messages';

const DropdownModal = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  z-index: 9;

  padding: 15px;
  padding-bottom: 10px;
  width: 300px;

  background-color: ${BG_LIGHT};
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 ${SECONDARY_SPECIAL};

  p {
    margin-bottom: 10px;

    color: ${BG_BLACK};
  }

  input {
    padding-right: 14px;
  }
`;

const DropdownModalFooter = styled.footer`
  display: flex;
  padding-top: 15px;

  button {
    margin-right: 15px;
  }
`;

const SharingModal = props => {
  const { questionData, intl } = props;

  return (
    <DropdownModal>
      <p>
        <b>
          <FormattedMessage {...messages.shareTitle} />
        </b>
      </p>
      <Input input={{ value: window.location.href }} readOnly type="text" />
      <DropdownModalFooter>
        <TwitterShareButton
          url={window.location.href}
          title={questionData.content.title}
          via={APP_TWITTER_NICKNAME}
        >
          <img
            src={twitter}
            alt={intl.formatMessage({
              id: messages.shareTwitter.id,
            })}
          />
        </TwitterShareButton>
        <TelegramShareButton
          url={window.location.href}
          title={questionData.content.title}
        >
          <img
            src={telegram}
            alt={intl.formatMessage({
              id: messages.shareTelegram.id,
            })}
          />
        </TelegramShareButton>
        <RedditShareButton
          url={window.location.href}
          title={questionData.content.title}
        >
          <img
            src={reddit}
            alt={intl.formatMessage({
              id: messages.shareReddit.id,
            })}
          />
        </RedditShareButton>
      </DropdownModalFooter>
    </DropdownModal>
  );
};

SharingModal.propTypes = {
  questionData: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default React.memo(injectIntl(SharingModal));
