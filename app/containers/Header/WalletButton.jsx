import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  BG_PRIMARY,
  BORDER_PRIMARY,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import messages from 'common-messages';

import currencyPeerIcon from 'images/currencyPeer.svg?external';

import { getFormattedNum4 } from 'utils/numbers';

import { IconLg } from 'components/Icon/IconWithSizes';
import Span from 'components/Span';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import NotificationIcon from './NotificationIcon';
import headerMessages from './messages';

const ButtonStyled = styled.span`
  position: relative;
  z-index: 1001;
  display: flex;
  align-items: center;
  border: 1px solid ${BORDER_PRIMARY};
  border-left: 0px;
  border-radius: 23px;
  padding-right: 25px;
  height: 47px;

  ${MediumSpecialImage}, ${SmallSpecialImage} {
    margin-right: 10px;
  }

  > span {
    margin-bottom: 1px;
  }
`;

const IconBG = MediumSpecialImage.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${BORDER_PRIMARY};
  color: ${x => x.color};
`.withComponent('span');

const getTooltipText = (locale, number) => {
  const translations = translationMessages[locale];
  return (
    translations[headerMessages.walletTooltipPart1.id] +
    number +
    translations[headerMessages.walletTooltipPart2.id]
  );
};

const isPositiveNumber = number => Number.isFinite(number) && number > 0;

const WalletButton = ({ balance, mobile, locale, number }) => (
  <ButtonStyled>
    {isPositiveNumber(number) && (
      <NotificationIcon
        mobile={mobile}
        number={number}
        iconId="walletDropDown"
        tooltipText={getTooltipText(locale, number)}
      />
    )}
    <IconBG className="mr-2" bg={BG_PRIMARY} color={TEXT_LIGHT}>
      <IconLg icon={currencyPeerIcon} />
    </IconBG>

    <span className="d-flex flex-column text-left">
      <Span className="align-middle" fontSize="16" bold>
        {getFormattedNum4(balance)}
      </Span>
      <Span
        className="align-middle"
        fontSize="14"
        lineHeight="18"
        color={TEXT_SECONDARY}
      >
        <FormattedMessage {...messages.peers} />
      </Span>
    </span>
  </ButtonStyled>
);

WalletButton.propTypes = {
  balance: PropTypes.number,
  locale: PropTypes.string,
  mobile: PropTypes.bool,
  number: PropTypes.number,
};

export { IconBG };
export default memo(
  compose(
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
      }),
    ),
  )(WalletButton),
);
