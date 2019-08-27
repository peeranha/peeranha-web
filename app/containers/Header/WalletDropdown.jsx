import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BG_PRIMARY,
  BORDER_PRIMARY,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import currencyPeerIcon from 'images/currencyPeer.svg?external';

import { getFormattedNum4 } from 'utils/numbers';

import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import MediumImage from 'components/Img/MediumImage';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import SendTokens from 'containers/SendTokens';

import { AStyled } from './ProfileDropdown';

const ButtonStyled = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid ${BORDER_PRIMARY};
  border-left: 0px;
  border-radius: 23px;
  padding-right: 25px;

  ${MediumImage} {
    margin-right: 10px;
  }
`;

const IconBG = MediumImage.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${BORDER_PRIMARY};

  ${IconStyled} {
    ${() => IconHover({ color: TEXT_LIGHT })};
  }
`.withComponent('span');

const Button = ({ balance }) => (
  <ButtonStyled>
    <IconBG bg={BG_PRIMARY}>
      <Icon width="24" icon={currencyPeerIcon} noMargin />
    </IconBG>

    <span className="d-flex flex-column text-left">
      <Span bold>{getFormattedNum4(balance)}</Span>
      <Span fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.peers} />
      </Span>
    </span>
  </ButtonStyled>
);

const Menu = ({ user }) => (
  <Ul>
    <Li>
      <AStyled to={routes.userWallet(user)}>
        <FormattedMessage {...messages.wallet} />
      </AStyled>
    </Li>
    <Li>
      <SendTokens>
        <FormattedMessage {...messages.sendTokens} />
      </SendTokens>
    </Li>
  </Ul>
);

const WalletDropdown = ({ user, balance }) => (
  <Dropdown
    id={`profile_id_${Math.random()}`}
    button={<Button balance={balance} />}
    menu={<Menu user={user} />}
  />
);

Menu.propTypes = {
  user: PropTypes.string,
};

WalletDropdown.propTypes = {
  user: PropTypes.string,
};

export { IconBG };
export default React.memo(WalletDropdown);
