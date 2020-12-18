import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BG_PRIMARY,
  BORDER_PRIMARY,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import messages from 'common-messages';

import currencyPeerIcon from 'images/currencyPeer.svg?external';

import { getFormattedNum4 } from 'utils/numbers';
import { singleCommunityStyles } from 'utils/communityManagement';

import { IconLg } from 'components/Icon/IconWithSizes';
import Span from 'components/Span';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';
import NotificationIcon from './NotificationIcon';

const styles = singleCommunityStyles();

const ButtonStyled = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  border: ${({ mobile }) =>
    (!mobile && styles.communityBorderStyle) || `1px solid ${BORDER_PRIMARY}`};
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
  border: ${({ mobile }) =>
    (!mobile && styles.communityBorderStyle) || `1px solid ${BORDER_PRIMARY}`};
  color: ${x => x.color};
`.withComponent('span');

const isPositiveNumber = number => Number.isFinite(number) && number > 0;

const WalletButton = ({ balance, mobile, number, locale }) => (
  <div className="position-relative">
    <ButtonStyled mobile={mobile}>
      <IconBG
        className="mr-2"
        bg={(!mobile && styles.fullyTransparent) || BG_PRIMARY}
        color={TEXT_LIGHT}
        mobile={mobile}
      >
        <IconLg icon={currencyPeerIcon} color="white" />
      </IconBG>

      <span className="d-flex flex-column text-left">
        <Span
          className="align-middle"
          fontSize="16"
          bold
          color={(!mobile && styles.commHeadElemColor) || ''}
        >
          {getFormattedNum4(balance)}
        </Span>
        <Span
          className="align-middle"
          fontSize="14"
          lineHeight="18"
          color={(!mobile && styles.commHeadElemColor) || TEXT_SECONDARY}
        >
          <FormattedMessage {...messages.peers} />
        </Span>
      </span>
    </ButtonStyled>
    {mobile &&
      isPositiveNumber(number) && (
        <NotificationIcon
          mobile={mobile}
          number={number}
          iconId="WalletButton_NotificationIconMobile"
          locale={locale}
        />
      )}
  </div>
);

WalletButton.propTypes = {
  balance: PropTypes.number,
  locale: PropTypes.string,
  mobile: PropTypes.bool,
  number: PropTypes.number,
};

export { IconBG };
export default memo(WalletButton);
