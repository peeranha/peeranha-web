import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import cn from 'classnames';
import { css } from '@emotion/react';
import { BG_PRIMARY_SPECIAL_2, TEXT_SECONDARY } from 'style-constants';

import CommunitiesIcon from 'icons/Communities';
import FilterIcon from 'icons/Filter';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import SubHeaderWrapper, {
  SubHeaderWrapperRightPanel,
} from 'components/Header/Complex';

import sortingOptions from './sortingOptions';

const Button = ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <FilterIcon className="mr-2" stroke="#576fed" />
    <FormattedMessage {...sorting.message} />
  </Span>
);

const Menu = ({ changeSorting, sorting, options }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={`${options[x].message.id}_${options[x].order}`}
        onClick={() => changeSorting(options[x])}
        isActive={sorting.message.id === options[x].message.id}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

export const SubHeader = ({ changeSorting, sorting, communitiesNumber }) => (
  <SubHeaderWrapper position="bottom">
    <H3>
      <div
        className={cn('mr16 brc df aic jcc')}
        css={css`
          display: flex;
          background: ${BG_PRIMARY_SPECIAL_2};
          border: 1px solid #c2c6d8;
          width: 43px;
          height: 43px;
        `}
      >
        <CommunitiesIcon stroke="#576FED" size={[30, 30]} />
      </div>
      <span>
        <FormattedMessage {...commonMessages.communities} />
        <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
          {communitiesNumber}
        </Span>
      </span>
    </H3>

    <SubHeaderWrapperRightPanel className="d-flex right-panel">
      <Dropdown
        button={<Button sorting={sorting} />}
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
