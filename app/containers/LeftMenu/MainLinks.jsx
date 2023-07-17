import Documentation from 'containers/LeftMenu/Documentation/Documentation';
import { Administration } from 'icons/index';

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ChangeLocale from 'containers/ChangeLocale';
import cn from 'classnames';

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
  singleCommunityColors,
  singleCommunityFonts,
  singleCommunityDocumentationPosition,
} from 'utils/communityManagement';

import myFeedIcon from 'images/myFeed.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import PinIcon from 'icons/Pin';

import A from 'components/A';
import FreeTrialBanner from 'components/FreeTrialBanner';
import { IconLg } from 'components/Icon/IconWithSizes';
import { svgDraw } from 'components/Icon/IconStyled';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import { PINNED_TITLE_LENGTH } from 'containers/LeftMenu/constants';
import { BasicLink } from 'containers/LeftMenu/Styles';
import {
  hasGlobalModeratorRole,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  getPermissions,
  hasProtocolAdminRole,
} from 'utils/properties';

import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import { isSuiBlockchain } from 'utils/sui/sui';

const colors = singleCommunityColors();
const fonts = singleCommunityFonts();

const customColor = colors.linkColor || BORDER_PRIMARY;

export const A1 = A.extend`
  ${svgDraw({ color: colors.mainLinksColor || TEXT_DARK })}; !important;
  ${BasicLink};
  color: ${colors.white || ''}; !important;

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
          background-color: ${colors.userInformation || PRIMARY_SPECIAL};
          border-color: ${colors.linkColor || BORDER_PRIMARY_DARK};
          font-family: ${fonts.mainLinksSelected || APP_FONT};
          letter-spacing: 0.5px;
          font-weight: bold;
          color: ${colors.mainLinksColor || TEXT_DARK} !important;
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
  @media only screen and (max-width: 991px) {
    margin-top: 0;
  }
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
  changeLocale,
  locale,
}) => {
  const { t } = useTranslation();
  const { pathname } = window.location;
  let route = pathname.split('/').filter((x) => x)[0];

  const singleCommId = isSingleCommunityWebsite();
  const isProtocolAdmin = hasProtocolAdminRole(getPermissions(profile));
  const isModeratorModeSingleCommunity = singleCommId
    ? hasCommunityAdminRole(getPermissions(profile), singleCommId) ||
      hasCommunityModeratorRole(getPermissions(profile), singleCommId) ||
      isProtocolAdmin
    : false;

  const isAdministratorModeSingleCommunity = singleCommId
    ? hasCommunityAdminRole(getPermissions(profile), singleCommId) || isProtocolAdmin
    : false;

  if (!route) {
    route = '/';
  }

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
            background: colors.pinnedPostBackground || '#A5BCFF',
            // background: 'rgb(123 63 228 / 30%)',
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
                    borderRight: isShortPinnedTitle ? '1px solid rgba(255, 255, 255, 0.3)' : '',
                    paddingRight: '10px',
                  }}
                >
                  {pinnedItemMenu.title}
                </span>
                <span
                  css={{
                    borderLeft: !isShortPinnedTitle ? '1px solid rgba(255, 255, 255, 0.3)' : '',
                  }}
                >
                  <PinIcon
                    stroke="#FFF"
                    css={{
                      fill: colors.white || '#A5BCFF',
                      marginLeft: '10px',
                    }}
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
        {!profile && !singleCommId && <div css={styles.dividerLinks} />}

        <div css={styles.changeLocale}>
          <ChangeLocale withTitle changeLocale={changeLocale} locale={locale} />
        </div>

        <div css={styles.dividerLinks} />
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
            {t('common.communityLabel')}
          </div>
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

        {(hasGlobalModeratorRole() ||
          hasProtocolAdminRole() ||
          isModeratorModeSingleCommunity ||
          (isSuiBlockchain && isProtocolAdmin)) && (
          <A1 to={routes.users()} name="users" route={route}>
            <IconLg className="mr-2" icon={usersIcon} />
            {t(`common.users`)}
          </A1>
        )}

        {Boolean(singleCommId && isAdministratorModeSingleCommunity) && (
          <A1 to={routes.administration()} name="administration" route={route}>
            <Administration className={'mr-2'} />
            {t('common.administration')}
          </A1>
        )}
        <div css={styles.dividerLinks} />
      </div>

      <FreeTrialBanner></FreeTrialBanner>

      <div css={styles.dividerLinks} />

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
