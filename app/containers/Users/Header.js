import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_SECONDARY } from 'style-constants';

import commonMessages from 'common-messages';

import { getFormattedNum2 } from 'utils/numbers';

import usersHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';
import usersHeader from 'images/usersHeader.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import ArrowIcon from 'components/Dropdown/ArrowIcon';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';

import Base from 'components/Base/BaseRounded';

import options from './options';

const H3Styled = H3.extend`
  ${ArrowIcon} {
    transform: scale(0.6);
  }
`;

const Button = /* istanbul ignore next */ ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <img className="mr-2" src={usersHeaderFilter} alt="usersHeaderFilter" />
    <FormattedMessage {...options[sorting].message} />
  </Span>
);

const Menu = /* istanbul ignore next */ ({ sort, sorting }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={x}
        onClick={() => sort(options[x].sortBy)}
        isActive={x === sorting}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

/* TODO: remove harcoded items */
export const Header = /* istanbul ignore next */ ({
  sorting,
  dropdownFilter,
  userCount,
}) => (
  <Base>
    <H3Styled className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <MediumImageStyled src={usersHeader} alt="usersHeader" />
        <FormattedMessage {...commonMessages.users} />

        <Span
          className="text-lowercase ml-3"
          color={TEXT_SECONDARY}
          fontSize="30"
          bold
        >
          {getFormattedNum2(userCount)}
        </Span>
      </div>

      <Dropdown
        button={<Button sorting={sorting} />}
        menu={<Menu sort={dropdownFilter} sorting={sorting} />}
        id="users-dropdown"
        isArrowed
      />
    </H3Styled>
  </Base>
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
