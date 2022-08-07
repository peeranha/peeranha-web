import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import cn from 'classnames';

import commonMessages from 'common-messages';

import {
  BG_PRIMARY_LIGHT,
  TEXT_SECONDARY_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';

import PeercoinIcon from 'icons/Peercoin';
import LockIcon from 'icons/Lock';
import WalletIcon from 'icons/Wallet';
import walletCoinsImage from 'images/walletCoins.svg?inline';

import { getFormattedNum3 } from 'utils/numbers';

import Span from 'components/Span';
import A from 'components/A';
import LargeImage from 'components/Img/LargeImage';
import { Box, UlStyled } from 'containers/ViewProfilePage/MainUserInformation';

import messages from './messages';

const AvailableBalance = styled.span`
  @media (max-width: 590px) {
    font-size: 30px;
    line-height: 35px;
  }

  @media (max-width: 350px) {
    display: inline-flex;
    font-size: 19px;
    transform: translateY(-7px);
  }
`;

const WalletUl = UlStyled.extend`
  li {
    @media (max-width: 399px) {
      padding: 5px;
    }
  }
  @media (min-width: 400px) and (max-width: 488px) {
    display: flex;
  }
`;

const SubHeader = ({
  account,
  balance,
  availableBalance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
}) => {
  const userPolygonScanAddress = process.env.BLOCKCHAIN_EXPLORERE_URL + account;

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
            <Span
              className={cn('df aic')}
              fontSize="38"
              lineHeight="47"
              mobileFS="28"
              bold
            >
              <PeercoinIcon className="mr-2" stroke="#dfe3f2" />
              <AvailableBalance>
                {getFormattedNum3(
                  Math.round(availableBalance * 1000000) / 1000000,
                )}
              </AvailableBalance>
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
            <WalletUl>
              <li>
                <FormattedMessage {...messages.totalBalance} />
                <Span>
                  <WalletIcon
                    className="mr-2"
                    stroke={TEXT_PRIMARY}
                    fill={TEXT_PRIMARY}
                    size={[12, 14]}
                  />
                  <span>{getFormattedNum3(balance)}</span>
                </Span>
              </li>
              {Boolean(stakedInCurrentPeriod) && (
                <li>
                  <FormattedMessage {...messages.stakedInCurrentPeriod} />
                  <Span>
                    <LockIcon
                      className="mr-2"
                      stroke={TEXT_PRIMARY}
                      fill={TEXT_PRIMARY}
                      size={[11, 14]}
                    />
                    <span>{getFormattedNum3(stakedInCurrentPeriod)}</span>
                  </Span>
                </li>
              )}
              {Boolean(stakedInNextPeriod) && (
                <li>
                  <FormattedMessage {...messages.stakedInNextPeriod} />
                  <Span>
                    <LockIcon
                      className="mr-2"
                      stroke={TEXT_PRIMARY}
                      fill={TEXT_PRIMARY}
                      size={[11, 14]}
                    />
                    <span>{getFormattedNum3(stakedInNextPeriod)}</span>
                  </Span>
                </li>
              )}
              <li>
                <FormattedMessage {...commonMessages.walletAddress} />
                <A
                  to={{ pathname: userPolygonScanAddress }}
                  href={userPolygonScanAddress}
                  target="_blank"
                >
                  <Span>{account}</Span>
                </A>
              </li>
            </WalletUl>
          </div>
        </div>
      </div>
    </Box>
  );
};

SubHeader.propTypes = {
  account: PropTypes.string,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
};

export default React.memo(SubHeader);
