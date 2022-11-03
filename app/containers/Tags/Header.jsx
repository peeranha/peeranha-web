import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import { TEXT_SECONDARY, BORDER_PRIMARY } from 'style-constants';

import commonMessages from 'common-messages';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';

import icoTagIcon from 'images/icoTag.svg?external';
import arrowLeft from 'images/arrowLeft.svg?inline';
import addIcon from 'images/add.svg?external';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?external';
import { TEXT_PRIMARY } from 'style-constants';
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

import messages from './messages';
import options from './options';
import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';
import {
  getPermissions,
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from '../../utils/properties';

const tagsRoute = routes.tags();

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();

const Button = ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <MediumIcon>
      <IconMd
        className="mr-2"
        icon={communitiesHeaderFilter}
        color={colors.btnColor || BORDER_PRIMARY}
        isColorImportant={true}
      />
    </MediumIcon>
    <FormattedMessage {...options[sorting].message} />
  </Span>
);

const Menu = ({ sortTags, sorting }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={x}
        data-key={x}
        onClick={sortTags}
        isActive={x === sorting}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

export const Header = ({
  goToCreateTagScreen,
  sortTags,
  sorting,
  currentCommunity,
  tagsNumber,
  profile,
}) => {
  const path = useMemo(() => window.location.pathname + window.location.hash, [
    window.location,
  ]);

  const profileWithModeratorRights = useMemo(
    () => (profile ? hasGlobalModeratorRole(getPermissions(profile)) : false),
    [profile],
  );

  const singleCommId = isSingleCommunityWebsite();

  const profileWithCommunityAdminRights = Boolean(singleCommId)
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
  // const suggestedTagsRoute = useMemo(
  //   () => routes.suggestedTags(currentCommunity.id),
  //   [currentCommunity.id],
  // );
  const displaySortTagDropdown = useMemo(
    () => path === communityTagsRoute && !!tagsNumber,
    [path, communityTagsRoute, tagsNumber],
  );
  return (
    <div className="mb-to-sm-0 mb-from-sm-3">
      <Wrapper position="top">
        <div>
          {!single && (
            <A to={tagsRoute}>
              <NavigationButton className="pl-0" islink>
                <img src={arrowLeft} alt="x" />
                <span className="d-none d-sm-inline ml-2">
                  <FormattedMessage id={messages.backToList.id} />
                </span>
              </NavigationButton>
            </A>
          )}
        </div>

        {tagCreatingAllowed && (
          <WrapperRightPanel className="right-panel">
            <NavigationButton
              data-communityid={currentCommunity.id}
              onClick={goToCreateTagScreen}
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

              <span className="ml-1 button-label">
                <FormattedMessage id={commonMessages.createTag.id} />
              </span>
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
              <FormattedMessage id={commonMessages.tags.id} />
            </Span>
          )}
        </H3>

        {displaySortTagDropdown && (
          <WrapperRightPanel className="right-panel">
            <Dropdown
              button={<Button sorting={sorting} />}
              menu={<Menu sortTags={sortTags} sorting={sorting} />}
              id="tags-dropdown"
              isArrowed
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
};

export default React.memo(Header);
