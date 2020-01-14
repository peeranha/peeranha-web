import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import {
  BG_PRIMARY_LIGHT,
  TEXT_SECONDARY_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';

import currencyPeerImage from 'images/currencyPeer.svg?external';
import walletCoinsImage from 'images/walletCoins.svg?inline';

import { getFormattedNum3 } from 'utils/numbers';

import Icon from 'components/Icon';
import Span from 'components/Span';
import LargeImage from 'components/Img/LargeImage';
import { Box, UlStyled } from 'containers/ViewProfilePage/MainUserInformation';

import messages from './messages';

const SubHeader = ({ account, balance }) => (
  <Box position="bottom">
    <div>
      <div>
        <LargeImage
          className="mr-3"
          src={walletCoinsImage}
          alt="wallet"
          bg={BG_PRIMARY_LIGHT}
          isBordered
        />
      </div>

      <div>
        <div className="d-flex align-items-center">
          <Span fontSize="38" lineHeight="47" mobileFS="28" bold>
            <Icon
              className="mr-2"
              width="24"
              icon={currencyPeerImage}
              color={TEXT_PRIMARY}
            />
            <span>{getFormattedNum3(balance)}</span>
          </Span>
          <Span
            className="d-none d-sm-inline-block ml-2"
            fontSize="24"
            mobileFS="18"
            color={TEXT_SECONDARY_LIGHT}
            bold
          >
            <FormattedMessage {...commonMessages.peers} />
          </Span>
        </div>

        <div className="d-flex align-items-center">
          <UlStyled>
            <li>
              <FormattedMessage {...messages.eosAccount} />
              <span>{account}</span>
            </li>
          </UlStyled>
        </div>
      </div>
    </div>
  </Box>
);

SubHeader.propTypes = {
  account: PropTypes.string,
  balance: PropTypes.string,
};

export default React.memo(SubHeader);
