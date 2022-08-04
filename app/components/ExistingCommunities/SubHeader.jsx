import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TEXT_SECONDARY } from 'style-constants';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SubHeaderWrapper, {
  SubHeaderWrapperRightPanel,
} from 'components/Header/Complex';

import sortingOptions from './sortingOptions';

const Button = ({ sorting, icon }) => {
  const { t } = useTranslation();

  return (
    <Span
      className="d-inline-flex align-items-center mr-2 text-capitalize"
      bold
    >
      <img className="mr-2" src={icon} alt="icon" />
      {t(sorting.message)}
    </Span>
  );
};

const Menu = ({ changeSorting, sorting, options }) => {
  const { t } = useTranslation();

  return (
    <Ul>
      {Object.keys(options).map(item => (
        <CheckedItem
          key={`${options[item].message.id}_${options[item].order}`}
          onClick={() => changeSorting(options[item])}
          isActive={sorting.message.id === options[item].message.id}
        >
          {t(options[item].message)}
        </CheckedItem>
      ))}
    </Ul>
  );
};

export const SubHeader = ({ changeSorting, sorting, communitiesNumber }) => {
  const { t } = useTranslation();

  return (
    <SubHeaderWrapper position="bottom">
      <H3>
        <MediumImageStyled src={communitiesHeader} alt="communitiesHeader" />

        <span>
          {t('common.communities')}
          <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
            {communitiesNumber}
          </Span>
        </span>
      </H3>

      <SubHeaderWrapperRightPanel className="d-flex right-panel">
        <Dropdown
          button={<Button sorting={sorting} icon={communitiesHeaderFilter} />}
          menu={
            <Menu
              changeSorting={changeSorting}
              sorting={sorting}
              options={sortingOptions}
            />
          }
          id="existing-communities-dropdown"
          isArrowed
        />
      </SubHeaderWrapperRightPanel>
    </SubHeaderWrapper>
  );
};

Button.propTypes = {
  sorting: PropTypes.object,
  icon: PropTypes.string,
};

Menu.propTypes = {
  options: PropTypes.object,
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
};

SubHeader.propTypes = {
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  setLang: PropTypes.func,
  communitiesNumber: PropTypes.number,
  language: PropTypes.object,
  languages: PropTypes.object,
};

export { Button, Menu };
export default React.memo(SubHeader);
