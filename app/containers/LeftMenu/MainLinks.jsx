/* eslint indent: 0 */
import Icon from 'components/Icon';
import { FORM_SUB_ARTICLE } from 'components/QuestionForm/constants';
import arrowDownIcon from 'images/arrowDown.svg?external';
import dotsIcon from 'images/dots.svg?external';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { css } from '@emotion/react';
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
  PEER_PRIMARY_COLOR,
  TEXT_SECONDARY,
} from 'style-constants';
import { styles } from 'containers/LeftMenu/MainLinks.styled';

import * as routes from 'routes-config';
import messages from 'common-messages';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
  singleCommunityFonts,
  getSingleCommunityDetails,
} from 'utils/communityManagement';

import homeIcon from 'images/house.svg?external';
import myFeedIcon from 'images/myFeed.svg?external';
import communitiesIcon from 'images/communities.svg?external';
import tagsIcon from 'images/tags.svg?external';
import usersIcon from 'images/users.svg?external';
import faqIcon from 'images/faq.svg?external';

import A from 'components/A';
import { IconLg } from 'components/Icon/IconWithSizes';
import { svgDraw } from 'components/Icon/IconStyled';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
import { FULL_SIZE } from 'containers/LeftMenu/constants';
import { BasicLink } from 'containers/LeftMenu/Styles';
import {
  hasGlobalModeratorRole,
  hasCommunityAdminRole,
  hasCommunityModeratorRole,
  getPermissions,
} from 'utils/properties';

const communityStyles = singleCommunityStyles();
const colors = singleCommunityColors();
const fonts = singleCommunityFonts();
const DOCUMENTATION_PADDING = 15;

const customColor = colors.linkColor || BORDER_PRIMARY;

const A1 = A.extend`
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
  margin-bottom: ${({ currClientHeight }) => {
    if (
      communityStyles.withoutAdditionalLinks ||
      (currClientHeight < FULL_SIZE && !isMobile(window.navigator).any)
    )
      return '25px !important';
    return '50px';
  }};
  padding-bottom: 25px;
  @media only screen and (max-width: 576px) {
    padding: 10px 0 20px 0;
  }
`;

