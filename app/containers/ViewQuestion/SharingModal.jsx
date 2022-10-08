import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { translationMessages } from 'i18n';
import * as clipboard from 'clipboard-polyfill';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  SECONDARY_SPECIAL,
  BG_BLACK,
  BG_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';
import { APP_TWITTER_NICKNAME } from 'utils/constants';

import TwitterIcon from 'icons/Twitter';
import TelegramIcon from 'icons/Telegram';
import RedditGlyphIcon from 'icons/RedditGlyph';

import { showPopover } from 'utils/popover';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Input from 'components/Input';

import commonMessages from 'common-messages';
import messages from './messages';

import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

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
    margin-right: 0;

    color: #576fed;

    cursor: pointer;
  }

  .fill {
    fill: ${TEXT_PRIMARY};
  }
`;

const SharingModal = ({ questionData, locale }) => {
  const writeToBuffer = event => {
    clipboard.writeText(event.currentTarget.dataset.key);
    showPopover(
      event.currentTarget.id,
      translationMessages[locale][commonMessages.copied.id],
    );
  };

  return (
    <DropdownModal>
      <p>
        <b>
          <FormattedMessage id={messages.shareTitle.id} />
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
            <TwitterIcon fill={colors.linkColor || TEXT_PRIMARY} />
          </TwitterShareButton>
          <TelegramShareButton
            url={window.location.href}
            title={questionData.content.title}
          >
            <TelegramIcon fill={colors.linkColor || TEXT_PRIMARY} />
          </TelegramShareButton>
          <RedditShareButton
            url={window.location.href}
            title={questionData.content.title}
          >
            <RedditGlyphIcon fill={colors.linkColor || TEXT_PRIMARY} />
          </RedditShareButton>
        </div>
        <button
          id="share-link-copy"
          data-key={window.location.href}
          onClick={writeToBuffer}
          className="copy-btn"
          css={css`
            color: ${colors.linkColor + '!important' || TEXT_PRIMARY};
          `}
        >
          <FormattedMessage id={commonMessages.copy.id} />{' '}
        </button>
      </DropdownModalFooter>
    </DropdownModal>
  );
};

SharingModal.propTypes = {
  questionData: PropTypes.object.isRequired,
  locale: PropTypes.string,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
);

export default compose(withConnect)(SharingModal);
