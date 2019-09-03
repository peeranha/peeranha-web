import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { BG_LIGHT, TEXT_SECONDARY } from 'style-constants';

import energyIcon from 'images/energy.svg?inline';

import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import Dropdown from 'components/Dropdown';
import { getStatus } from 'components/RatingStatus';
import userStatusOptions from 'components/RatingStatus/options';
import faqMessages from 'containers/Faq/messages';

import { AStyled } from './ProfileDropdown';
import { IconBG } from './WalletDropdown';

const ButtonStyled = IconBG.extend`
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
  }

  img {
    transform: scale(0.9);
  }
`;

const Button = ({ energy }) => (
  <ButtonStyled bg={BG_LIGHT}>
    <span>{energy}</span>
    <img src={energyIcon} alt="icon" />
  </ButtonStyled>
);

const MenuHeader = Ul.extend`
  position: relative;
`.withComponent('header');

const TextHeader = Li.extend`
  position: relative;
  display: inline-flex;
  align-items: center;
`.withComponent('span');

const Menu = ({ energy, maxEnergy }) => (
  <nav>
    <MenuHeader>
      <TextHeader>
        <img src={energyIcon} alt="icon" />
        <span className="mx-1">
          <Span bold>{energy}</Span>
          <span>/</span>
          <Span color={TEXT_SECONDARY} bold>
            {maxEnergy}
          </Span>
        </span>
        <Span bold>
          <FormattedMessage {...commonMessages.energy} />
        </Span>
      </TextHeader>
    </MenuHeader>
    <Ul>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...faqMessages.whatIsEnergy} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...faqMessages.howToChargeMyEnergy} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.faq()}>
          <FormattedMessage {...faqMessages.valueOfActions} />
        </AStyled>
      </Li>
    </Ul>
  </nav>
);

const EnergyDropdown = ({ energy, rating }) => {
  const { maxEnergy } = userStatusOptions[getStatus(rating)];

  return (
    <Dropdown
      id={`profile_id_${Math.random()}`}
      button={<Button energy={energy} />}
      menu={<Menu energy={energy} maxEnergy={maxEnergy} />}
    />
  );
};

EnergyDropdown.propTypes = {
  energy: PropTypes.number,
  rating: PropTypes.number,
};

Button.propTypes = {
  energy: PropTypes.number,
};

Menu.propTypes = {
  energy: PropTypes.number,
  maxEnergy: PropTypes.number,
};

export default React.memo(EnergyDropdown);