const DocumentationDropdown = ({
  id,
  redirectToEditQuestionPage,
  redirectToPostDocumentationPage,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
      <div id={`dots-icon`}>
        <Icon
          className="mr-3 ml-2"
          icon={dotsIcon}
          isTransition={false}
          width="20"
          fill={PEER_PRIMARY_COLOR}
          isColorImportant={true}
          onClick={event => {
            document.addEventListener(
              'click',
              function(event) {
                const element = document.getElementById(`dropdown-menu-${id}`);
                if (!element.contains(event.target)) setShowDropdown(false);
              },
              { once: true },
            );
            setShowDropdown(!showDropdown);
            event.preventDefault();
            event.stopPropagation();
          }}
        />
      </div>
      <div
        id={`dropdown-menu-${id}`}
        className="dropdownMenu"
        css={css`
          ${styles.dropdownMenu} left: 0px;
          display: ${showDropdown ? 'block' : 'none'};
        `}
      >
        <div
          id={`redirect-to-create-documentation-${id}`}
          css={css(styles.dropdownMenuItem)}
          onClick={event => {
            redirectToPostDocumentationPage(event, true);
            setShowDropdown(false);
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          Add new article
        </div>
        <div
          id={`redirect-to-create-sub-documentation-${id}`}
          css={css(styles.dropdownMenuItem)}
          onClick={event => {
            redirectToPostDocumentationPage(event, true);
            setShowDropdown(false);
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          Add a new sub-article
        </div>
        <div
          id={`redirect-to-edit-documentation-${id}`}
          css={css(styles.dropdownMenuItem)}
          onClick={event => {
            redirectToEditQuestionPage(
              {
                currentTarget: {
                  id: `redirect-to-edit-documentation-${id}`,
                  dataset: {
                    link: `/documentation/${id}/edit`,
                  },
                },
              },
              true,
            );
            setShowDropdown(false);
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          Edit content
        </div>
        <div css={css(styles.dropdownMenuItem)}>Delete</div>
      </div>
    </div>
  );
};

const DocumentationMenu = ({
  menu,
  padding,
  path,
  activeNodes,
  setActiveNodes,
  redirectToEditQuestionPage,
  redirectToPostDocumentationPage,
}) => {
  const [visibleSection, setVisibleSection] = useState(false);

  const { pathname } = window.location;
  const routeArray = pathname.split('/').filter(x => x);
  const pageRoute = routeArray[0];
  const sectionRoute = routeArray[routeArray.length - 1];
  useEffect(
    () => {
      if (menu.id === sectionRoute) {
        setActiveNodes([...path, menu.id]);
      }
      if (pageRoute !== 'documentation') {
        setActiveNodes([]);
      }
    },
    [pathname, menu.id],
  );

  if (menu?.children.length) {
    return (
      <div css={css(styles.menuDocumentationItem)}>
        <A1
          to={routes.documentation(menu.id)}
          name={menu.id}
          route={sectionRoute}
          className="df jcsb"
          css={css`
            padding-left: ${padding}px;
            font-weight: ${activeNodes.includes(menu.id) ? 'bold' : 'normal'};
            color: ${padding > DOCUMENTATION_PADDING &&
            !activeNodes.includes(menu.id)
              ? '#7B7B7B'
              : '#282828'};
            font-size: ${padding > DOCUMENTATION_PADDING ? '14px' : '16px'};
          `}
          onClick={() => {
            setVisibleSection(true);
          }}
        >
          <div>{menu.title}</div>
          <div className="df">
            <DocumentationDropdown
              id={menu.id}
              redirectToEditQuestionPage={redirectToEditQuestionPage}
              redirectToPostDocumentationPage={redirectToPostDocumentationPage}
            />

            <Icon
              className="mr-3"
              icon={arrowDownIcon}
              width="16"
              rotate={visibleSection}
              fill={PEER_PRIMARY_COLOR}
              isColorImportant={true}
              onClick={event => {
                setVisibleSection(!visibleSection);
                event.preventDefault();
                event.stopPropagation();
              }}
            />
          </div>
        </A1>
        {visibleSection && (
          <div>
            {menu?.children.map(children => (
              <DocumentationMenu
                menu={children}
                padding={padding + DOCUMENTATION_PADDING}
                path={[...path, menu.id]}
                activeNodes={activeNodes}
                setActiveNodes={setActiveNodes}
                redirectToEditQuestionPage={redirectToEditQuestionPage}
                redirectToPostDocumentationPage={
                  redirectToPostDocumentationPage
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  } else
    return (
      <div css={css(styles.menuDocumentationItem)}>
        <A1
          to={routes.documentation(menu.id)}
          name={menu.id}
          route={sectionRoute}
          className="df jcsb"
          css={css`
            padding-left: ${padding}px;
            font-weight: ${activeNodes.includes(menu.id) ? 'bold' : 'normal'};
            color: ${padding > DOCUMENTATION_PADDING &&
            !activeNodes.includes(menu.id)
              ? '#7B7B7B'
              : '#282828'};
            font-size: ${padding > DOCUMENTATION_PADDING ? '14px' : '16px'};
          `}
        >
          <div>{menu.title}</div>

          <DocumentationDropdown
            id={menu.id}
            redirectToEditQuestionPage={redirectToEditQuestionPage}
            redirectToPostDocumentationPage={redirectToPostDocumentationPage}
          />
        </A1>
      </div>
    );
};

const MainLinks = ({
  currClientHeight,
  profile,
  documentationMenu,
  redirectToEditQuestionPage,
  redirectToPostDocumentationPage,
}) => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { pathname } = window.location;
  let route = pathname.split('/').filter(x => x)[0];

  const singleCommId = +isSingleCommunityWebsite();
  const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;
  const isModeratorModeSingleCommunity = !!singleCommId
    ? hasCommunityAdminRole(getPermissions(profile), singleCommId) ||
      hasCommunityModeratorRole(getPermissions(profile), singleCommId)
    : false;

  if (!route) {
    route = isBloggerMode ? 'home' : 'feed';
  }

  return (
    <Box currClientHeight={currClientHeight}>
      <div id="communitySection" className="pt12">
        {Boolean(singleCommId) && (
          <div
            css={css`
              ${styles.menuSectionTitle};
            `}
          >
            COMMUNITY
          </div>
        )}

        {isBloggerMode && (
          <A1 to={routes.detailsHomePage()} name="home" route={route}>
            <IconLg className="mr-2" icon={homeIcon} />
            <FormattedMessage {...messages.home} />
          </A1>
        )}

        <A1 to={routes.feed()} name="feed" route={route}>
          <IconLg className="mr-2" icon={myFeedIcon} />
          <FormattedMessage
            id={messages[profile && !singleCommId ? 'myFeed' : 'feed'].id}
          />
        </A1>

        <A1 to={routes.questions()} name="questions" route={route}>
          <IconLg className="mr-2" icon={generalIcon} />
          <FormattedMessage {...messages.discussions} />
        </A1>

        <A1 to={routes.expertPosts()} name="experts" route={route}>
          <IconLg className="mr-2" icon={expertIcon} />
          <FormattedMessage {...messages.expertPosts} />
        </A1>

        <A1 to={routes.tutorials()} name="tutorials" route={route}>
          <IconLg className="mr-2" icon={tutorialIcon} fill={BORDER_PRIMARY} />
          <FormattedMessage {...messages.tutorials} />
        </A1>

        {!singleCommId && (
          <A1 to={routes.communities()} name="communities" route={route}>
            <IconLg className="mr-2" icon={communitiesIcon} />
            <FormattedMessage {...messages.communities} />
          </A1>
        )}

        <A1
          to={
            !singleCommId ? routes.tags() : routes.communityTags(singleCommId)
          }
          name="tags"
          route={route}
        >
          <IconLg className="mr-2" icon={tagsIcon} />
          <FormattedMessage {...messages.tags} />
        </A1>

        {(hasGlobalModeratorRole() || isModeratorModeSingleCommunity) && (
          <A1 to={routes.users()} name="users" route={route}>
            <IconLg className="mr-2" icon={usersIcon} />
            <FormattedMessage
              {...messages[isBloggerMode ? 'followers' : 'users']}
            />
          </A1>
        )}

        {!Boolean(singleCommId) && (
          <A1 to={routes.faq()} name="faq" route={route}>
            <IconLg className="mr-2" icon={faqIcon} fill={BORDER_PRIMARY} />
            <FormattedMessage id={messages.faq.id} />
          </A1>
        )}
      </div>

      {Boolean(singleCommId) && (
        <>
          <div css={css(styles.divider)} />

          <div id="documentationSection" className="mt28">
            <div className="df jcsb" css={css(styles.menuSectionTitle)}>
              <FormattedMessage {...messages.documentation} />
              {Boolean(isModeratorModeSingleCommunity) && (
                <div
                  css={css`
                    #dots-icon {
                      visibility: hidden;
                    }
                    :hover #dots-icon {
                      visibility: visible;
                    }
                  `}
                >
                  <div id="dots-icon">
                    <Icon
                      className="mr-3 ml-2"
                      icon={dotsIcon}
                      width="20"
                      fill={PEER_PRIMARY_COLOR}
                      isColorImportant={true}
                      onClick={event => {
                        setShowDropdown(!showDropdown);
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    />
                  </div>
                  <div
                    className="dropdownMenu"
                    css={css`
                      ${styles.dropdownMenu} left: 0px;
                      display: ${showDropdown ? 'block' : 'none'};
                    `}
                  >
                    <div
                      css={css(styles.dropdownMenuItem)}
                      onClick={event => {
                        redirectToPostDocumentationPage(event, true);
                        setShowDropdown(false);
                      }}
                    >
                      Add new article
                    </div>
                    <div css={css(styles.dropdownMenuItem)}>Edit order</div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {Boolean(documentationMenu) &&
                documentationMenu.map(documentationSection => (
                  <DocumentationMenu
                    menu={documentationSection}
                    padding={DOCUMENTATION_PADDING}
                    allMenu={documentationMenu}
                    path={[]}
                    activeNodes={activeNodes}
                    setActiveNodes={setActiveNodes}
                    redirectToEditQuestionPage={redirectToEditQuestionPage}
                    redirectToPostDocumentationPage={
                      redirectToPostDocumentationPage
                    }
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

MainLinks.propTypes = {
  profile: PropTypes.object,
  currClientHeight: PropTypes.number,
};

export default MainLinks;
