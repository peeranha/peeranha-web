import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { TEXT_SECONDARY, BORDER_PRIMARY } from 'style-constants';
import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';
import communitiesHeader from 'images/communitiesHeader.svg?external';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?external';
import { IconMd } from 'components/Icon/IconWithSizes';
import Icon from 'components/Icon';
import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import SubHeaderWrapper, { SubHeaderWrapperRightPanel } from 'components/Header/Complex';

import sortingOptions from './sortingOptions';

const colors = singleCommunityColors();

const isSingleMode = isSingleCommunityWebsite();

const Button = ({ sorting, icon }) => {
  const { t } = useTranslation();

  return (
    <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
      <IconMd
        className="mr-2"
        icon={icon}
        color={colors.btnColor || BORDER_PRIMARY}
        isColorImportant={true}
      />
      {t(sorting.message)}
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

  return (
    <SubHeaderWrapper position="bottom">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={communitiesHeader}
            width="43"
            css={css`
              circle {
                stroke: ${colors.btnColor || BORDER_PRIMARY};
              }
              path {
                fill: ${colors.btnColor || BORDER_PRIMARY};
              }
            `}
          />
        </MediumIconStyled>
        <span>
          {!isSingleMode ? t('common.communities') : t('common.subcommunities')}
          <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
            {communitiesNumber}
          </Span>
        </span>
      </H3>

      <SubHeaderWrapperRightPanel className="d-flex right-panel">
        <Dropdown
          button={<Button sorting={sorting} icon={communitiesHeaderFilter} />}
          menu={<Menu changeSorting={changeSorting} sorting={sorting} options={sortingOptions} />}
          id="existing-communities-dropdown"
          isArrowed
          css={css`
            z-index: 9;
          `}
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
