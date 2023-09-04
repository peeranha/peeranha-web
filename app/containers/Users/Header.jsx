import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY, BORDER_PRIMARY } from 'style-constants';

import { getFormattedNum2 } from 'utils/numbers';
import {
  getSingleCommunityDetails,
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';

import usersHeaderFilter from 'images/communitiesHeaderFilter.svg?external';
import usersHeader from 'images/usersHeader.svg?external';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import MediumIcon, { MediumIconStyled } from 'components/Icon/MediumIcon';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

import options from './options';

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();

const Button = ({ sorting }) => {
  const { t } = useTranslation();

  return (
    <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
      <MediumIcon>
        <IconMd
          className="mr-2"
          icon={usersHeaderFilter}
          color={colors.btnColor || BORDER_PRIMARY}
          isColorImportant={true}
        />
      </MediumIcon>
      {t(options[sorting].message)}
    </Span>
  );
};

const Menu = ({ sort, sorting }) => {
  const { t } = useTranslation();

  return (
    <Ul>
      {Object.keys(options).map((x) => (
        <CheckedItem
          key={x}
          onClick={() => sort(options[x].orderDirection)}
          isActive={x === sorting}
        >
          {t(options[x].message)}
        </CheckedItem>
      ))}
    </Ul>
  );
};

export const Header = ({ sorting, dropdownFilter, userCount }) => {
  const { t } = useTranslation();
  const isSingleCommunityMode = Boolean(isSingleCommunityWebsite()) || false;
  const usersCondition = isSingleCommunityMode ? 'activeUsers' : 'users';

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={usersHeader}
            width="38"
            color={colors.headerPrimary || BORDER_PRIMARY}
            isColorImportant={true}
          />
        </MediumIconStyled>

        <span>{t(`common.${usersCondition}`)}</span>
      </H3>

      {!single && (
        <WrapperRightPanel className="right-panel">
          <Dropdown
            button={<Button sorting={sorting} />}
            menu={<Menu sort={dropdownFilter} sorting={sorting} />}
            id="users-dropdown"
            isArrowed
            css={{
              '.dropdown-menu': {
                transform: 'translate3d(-22px, 18px, 0px) !important',
                '@media only screen and (min-width: 576px)': {
                  transform: 'translate3d(0px, 18px, 0px) !important',
                },
              },
            }}
          />
        </WrapperRightPanel>
      )}
    </Wrapper>
  );
};

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
