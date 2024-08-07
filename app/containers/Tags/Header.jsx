import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import { css } from '@emotion/react';
import { TEXT_SECONDARY, BORDER_PRIMARY, TEXT_PRIMARY } from 'style-constants';

import icoTagIcon from 'images/icoTag.svg?external';
import arrowLeft from 'images/arrowLeft.svg?inline';
import addIcon from 'images/add.svg?external';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?external';

import {
  isSingleCommunityWebsite,
  singleCommunityColors,
  graphCommunityColors,
} from 'utils/communityManagement';
import {
  getPermissions,
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';

import { TagGraph, SlidersGraph } from 'components/icons';
import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
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

const communitiesRoute = routes.communities();

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

const Button = ({ sorting }) => {
  const { t } = useTranslation();

  return (
    <Span
      className="d-inline-flex align-items-center mr-2 text-capitalize"
      bold
      css={graphCommunity && { ':hover': { color: 'rgba(255, 255, 255, 1)' } }}
    >
      <MediumIcon>
        {graphCommunity ? (
          <SlidersGraph className="mr-2" fill="#6F4CFF" size={[20, 20]} />
        ) : (
          <IconMd
            className="mr-2"
            icon={communitiesHeaderFilter}
            color={colors.btnColor || BORDER_PRIMARY}
            isColorImportant={true}
          />
        )}
      </MediumIcon>
      {t(options[sorting].message)}
    </Span>
  );
};

const Menu = ({ sortTags, sorting }) => {
  const { t } = useTranslation();

  return (
    <Ul>
      {Object.keys(options).map((item) => (
        <CheckedItem key={item} data-key={item} onClick={sortTags} isActive={item === sorting}>
          {t(options[item].message)}
        </CheckedItem>
      ))}
    </Ul>
  );
};

export const Header = ({
  goToCreateTagScreen,
  sortTags,
  sorting,
  currentCommunity,
  tagsNumber,
  profile,
  locale,
}) => {
  const { t } = useTranslation();
  const path = useMemo(() => window.location.pathname + window.location.hash, [window.location]);

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

  const onClickNavigationButton = ({ currentTarget: { id } }) => {
    goToCreateTagScreen({
      buttonId: id,
      communityId: currentCommunity.id,
    });
  };

  const communityTranslationTitle = currentCommunity.translations?.find(
    (translation) => translation.language === locale,
  )?.name;

  return (
    <div className="mb-to-sm-0 mb-from-sm-3">
      <Wrapper position="bottom" css={graphCommunity && { border: 'none', background: 'none' }}>
        <H3>
          <MediumImageStyled className="bg-transparent" src={currentCommunity.avatar} alt="tags" />

          {`${communityTranslationTitle || currentCommunity.name || ''} `}

          {!!tagsNumber && (
            <Span
              className="d-none d-sm-inline text-lowercase ml-3"
              fontSize="30"
              bold
              css={{
                color: graphCommunity ? '#A7A7AD' : colors.secondaryTextColor || TEXT_SECONDARY,
              }}
            >
              <span>{`${tagsNumber} `}</span>
              {t('common.tags')}
            </Span>
          )}
        </H3>

        {displaySortTagDropdown && (
          <WrapperRightPanel
            className="right-panel df fdc jcc"
            css={graphCommunity && { alignItems: 'flex-end' }}
          >
            {tagCreatingAllowed && (
              <NavigationButton
                data-communityid={currentCommunity.id}
                onClick={onClickNavigationButton}
                id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_header`}
                className="d-inline-flex align-items-center px-0 py-1 mb4"
                islink
              >
                <MediumIcon>
                  {graphCommunity ? (
                    <TagGraph fill="#6F4CFF" size={[20, 20]} css={{ fill: '#6F4CFF' }} />
                  ) : (
                    <IconMd
                      className="d-none d-sm-inline-block"
                      icon={icoTagIcon}
                      css={css`
                        path {
                          fill: ${colors.btnColor || TEXT_PRIMARY};
                        }
                      `}
                    />
                  )}
                </MediumIcon>

                <IconSm className="d-inline-flex d-sm-none" fill={BORDER_PRIMARY} icon={addIcon} />

                <span className="ml-1 button-label">{t('common.createTag')}</span>
              </NavigationButton>
            )}
            <Dropdown
              button={<Button sorting={sorting} />}
              menu={<Menu sortTags={sortTags} sorting={sorting} />}
              id="tags-dropdown"
              isArrowed
              css={{
                '.dropdown-menu': {
                  transform: 'translate3d(-58px, 18px, 0px) !important',
                  '@media only screen and (min-width: 576px)': {
                    transform: 'translate3d(0px, 18px, 0px) !important',
                  },
                },
              }}
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

Menu.propTypes = {
  sorting: PropTypes.string,
  sortTags: PropTypes.func,
};

Header.propTypes = {
  currentCommunity: PropTypes.object,
  goToCreateTagScreen: PropTypes.func,
  sortTags: PropTypes.func,
  sorting: PropTypes.string,
  tagsNumber: PropTypes.number,
  locale: PropTypes.string,
};

export default React.memo(Header);
