import React from 'react';
import { MessengerTypes } from 'utils/constants';

import botLogo from 'images/bot/logo_small.svg?inline';
import telegram from 'images/bot/bot_telegram.svg?inline';
import discord from 'images/bot/bot_discord.svg?inline';
import slack from 'images/bot/bot_slack.svg?inline';
import BotBlock from './BotBlock';
import { styles } from './BotInfo.styled';

export const messengerData = {
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

type BotInfoProps = {
  postTime: string | number;
  locale: string;
  messengerType: number;
  isPost?: boolean;
  isSocialPostType: boolean;
  socialServer: string;
};

const BotInfo: React.FC<BotInfoProps> = ({
  postTime,
  locale,
  messengerType,
  isPost,
  isSocialPostType,
  socialServer,
}) => {
  const messenger = messengerData[messengerType] ?? messengerData[MessengerTypes.Unknown];

  return (
    <div css={styles.container}>
      <div css={styles.botImageWrapper}>
        <img css={styles.botImage} src={botLogo} alt="bot image" />
        {messenger.icon && (
          <img css={styles.messengerImage} src={messenger.icon} alt="messenger image" />
        )}
      </div>
      <BotBlock
        postTime={postTime}
        locale={locale}
        messenger={messenger}
        isPost={isPost}
        isSocialPostType={isSocialPostType}
        socialServer={socialServer}
      />
    </div>
  );
};

export default BotInfo;
