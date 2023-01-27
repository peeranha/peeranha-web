import React from 'react';
import { css } from '@emotion/react';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import { MessengerTypes } from 'utils/constants';
import { hexToRgbaString } from 'utils/converters';

import botLogo from 'images/bot/logo_small.svg?inline';
import telegram from 'images/bot/bot_telegram.svg?inline';
import discord from 'images/bot/bot_discord.svg?inline';
import slack from 'images/bot/bot_slack.svg?inline';
import { CELL } from 'components/Img';
import BotBlock from './BotBlock';

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
  bottom: -2px;
  right: -2px;

  width: ${CELL * 0.6125}px;
  height: ${CELL * 0.6125}px;

  border-radius: 50%;
  border: 1.5px solid ${borderColor};

  background: white;
  box-sizing: content-box;
`;

export const botImageWrapperCss = css`
  position: relative;
  width: ${CELL * 1.75}px;
  height: ${CELL * 1.75}px;
`;

type BotInfoProps = {
  postTime: string | number;
  locale: string;
  messengerType: number;
};

const BotInfo: React.FC<BotInfoProps> = ({
  postTime,
  locale,
  messengerType,
}) => {
  const messenger: any =
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

export default BotInfo;
