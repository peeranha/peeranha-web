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
import lockBoostImage from 'images/lock.svg?external';
import availableImage from 'images/available.svg?external';
import walletCoinsImage from 'images/walletCoins.svg?inline';

import { getFormattedNum3 } from 'utils/numbers';

import { IconLg, IconSm } from 'components/Icon/IconWithSizes';
import Span from 'components/Span';
import LargeImage from 'components/Img/LargeImage';
import { Box, UlStyled } from 'containers/ViewProfilePage/MainUserInformation';

import messages from './messages';

const SubHeader = ({
  account,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
}) => {
  const availableBalance = 
    stakedInCurrentPeriod >= stakedInNextPeriod ? 
      balance - stakedInCurrentPeriod :
      balance - stakedInNextPeriod;

  return (
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
              <IconLg
                className="mr-2"
                icon={currencyPeerImage}
                color={TEXT_PRIMARY}
              />
              <span>{getFormattedNum3(availableBalance)}</span>
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
                <FormattedMessage {...messages.totalBalance} />
                <Span>
                  <IconSm
                    className="mr-2"
                    icon={availableImage}
                    color={TEXT_PRIMARY}
                    fill={TEXT_PRIMARY}
                  />
                  <span>{getFormattedNum3(balance)}</span>
                </Span>
              </li>
              <li>
                <FormattedMessage {...messages.stakedInCurrentPeriod} />
                <Span>
                  <IconSm
                    className="mr-2"
                    icon={lockBoostImage}
                    color={TEXT_PRIMARY}
                    fill={TEXT_PRIMARY}
                  />
                  <span>{getFormattedNum3(stakedInCurrentPeriod)}</span>
                </Span>
              </li>
              <li>
                <FormattedMessage {...messages.stakedInNextPeriod} />
                <Span>
                  <IconSm
                    className="mr-2"
                    icon={lockBoostImage}
                    color={TEXT_PRIMARY}
                    fill={TEXT_PRIMARY}
                  />
                  <span>{getFormattedNum3(stakedInNextPeriod)}</span>
                </Span>
              </li>
              <li>
                <FormattedMessage {...messages.eosAccount} />
                <Span>{account}</Span>
              </li>
            </UlStyled>
          </div>
        </div>
      </div>
    </Box>
  );
}

SubHeader.propTypes = {
  account: PropTypes.string,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
};

export default React.memo(SubHeader);
