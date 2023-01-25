import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Documentation from 'containers/LeftMenu/Documentation/Documentation';

import cn from 'classnames';

import isMobile from 'ismobilejs';

import {
  BORDER_PRIMARY_DARK,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  BG_TRANSPARENT,
  PRIMARY_SPECIAL,
  TEXT_DARK,
  APP_FONT,
  BORDER_PRIMARY,
  BORDER_DARK,
  ICON_TRASPARENT_BLUE,
} from 'style-constants';
import { styles } from 'containers/LeftMenu/MainLinks.styled';

import * as routes from 'routes-config';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
  singleCommunityFonts,
  getSingleCommunityDetails,
  singleCommunityDocumentationPosition,
} from 'utils/communityManagement';

import homeIcon from 'images/house.svg?external';
import myFeedIcon from 'images/myFeed.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import faqIcon from 'images/faq.svg?external';
import PinIcon from 'icons/Pin';

import A from 'components/A';
import { IconLg } from 'components/Icon/IconWithSizes';
import { svgDraw } from 'components/Icon/IconStyled';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import { FULL_SIZE, PINNED_TITLE_LENGTH } from 'containers/LeftMenu/constants';
import { BasicLink } from 'containers/LeftMenu/Styles';
import {
  hasGlobalModeratorRole,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  getPermissions,
  hasProtocolAdminRole,
} from 'utils/properties';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';

const communityStyles = singleCommunityStyles();
const colors = singleCommunityColors();
const fonts = singleCommunityFonts();

const customColor = colors.linkColor || BORDER_PRIMARY;

export const A1 = A.extend`
  ${BasicLink};

  letter-spacing: 0 !important;

  #dots-icon {
    visibility: hidden;
  }

  :hover #dots-icon {
    visibility: visible;
  }

  ${({ route, name }) =>
    route === name
      ? `
          background-color: ${PRIMARY_SPECIAL};
          border-color: ${colors.linkColor || BORDER_PRIMARY_DARK};
          font-family: ${fonts.mainLinksSelected || APP_FONT};
          letter-spacing: 0.5px;
          font-weight: bold;
          color: ${colors.mainLinks || TEXT_DARK} !important;
          .fill {
            fill: ${customColor};
          }
          .stroke {
            stroke: ${customColor};
          }
          .semitransparent {
            fill: ${colors.transparentIconColor || ICON_TRASPARENT_BLUE};
          }
          :hover {
            color: ${colors.linkColor || colors.mainLinks};
            .fill {
              fill: ${customColor};
            }
            .stroke {
              stroke: ${customColor};
            }
            circle {
              color: ${customColor};
            }
          }
          ${svgDraw({ color: colors.linkColor || TEXT_PRIMARY })};
        `
      : `
          background-color: ${BG_TRANSPARENT};
          border-color: ${BORDER_TRANSPARENT};
          font-weight: normal;
          font-family: ${fonts.mainLinksNotSelected || APP_FONT};
          .opacity {
            fill: none !important;
          }
          .fill {
            fill: ${BORDER_DARK};
          }
          .semitransparent {
            fill: none;
          }
          :hover {
            .fill {
              fill: ${customColor};
            }
            .stroke {
              stroke: ${customColor};
            }
            circle {
              color: ${customColor};
            }
            color: ${colors.linkColor || colors.mainLinks};
          }
        `};
`;

const Box = styled.div`
  margin-top: 30px;
  margin-bottom: ${({ currClientHeight }) => {
    if (
      communityStyles.withoutAdditionalLinks ||
      (currClientHeight < FULL_SIZE && !isMobile(window.navigator).any)
    )
      return '25px !important';
    return '50px';
  }};
  padding-bottom: 30px;
  @media only screen and (max-width: 576px) {
    padding: 10px 0 20px 0;
  }
`;

const documentationPosition = singleCommunityDocumentationPosition();

