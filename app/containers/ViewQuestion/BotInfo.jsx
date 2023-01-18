import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { TEXT_SECONDARY, PEER_PRIMARY_COLOR } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME, MessengerTypes } from 'utils/constants';
import { hexToRgbaString } from 'utils/converters';

import Span from 'components/Span';

import botLogo from 'images/bot/logo_small.svg?inline';
import telegram from 'images/bot/bot_telegram.svg?inline';
import discord from 'images/bot/bot_discord.svg?inline';
import slack from 'images/bot/bot_slack.svg?inline';
import { CELL } from 'components/Img';

import messages from './messages';

const MessengerData = {
  [MessengerTypes.Unknown]: {
    name: 'Peeranha Bot',
  },
  [MessengerTypes.Telegram]: {
    name: 'Telegram',
    icon: telegram,
  },
  [MessengerTypes.Discord]: {
    name: 'Discord',
    icon: discord,
  },
  [MessengerTypes.Slack]: {
    name: 'Slack',
    icon: slack,
  },
};

const blockCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  max-width: cacl(100% - 50px - 152px);

  @media only screen and (max-width: 576px) {
    > span {
      max-width: 230px;
    }
  }

  @media only screen and (max-width: 480px) {
    > span {
      max-width: 190px;
    }
  }

  @media only screen and (max-width: 420px) {
    > span {
      max-width: 150px;
    }
  }

  @media only screen and (max-width: 380px) {
    > span {
      max-width: 125px;
    }
  }
`;

const borderColor = hexToRgbaString(PEER_PRIMARY_COLOR, 0.4);

const botImgCss = css`
  padding: 1px;

  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;

  border-radius: 50%;
  border: 2.5px solid ${borderColor};

  object-fit: scale-down;
  display: inline-block;
`;

const messengerImgCss = css`
  position: absolute;
  bottom: 0px;
  right: 0px;

  width: ${CELL * 0.6125}px;
  height: ${CELL * 0.6125}px;

  border-radius: 50%;
  border: 2px solid ${borderColor};

  background: white;
`;

export const botImageWrapperCss = css`
  position: relative;
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

export const BotBlock = ({ postTime, locale, messenger }) => (
  <div css={blockCss}>
    <span className={`d-flex align-items-center mr-2`}>
      <Span
        className="mr-2"
        fontSize="14"
        lineHeight="18"
        textOverflow="ellipsis"
      >
        <FormattedMessage
          id={messages.botAnswer.id}
          values={{ bot: messenger.name }}
        />
      </Span>
    </span>

    <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="18">
      {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
    </Span>
  </div>
);

export const BotInfo = ({ postTime, locale, messengerType }) => {
  const messenger =
    MessengerData[messengerType] ?? MessengerData[MessengerTypes.Unknown];

  return (
    <div className="d-flex flex-shrink-0">
      <div css={botImageWrapperCss} className="mr-2">
        <img css={botImgCss} src={botLogo} alt="avatar" />
        {messenger.icon && <img css={messengerImgCss} src={messenger.icon} />}
      </div>
      <BotBlock postTime={postTime} locale={locale} messenger={messenger} />
    </div>
  );
};

BotInfo.propTypes = {
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  messengerType: PropTypes.number,
};

export default React.memo(BotInfo);
