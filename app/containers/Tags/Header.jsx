import React, { useMemo } from 'react';
import Dropdown from 'components/common/Dropdown';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import { TEXT_SECONDARY, BORDER_PRIMARY, TEXT_PRIMARY } from 'style-constants';

import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';
import { css } from '@emotion/react';

import icoTagIcon from 'images/icoTag.svg?external';
import arrowLeft from 'images/arrowLeft.svg?inline';
import addIcon from 'images/add.svg?external';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?external';

import H3 from 'components/H3';
import Span from 'components/Span';
import Ul from 'components/Ul';
import MediumIcon from 'components/Icon/MediumIcon';
import { IconSm, IconMd } from 'components/Icon/IconWithSizes';
import CheckedItem from 'components/Li/CheckedItem';
import Wrapper, {
  SubHeaderWrapperRightPanel as WrapperRightPanel,
} from 'components/Header/Complex';
import { MediumImageStyled } from 'components/Img/MediumImage';
import NavigationButton from 'components/Button/Contained/Navigation';
import A from 'components/A';

import options from './options';
import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';
import {
  getPermissions,
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from '../../utils/properties';

const communitiesRoute = routes.communities();

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();

const Button = ({ sorting }) => {
  const { t } = useTranslation();
  return (
    <Span className="d-inline-flex align-items-center text-capitalize" bold>
      <MediumIcon>
        <IconMd
          className="mr-2"
          icon={communitiesHeaderFilter}
          color={colors.btnColor || BORDER_PRIMARY}
          isColorImportant={true}
        />
      </MediumIcon>
      <div
        css={css`
          display: none;
          @media (min-width: 768px) {
            display: inline;
          }
        `}
      >
        {t(options[sorting].message)}
      </div>
    </Span>
  );
};

export const Header = ({
  goToCreateTagScreen,
  sortTags,
  sorting,
  currentCommunity,
  tagsNumber,
  profile,
}) => {
  const { t } = useTranslation();
  const path = useMemo(
    () => window.location.pathname + window.location.hash,
    [window.location],
  );

  const profileWithModeratorRights = useMemo(
    () => (profile ? hasGlobalModeratorRole(getPermissions(profile)) : false),
    [profile],
  );

  const singleCommId = isSingleCommunityWebsite();

  const profileWithCommunityAdminRights = singleCommId
    ? hasCommunityAdminRole(getPermissions(profile), singleCommId)
    : false;

  const tagCreatingAllowed =
    profileWithModeratorRights ||
    profileWithCommunityAdminRights ||
    hasProtocolAdminRole(getPermissions(profile));

  const communityTagsRoute = useMemo(
    () => routes.communityTags(currentCommunity.id),
    [currentCommunity.id],
  );

  const displaySortTagDropdown = useMemo(
    () => path === communityTagsRoute && !!tagsNumber,
    [path, communityTagsRoute, tagsNumber],
  );

  const sortingOptions = Object.keys(options).map((x, index) => ({
    label: t(options[x].message),
    value: index,
    render: (
      <CheckedItem
        key={x}
        data-key={x}
        onClick={sortTags}
        isActive={x === sorting}
        css={css`padding-left: 0; !important;`}
      >
        {t(options[x].message)}
      </CheckedItem>
    ),
  }));

  const onClickNavigationButton = ({ currentTarget: { id, communityid } }) => {
    goToCreateTagScreen({
      buttonId: id,
      communityId: communityid,
    });
  };

  return (
    <div className="mb-to-sm-0 mb-from-sm-3">
      <Wrapper position="top">
        <div>
          {!single && (
            <A to={communitiesRoute}>
              <NavigationButton className="pl-0" islink>
                <img src={arrowLeft} alt="x" />
                <span className="d-none d-sm-inline ml-2">
                  {t('tags.backToList')}
                </span>
              </NavigationButton>
            </A>
          )}
        </div>

        {tagCreatingAllowed && (
          <WrapperRightPanel className="right-panel">
            <NavigationButton
              data-communityid={currentCommunity.id}
              onClick={onClickNavigationButton}
              id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_header`}
              className="d-inline-flex align-items-center px-0 py-1"
              islink
            >
              <MediumIcon>
                <IconMd
                  className="d-none d-sm-inline-block"
                  icon={icoTagIcon}
                  css={css`
                    path {
                      fill: ${colors.btnColor || TEXT_PRIMARY};
                    }
                  `}
                />
              </MediumIcon>

              <IconSm
                className="d-inline-flex d-sm-none"
                fill={BORDER_PRIMARY}
                icon={addIcon}
              />

              <span className="ml-1 button-label">{t('common.createTag')}</span>
            </NavigationButton>
          </WrapperRightPanel>
        )}
      </Wrapper>

      <Wrapper position="bottom">
        <H3>
          <MediumImageStyled
            className="bg-transparent"
            src={currentCommunity.avatar}
            alt="tags"
          />

          {`${currentCommunity.name || ''} `}

          {!!tagsNumber && (
            <Span
              className="d-none d-sm-inline text-lowercase ml-3"
              color={TEXT_SECONDARY}
              fontSize="30"
              bold
            >
              <span>{`${tagsNumber} `}</span>
              {t('common.tags')}
            </Span>
          )}
        </H3>

        {displaySortTagDropdown && (
          <WrapperRightPanel className="right-panel">
            <Dropdown
              options={sortingOptions}
              trigger={<Button sorting={sorting} />}
              id="tags-dropdown"
              appendTo="parent"
              isArrowed
              arrowWidth={18}
            />
          </WrapperRightPanel>
        )}
      </Wrapper>
    </div>
  );
};

Button.propTypes = {
  sorting: PropTypes.string,
};

Header.propTypes = {
  currentCommunity: PropTypes.object,
  goToCreateTagScreen: PropTypes.func,
  sortTags: PropTypes.func,
  sorting: PropTypes.string,
  tagsNumber: PropTypes.number,
};

export default React.memo(Header);
