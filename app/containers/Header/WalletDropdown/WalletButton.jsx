import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  BG_PRIMARY,
  BORDER_PRIMARY,
  BORDER_WARNING_LIGHT,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import currencyPeerIcon from 'images/currencyPeer.svg?external';
import boostWalletIcon from 'images/boost-wallet-icon.svg?external';

import { getFormattedNum4 } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { REWARD_CLAIMING_ENABLED } from 'utils/constants';

import { IconLg } from 'components/Icon/IconWithSizes';
import Icon from 'components/Icon';
import Span from 'components/Span';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';
import NotificationIcon from './NotificationIcon';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();
const colors = singleCommunityColors();

const ButtonStyled = styled.span`
  position: relative;
  display: flex;
  align-items: center;

  border-width: 1px;
  border-style: ${({ isBoost }) => (isBoost ? 'dashed' : 'solid')};
  border-color: ${({ isBoost }) =>
    isBoost ? BORDER_WARNING_LIGHT : colors.walletButton || BORDER_PRIMARY};

  /* set single community border */
  border: ${({ isMobileVersion, isBoost }) =>
    !isMobileVersion && !isBoost && styles.communityBorderStyle};

  border-left: 0px;
  border-radius: 23px;
  padding-right: 25px;
  height: 47px;

  ${MediumSpecialImage}, ${SmallSpecialImage} {
    margin-right: 10px;
  }
`;

const IconBG = MediumSpecialImage.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isMobileVersion }) =>
    (!isMobileVersion && styles.communityBorderStyle) ||
    `1px solid ${colors.walletButton || BORDER_PRIMARY}`};
  color: ${(x) => x.color};
`.withComponent('span');

const BoostIconWrapper = styled.span`
  margin-top: 3px;
  margin-right: 7px;
  margin-left: -5px;
`;

const isPositiveNumber = (number) => Number.isFinite(number) && number > 0;

const WalletButton = ({
  balance,
  isMobileVersion,
  number,
  locale,
  isBoost,
}) => {
  const { t } = useTranslation();

  return (
    <div className="position-relative">
      <ButtonStyled isBoost={!!isBoost} isMobileVersion={isMobileVersion}>
        {isBoost ? (
          <>
            <BoostIconWrapper>
              <Icon
                width="50"
                icon={boostWalletIcon}
                specialStyles={!!single && styles.boostWalletBtnStyles}
              />
            </BoostIconWrapper>
          </>
        ) : (
          <IconBG
            className="mr-2"
            bg={
              (!isMobileVersion && styles.fullyTransparent) ||
              colors.walletButton ||
              BG_PRIMARY
            }
            color={TEXT_LIGHT}
            isMobileVersion={isMobileVersion}
          >
            <IconLg icon={currencyPeerIcon} color="white" />
          </IconBG>
        )}

        <span className="d-flex flex-column text-left">
          <Span
            className="align-middle"
            fontSize="16"
            bold
            color={(!isMobileVersion && colors.commHeadElemColor) || ''}
          >
            {getFormattedNum4(Math.round(balance * 100) / 100)}
          </Span>
          <Span
            className="align-middle"
            fontSize="14"
            lineHeight="18"
            color={
              (!isMobileVersion && colors.commHeadElemColor) || TEXT_SECONDARY
            }
          >
            {t('common.peers')}
          </Span>
        </span>
      </ButtonStyled>
      {REWARD_CLAIMING_ENABLED &&
        isMobileVersion &&
        isPositiveNumber(number) && (
          <NotificationIcon
            isMobileVersion={isMobileVersion}
            number={number}
            iconId="WalletButton_NotificationIconisMobile"
            locale={locale}
          />
        )}
    </div>
  );
};

WalletButton.propTypes = {
  balance: PropTypes.number,
  locale: PropTypes.string,
  isMobileVersion: PropTypes.bool,
  number: PropTypes.number,
  isBoost: PropTypes.bool,
  getWeekStatDispatch: PropTypes.func,
};

export { IconBG };
export default memo(WalletButton);
