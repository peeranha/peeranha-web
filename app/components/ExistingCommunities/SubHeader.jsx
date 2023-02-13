/* eslint no-unused-vars: 0 */
import Dropdown from 'components/common/Dropdown';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { TEXT_SECONDARY } from 'style-constants';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
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
    <Span className="d-inline-flex align-items-center text-capitalize" bold>
      <img className="mr-2" src={icon} alt="icon" />

      <div
        css={css`
          display: none;
          @media (min-width: 768px) {
            display: inline;
          }
        `}
      >
        {t(sorting.message)}
      </div>
    </Span>
  );
};

const Menu = ({ changeSorting, sorting, options }) => {
  const { t } = useTranslation();

  return (
    <Ul>
      {Object.keys(options).map((item) => (
        <CheckedItem
          key={`${options[item].message.id}_${options[item].order}`}
          onClick={() => changeSorting(options[item])}
          isActive={sorting.message === options[item].message}
        >
          {t(options[item].message)}
        </CheckedItem>
      ))}
    </Ul>
  );
};

export const SubHeader = ({ changeSorting, sorting, communitiesNumber }) => {
  const { t } = useTranslation();

  const options = Object.keys(sortingOptions).map((x, index) => {
    return {
      label: t(sortingOptions[x].message),
      value: index,
      render: (
        <CheckedItem
          key={`${sortingOptions[x].message}_${sortingOptions[x].order}`}
          onClick={() => changeSorting(sortingOptions[x])}
          isActive={sorting.message === sortingOptions[x].message}
          css={css`padding-left: 0; !important;`}
        >
          {t(sortingOptions[x].message)}
        </CheckedItem>
      ),
    };
  });

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
          options={options}
          trigger={<Button sorting={sorting} icon={communitiesHeaderFilter} />}
          id="existing-communities-dropdown"
          appendTo="parent"
          isArrowed
          arrowWidth={18}
        />
      </SubHeaderWrapperRightPanel>
    </SubHeaderWrapper>
  );
};

Button.propTypes = {
  sorting: PropTypes.object,
  icon: PropTypes.string,
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
