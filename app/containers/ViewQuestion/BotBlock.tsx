import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { TEXT_SECONDARY } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import Span from 'components/Span';

import messages from './messages';
import BotInfo from './BotInfo';

type Messenger = {
  name: string;
  icon?: string;
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

type BotBlockProps = {
  postTime: string | number;
  locale: string;
  messenger: Messenger;
};

const BotBlock: React.FC<BotBlockProps> = ({ postTime, locale, messenger }) => (
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

export default BotBlock;