const MainLinks = ({
  currClientHeight,
  profile,
  documentationMenu,
  match,
  toggleEditDocumentation,
  pinnedItemMenu,
}) => {
  const { t } = useTranslation();
  const { pathname } = window.location;
  let route = pathname.split('/').filter((x) => x)[0];

  const singleCommId = +isSingleCommunityWebsite();
  const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;
  const isProtocolAdmin = hasProtocolAdminRole(getPermissions(profile));
  const isModeratorModeSingleCommunity = singleCommId
    ? hasCommunityAdminRole(getPermissions(profile), singleCommId) ||
      hasCommunityModeratorRole(getPermissions(profile), singleCommId) ||
      isProtocolAdmin
    : false;

  if (!route) {
    route = isBloggerMode ? 'home' : '/';
  }

  const hasCommunityOrProtocolAdminRole =
    singleCommId &&
    (hasGlobalModeratorRole() ||
      hasCommunityAdminRole(null, singleCommId) ||
      isProtocolAdmin);

  const isShortPinnedTitle = pinnedItemMenu.title.length > PINNED_TITLE_LENGTH;

  return (
    <Box
      currClientHeight={currClientHeight}
      className="df fdc"
      css={{
        ...(pinnedItemMenu.id !== '' && { marginTop: 0 }),
      }}
    >
      {pinnedItemMenu.id !== '' && (
        <div
          css={{
            background: '#A5BCFF',
            borderRadius: '0px 0px 20px 20px',
          }}
        >
          {(() => {
            const ipfsHash = getIpfsHashFromBytes32(pinnedItemMenu.id);

            return (
              <A1
                to={routes.documentation(ipfsHash, pinnedItemMenu.title)}
                name={`documentation/${ipfsHash}`}
                className="df jcsb aic"
                css={{
                  padding: '8px 15px 12px',
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: '20px',
                  color: 'var(--color-white)',
                }}
              >
                <span
                  css={{
                    borderRight: isShortPinnedTitle
                      ? '1px solid rgba(255, 255, 255, 0.3)'
                      : '',
                    paddingRight: '10px',
                  }}
                >
                  {pinnedItemMenu.title}
                </span>
                <span
                  css={{
                    borderLeft: !isShortPinnedTitle
                      ? '1px solid rgba(255, 255, 255, 0.3)'
                      : '',
                  }}
                >
                  <PinIcon
                    stroke="#FFF"
                    css={{ fill: '#A5BCFF', marginLeft: '10px' }}
                  />
                </span>
              </A1>
            );
          })()}
        </div>
      )}

      <div
        id="communitySection"
        css={{
          ...(documentationPosition === 'top' && {
            order: 1,
          }),
        }}
      >
        {Boolean(singleCommId) && (
          <div
            className={cn('df jcsb pl15', {
              mt28: pinnedItemMenu.id !== '' || documentationPosition === 'top',
            })}
            css={{
              ...styles.menuSectionTitle,
              ...styles.menuItem,
            }}
          >
            COMMUNITY
          </div>
        )}

        {isBloggerMode && (
          <A1 to={routes.detailsHomePage()} name="home" route={route}>
            <IconLg className="mr-2" icon={homeIcon} />
            {t('common.home')}
          </A1>
        )}

        <A1 to={routes.feed()} name="feed" route={route}>
          <IconLg className="mr-2" icon={myFeedIcon} />
          {t(`common.${profile && !singleCommId ? 'myFeed' : 'feed'}`)}
        </A1>

        <A1 to={routes.questions()} name="discussions" route={route}>
          <IconLg className="mr-2" icon={generalIcon} />
          {t('common.discussions')}
        </A1>

        <A1 to={routes.expertPosts()} name="experts" route={route}>
          <IconLg className="mr-2" icon={expertIcon} />
          {t('common.expertPosts')}
        </A1>

        <A1 to={routes.tutorials()} name="tutorials" route={route}>
          <IconLg className="mr-2" icon={tutorialIcon} fill={BORDER_PRIMARY} />
          {t('common.tutorials')}
        </A1>

        {!singleCommId && (
          <A1 to={routes.communities()} name="communities" route={route}>
            <IconLg className="mr-2" icon={communitiesIcon} />
            {t('common.communities')}
          </A1>
        )}

        {Boolean(singleCommId) && (
          <A1 to={routes.communityTags(singleCommId)} name="tags" route={route}>
            <IconLg className="mr-2" icon={tagsIcon} />
            {t('common.tags')}
          </A1>
        )}

        {(hasGlobalModeratorRole() || isModeratorModeSingleCommunity) && (
          <A1 to={routes.users()} name="users" route={route}>
            <IconLg className="mr-2" icon={usersIcon} />
            {t(`common.${isBloggerMode ? 'followers' : 'users'}`)}
          </A1>
        )}

        {!singleCommId && (
          <A1 to={routes.faq()} name="faq" route={route}>
            <IconLg className="mr-2" icon={faqIcon} fill={BORDER_PRIMARY} />
            {t('common.faq')}
          </A1>
        )}

        {Boolean(singleCommId && hasCommunityOrProtocolAdminRole) && (
          <A1 to={routes.administration()} name="administration" route={route}>
            <IconLg className="mr-2" icon={usersIcon} fill={BORDER_PRIMARY} />
            {t('common.administration')}
          </A1>
        )}
      </div>

      {Boolean(singleCommId) &&
        (documentationMenu.length > 0 || isModeratorModeSingleCommunity) && (
          <Documentation
            documentationMenu={documentationMenu}
            isModeratorModeSingleCommunity={isModeratorModeSingleCommunity}
            toggleEditDocumentation={toggleEditDocumentation}
            match={match}
            pinnedItemMenuId={pinnedItemMenu.id}
          />
        )}
    </Box>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
  currClientHeight: PropTypes.number,
};

export default MainLinks;
