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
import A from 'components/A';
import Ul from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import { MediumSpecialImage } from 'components/Img/MediumImage';
import { SmallSpecialImage } from 'components/Img/SmallImage';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import SendTokens from 'containers/SendTokens';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

const ButtonStyled = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid ${BORDER_PRIMARY};
  border-left: 0px;
  border-radius: 23px;
  padding-right: ${!styles.withoutSubHeader && single ? 15 : 25}px;
  height: ${!styles.withoutSubHeader && single ? 27 : 47}px;

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

const IconSM = SmallSpecialImage.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${BORDER_PRIMARY};
  color: ${x => x.color};
`.withComponent('span');

export const Button = ({ balance }) => (
  <ButtonStyled>
    {styles.withoutSubHeader || !single ? (
      <IconBG className="mr-2" bg={BG_PRIMARY} color={TEXT_LIGHT}>
        <Icon icon={currencyPeerIcon} width="24" />
      </IconBG>
    ) : (
      <IconSM className="mr-2" bg={BG_PRIMARY} color={TEXT_LIGHT}>
        <Icon icon={currencyPeerIcon} width="17" />
      </IconSM>
    )}

    <span
      className={`d-flex flex-${
        !styles.withoutSubHeader && single ? 'row' : 'column'
      } text-left`}
    >
      <Span className="align-middle" fontSize="16" bold>
        {getFormattedNum4(balance)}
      </Span>
      <Span
        className={
          !styles.withoutSubHeader && single ? 'ml-1 align-middle' : ''
        }
        fontSize="14"
        lineHeight="18"
        color={TEXT_SECONDARY}
      >
        <FormattedMessage {...messages.peers} />
      </Span>
    </span>
  </ButtonStyled>
);

const Menu = ({ user }) => (
  <Ul>
    <A to={routes.userWallet(user)}>
      <FormattedMessage {...messages.wallet} />
    </A>
    <SendTokens>
      <FormattedMessage {...messages.sendTokens} />
    </SendTokens>
  </Ul>
);

const WalletDropdown = ({ user, balance }) => (
  <Dropdown
    id={`profile_id_${Math.random()}`}
    className="d-none d-md-flex mr-3"
    button={<Button balance={balance} />}
    menu={<Menu user={user} />}
  />
);

Button.propTypes = {
  balance: PropTypes.number,
};

Menu.propTypes = {
  user: PropTypes.string,
  balance: PropTypes.string,
};

WalletDropdown.propTypes = {
  user: PropTypes.string,
  balance: PropTypes.number,
};

export { IconBG };
export default React.memo(WalletDropdown);
