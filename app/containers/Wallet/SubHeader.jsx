import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BG_PRIMARY_LIGHT, TEXT_SECONDARY_LIGHT, TEXT_PRIMARY } from 'style-constants';

import currencyPeerImage from 'images/currencyPeer.svg?external';
import lockBoostImage from 'images/lock.svg?external';
import availableImage from 'images/available.svg?external';
import walletCoinsImage from 'images/walletCoins.svg?inline';
import { isSuiBlockchain } from 'utils/constants';

import { getFormattedNum3 } from 'utils/numbers';

import { IconLg, IconSm } from 'components/Icon/IconWithSizes';
import Span from 'components/Span';
import A from 'components/A';
import LargeImage from 'components/Img/LargeImage';
import { Box, UlStyled } from 'containers/ViewProfilePage/MainUserInformation';

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
  const { t } = useTranslation();
  const userAddress = isSuiBlockchain
    ? process.env.BLOCKCHAIN_EXPLORERE_URL.replace('{0}', account)
    : process.env.BLOCKCHAIN_EXPLORERE_URL + account;

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
              <IconLg className="mr-2" icon={currencyPeerImage} color={TEXT_PRIMARY} />
              <AvailableBalance>
                {getFormattedNum3(Math.round(availableBalance * 1000000) / 1000000)}
              </AvailableBalance>
            </Span>
            <Span
              className="d-none d-sm-inline-block ml-2"
              fontSize="24"
              mobileFS="18"
              color={TEXT_SECONDARY_LIGHT}
              bold
            >
              {t('common.peers')}
            </Span>
          </div>

          <div className="d-flex align-items-center">
            <WalletUl>
              <li>
                {t('wallet.totalBalance')}
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
              {Boolean(stakedInCurrentPeriod) && (
                <li>
                  {t('wallet.stakedInCurrentPeriod')}
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
              )}
              {Boolean(stakedInNextPeriod) && (
                <li>
                  {t('wallet.stakedInNextPeriod')}
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
              )}
              <li>
                {t('common.walletAddress')}
                <A to={{ pathname: userAddress }} href={userAddress} target="_blank">
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
