import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import {
  BG_PRIMARY_LIGHT,
  TEXT_SECONDARY_LIGHT,
  TEXT_SECONDARY,
  TEXT_PRIMARY,
} from 'style-constants';

import currencyPeerImage from 'images/currencyPeer.svg?external';
import walletCoinsImage from 'images/walletCoins.svg?inline';
import eosIconImage from 'images/eosIcon.svg?inline';

import { getFormattedNum3 } from 'utils/numbers';

import Icon from 'components/Icon';
import Span from 'components/Span';
import Base from 'components/Base';
import LargeImage from 'components/Img/LargeImage';
import SmallImage from 'components/Img/SmallImage';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import messages from './messages';

const BaseStyled = Base.extend`
  ${IconStyled} {
    ${IconHover({ color: TEXT_PRIMARY })};
  }
`;

const SubHeader = ({ account }) => (
  <BaseStyled className="d-flex" position="bottom">
    <LargeImage
      src={walletCoinsImage}
      alt="wallet"
      bg={BG_PRIMARY_LIGHT}
      isBordered
    />
    <div className="ml-4">
      <div className="mb-3">
        <Span fontSize="38" bold>
          <Icon width="24" icon={currencyPeerImage} />
          {getFormattedNum3(99999.95)}
        </Span>
        <Span className="ml-2" fontSize="24" color={TEXT_SECONDARY_LIGHT} bold>
          <FormattedMessage {...commonMessages.peers} />
        </Span>
      </div>

      <div className="d-flex flex-column">
        <Span fontSize="14" color={TEXT_SECONDARY}>
          <FormattedMessage {...messages.eosAccount} />
        </Span>
        <Span className="d-flex align-items-center" fontSize="18" bold>
          <SmallImage className="mr-1" src={eosIconImage} alt="icon" noScale />
          <span>{account}</span>
        </Span>
      </div>
    </div>
  </BaseStyled>
);

export default React.memo(SubHeader);
