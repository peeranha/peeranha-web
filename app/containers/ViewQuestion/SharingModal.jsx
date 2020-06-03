import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { SECONDARY_SPECIAL, BG_BLACK, BG_LIGHT, TEXT_PRIMARY } from 'style-constants';

import twitter from 'images/social-media-logos/logo-twitter-glyph-24.svg?external';
import telegram from 'images/social-media-logos/logo-telegram-glyph-24.svg?external';
import reddit from 'images/social-media-logos/logo-reddit-glyph-24.svg?external';

import { APP_TWITTER_NICKNAME } from 'utils/constants';

import Input from 'components/Input';
import Icon from 'components/Icon';

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
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;

  button {
    margin-right: 15px;
  }

  .copy-btn {
    color: #576fed;

    cursor: pointer;
  }

  .fill {
    fill: ${TEXT_PRIMARY};
  }
`;

const SharingModal = props => {
  const { questionData } = props;

  const [isNotLinkCopied, changeStatusCopyLink] = useState(true);

  return (
    <DropdownModal>
      <p>
        <b>
          <FormattedMessage {...messages.shareTitle} />
        </b>
      </p>
      <Input input={{ value: window.location.href }} readOnly type="text" />
      <DropdownModalFooter>
        <div>
          <TwitterShareButton
            url={window.location.href}
            title={questionData.content.title}
            via={APP_TWITTER_NICKNAME}
          >
            <Icon icon={twitter} width="24" />
          </TwitterShareButton>
          <TelegramShareButton
            url={window.location.href}
            title={questionData.content.title}
          >
            <Icon icon={telegram} width="24" />
          </TelegramShareButton>
          <RedditShareButton
            url={window.location.href}
            title={questionData.content.title}
          >
            <Icon icon={reddit} width="24" />
          </RedditShareButton>
        </div>
        <CopyToClipboard
          text={window.location.href}
          onCopy={() => changeStatusCopyLink(!isNotLinkCopied)}
        >
          <span class="copy-btn">{isNotLinkCopied ? <FormattedMessage {...messages.copy} /> : <FormattedMessage {...messages.copied} />}</span>
        </CopyToClipboard>
      </DropdownModalFooter>
    </DropdownModal>
  );
};

SharingModal.propTypes = {
  questionData: PropTypes.object.isRequired,
};

export default React.memo(SharingModal);
