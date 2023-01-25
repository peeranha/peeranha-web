import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { BG_LIGHT, TEXT_SECONDARY } from 'style-constants';

import { singleCommunityStyles } from 'utils/communityManagement';

import energyIcon from 'images/energy.svg?external';

import Ul, { Ul1 } from 'components/Ul/SpecialOne';
import Span from 'components/Span';
import { IconEm, IconLm } from 'components/Icon/IconWithSizes';
import Dropdown from 'components/Dropdown';
import { getStatus } from 'components/RatingStatus';
import userStatusOptions from 'components/RatingStatus/options';

import { IconBG } from './WalletDropdown/WalletButton';

const styles = singleCommunityStyles();

export const Button = ({ energy }) => (
  <IconBG
    className="d-none"
    bg={styles.fullyTransparent || BG_LIGHT}
    css={{ border: styles.communityBorderStyle }}
  >
    <Span fontSize="16" bold css={styles.energyNumberStyles}>
      {energy}
    </Span>
    <IconEm icon={energyIcon} css={styles.dropDownIconStyles} />
  </IconBG>
);

const Menu = ({ energy, maxEnergy, faqQuestions }) => {
  const { t } = useTranslation();

  return (
    <nav>
      <Ul>
        <li>
          <IconLm icon={energyIcon} />
          <Span className="mx-1">
            <Span fontSize="16" bold>
              {energy}
            </Span>
            <span>/</span>
            <Span color={TEXT_SECONDARY} bold>
              {maxEnergy}
            </Span>
          </Span>
          <Span bold>{t('common.energy')}</Span>
        </li>
      </Ul>

      <Ul1>{faqQuestions}</Ul1>
    </nav>
  );
};

const EnergyDropdown = ({ energy, rating, faqQuestions }) => {
  const { maxEnergy } = userStatusOptions[getStatus(rating)] || {
    maxEnergy: 0,
  };

  if (process.env.ENV === 'prod') {
    return null;
  }

  return (
    <Dropdown
      id={`profile_id_${Math.random()}`}
      className="d-none d-md-flex"
      button={<Button energy={energy} />}
      menu={
        <Menu
          energy={energy}
          maxEnergy={maxEnergy}
          faqQuestions={faqQuestions}
        />
      }
    />
  );
};

EnergyDropdown.propTypes = {
  energy: PropTypes.number,
  rating: PropTypes.number,
  faqQuestions: PropTypes.array,
};

Button.propTypes = {
  energy: PropTypes.number,
};

Menu.propTypes = {
  energy: PropTypes.number,
  maxEnergy: PropTypes.number,
  faqQuestions: PropTypes.array,
};

export default React.memo(EnergyDropdown);
