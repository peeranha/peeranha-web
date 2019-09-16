import React from 'react';
import PropTypes from 'prop-types';
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

const SubHeader = ({ account, balance }) => (
  <BaseStyled className="d-flex" position="bottom">
    <LargeImage
      className="d-none d-sm-block mr-4"
      src={walletCoinsImage}
      alt="wallet"
      bg={BG_PRIMARY_LIGHT}
      isBordered
    />
    <div>
      <div className="mb-3">
        <Span fontSize="38" mobileFS="24" bold>
          <Icon width="24" icon={currencyPeerImage} />
          <span>{getFormattedNum3(balance)}</span>
        </Span>
        <Span
          className="ml-2"
          fontSize="24"
          mobileFS="18"
          color={TEXT_SECONDARY_LIGHT}
          bold
        >
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

SubHeader.propTypes = {
  account: PropTypes.string,
  balance: PropTypes.string,
};

export default React.memo(SubHeader);
