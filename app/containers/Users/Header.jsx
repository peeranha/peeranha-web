import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY } from 'style-constants';

import commonMessages from 'common-messages';

import { getFormattedNum2 } from 'utils/numbers';

import FilterIcon from 'icons/Filter';
import UsersBigIcon from 'icons/UsersBig';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import MediumIcon, { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

import options from './options';

const Button = ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <MediumIcon>
      <FilterIcon className="mr-2" stroke="#576fed" />
    </MediumIcon>
    <FormattedMessage {...options[sorting].message} />
  </Span>
);

const Menu = ({ sort, sorting }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={x}
        onClick={() => sort(options[x].orderDirection)}
        isActive={x === sorting}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

export const Header = ({ sorting, dropdownFilter, userCount }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <UsersBigIcon stroke="#576fed" fill="#A5BCFF" size={[38, 38]} />
      </MediumIconStyled>

      <span>
        <FormattedMessage {...commonMessages.users} />
        <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
          {getFormattedNum2(userCount)}
        </Span>
      </span>
    </H3>

    <WrapperRightPanel className="right-panel">
      <Dropdown
        button={<Button sorting={sorting} />}
        menu={<Menu sort={dropdownFilter} sorting={sorting} />}
        id="users-dropdown"
        isArrowed
      />
    </WrapperRightPanel>
  </Wrapper>
);

Button.propTypes = {
  sorting: PropTypes.string,
};

Menu.propTypes = {
  sorting: PropTypes.string,
  sort: PropTypes.func,
};

Header.propTypes = {
  dropdownFilter: PropTypes.func,
  sorting: PropTypes.string,
  userCount: PropTypes.number,
};

export default React.memo(Header);
