import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import communitiesConfig from 'communities-config';

import { BG_LIGHT, BORDER_SECONDARY, TEXT_SECONDARY_LIGHT } from 'style-constants';
import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?external';
import headerNavigationIcon from 'images/headerNavigation.svg?external';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import peeranhaMetaLogo from 'images/PeeranhaMeta.svg?inline';
import suiLogo from 'images/SuiLogo.svg?inline';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
  graphCommunityColors,
} from 'utils/communityManagement';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { getRatingByCommunity } from 'utils/profileManagement';
import { showPopover } from 'utils/popover';
import { isSuiBlockchain } from 'utils/constants';
import useMediaQuery from 'hooks/useMediaQuery';
import useKeyDown from 'hooks/useKeyDown';

import { MagnifyingGlassGraph, PlusGraph } from 'components/icons';
import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';
import EditDocumentation from 'components/Documentation';
import { IconSm, IconLm } from 'components/Icon/IconWithSizes';
import ChangeLocale from 'containers/ChangeLocale';

import { Wrapper, MainSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles from './Logo';
import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';
import { HEADER_ID, SEARCH_FORM_ID, MIN_REPUTATION, IS_SUI_MAIN } from './constants';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();
const graphCommunity = graphCommunityColors();
const colors = singleCommunityColors();

export const LoginProfile = ({
  profileInfo,
  loginWithWalletDispatch,
  faqQuestions,
  isSearchFormVisible,
}) =>
  profileInfo ? (
    <ButtonGroupForAuthorizedUser
      faqQuestions={faqQuestions}
      profileInfo={profileInfo}
      isSearchFormVisible={isSearchFormVisible}
    />
  ) : (
    <ButtonGroupForNotAuthorizedUser loginWithWallet={loginWithWalletDispatch} />
  );

const Button = LargeButton.extend`
  background-color: ${(x) => x.bg};
  border: ${(x) => (x.bg ? '1' : '0')}px solid ${BORDER_SECONDARY};

  @media only screen and (max-width: 991px) {
    padding: 0;
    border-radius: 50%;
    min-width: auto;
    width: 40px;
    height: 40px;
  }

  @media only screen and (max-width: 576px) {
    width: 36px !important;
    height: 36px !important;
  }

  :hover {
    color: ${graphCommunity ? 'rgba(255, 255, 255, 1)' : ''};
    background-color: ${graphCommunity ? 'rgba(111, 76, 255, 0.8)' : ''};
  }
`;

const View = ({
  showMenu,
  profileInfo,
  loginWithWalletDispatch,
  redirectToAskQuestionPage,
  showLoginModalWithRedirectToAskQuestionPage,
  faqQuestions,
  isEditDocumentation,
  toggleEditDocumentation,
  locale,
  changeLocale,
  communities,
}) => {
  const { t } = useTranslation();
  const [isSearchFormVisible, setSearchFormVisibility] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  useEffect(() => {
    if (isSearchFormVisible && !single) {
      document.getElementById(SEARCH_FORM_ID).focus();
    }
  }, [isSearchFormVisible]);

  useKeyDown(() => {
    if (!isDesktop) {
      setSearchFormVisibility(true);
      document.getElementById(SEARCH_FORM_ID).focus();
    }
  }, [75]);

  const Logo = useCallback(() => {
    if (isSearchFormVisible) return null;

    const logo = single ? peeranhaMetaLogo : peeranhaLogo;
    const src = () => {
      if (styles.withoutSubHeader) {
        return IS_SUI_MAIN ? suiLogo : communitiesConfig[single].src;
      }
      return logo;
    };

    return (
      <LogoStyles
        to={single || isSuiBlockchain ? routes.feed() : routes.home()}
        onClick={() =>
          ReactGA.event({
            category: 'Users',
            action: 'logo_icon_pushed',
          })
        }
      >
        <img src={src()} alt="logo" />
        {styles.logoText}
      </LogoStyles>
    );
  }, [isSearchFormVisible]);

  const isHasRole =
    hasGlobalModeratorRole(getPermissions(profileInfo)) ||
    (Boolean(single) && hasCommunityModeratorRole(getPermissions(profileInfo), single)) ||
    hasProtocolAdminRole(getPermissions(profileInfo));

  const isMinusReputation = getRatingByCommunity(profileInfo, single) < MIN_REPUTATION;

  const showPopoverMinRating = (e) => {
    e.preventDefault();
    showPopover(e.currentTarget.id, t('post.reputationBelowZero'));
  };

  const askQuestionHandler = (e) => {
    isMinusReputation && !isHasRole ? showPopoverMinRating(e) : redirectToAskQuestionPage(e);
  };

  const NewPostButton = ({ onClickForModal }) => {
    const clickHandler = (e) => {
      ReactGA.event({
        category: 'Users',
        action: 'newPost_button_pushed',
      });
      return profileInfo ? onClickForModal(e) : showLoginModalWithRedirectToAskQuestionPage();
    };
    return (
      <Button
        id="header-ask-question"
        onClick={clickHandler}
        css={css`
          background: ${colors.btnHeaderColor};
          :hover {
            background: ${colors.btnHeaderHoverColor};
            border: ${colors.btnHeaderHoverBorder};
            opacity: ${colors.btnHeaderHoverOpacity};
          }
          @media only screen and (min-width: 992px) {
            min-width: 130px;
          }
        `}
      >
        {graphCommunity ? (
          <PlusGraph size={[24, 24]} />
        ) : (
          <IconSm fill={colors.newPostButtonText || BG_LIGHT} icon={addIcon} />
        )}
        <span
          className="d-none d-lg-inline ml-2"
          css={css`
            color: ${colors.newPostButtonText};
            font-size: ${graphCommunity ? '14px' : ''};
            font-weight: ${graphCommunity ? 600 : ''};
          `}
        >
          {t('common.askQuestion')}
        </span>
      </Button>
    );
  };

  return (
    <Wrapper id={HEADER_ID}>
      <MainSubHeader mainSubHeaderBgColor={colors.mainSubHeaderBgColor}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button className="mt-1 mr-3 d-flex d-lg-none" onClick={showMenu} type="button">
                <IconLm
                  icon={headerNavigationIcon}
                  color={styles.commHeadElemColor || TEXT_SECONDARY_LIGHT}
                />
              </button>
              <Logo />
            </div>

            <Section className="insides">
              <SearchForm
                searchFormId={SEARCH_FORM_ID}
                onBlur={() => setSearchFormVisibility(false)}
                className={`${isSearchFormVisible ? '' : 'd-none'} d-lg-flex`}
                placeholder={t('common.search')}
              />

              {!isSearchFormVisible && (
                <>
                  <Button
                    bg={graphCommunity ? '#6F4CFF' : BG_LIGHT}
                    className="d-flex d-lg-none"
                    onClick={() => setSearchFormVisibility(!isSearchFormVisible)}
                  >
                    {graphCommunity ? (
                      <MagnifyingGlassGraph size={[18, 18]} />
                    ) : (
                      <Icon icon={searchIcon} width="16" color={TEXT_SECONDARY_LIGHT} />
                    )}
                  </Button>

                  <NewPostButton onClickForModal={askQuestionHandler} />
                </>
              )}

              {!single?.withoutSubHeader || !profileInfo ? (
                <LoginProfile
                  isSearchFormVisible={isSearchFormVisible}
                  loginWithWalletDispatch={loginWithWalletDispatch}
                  profileInfo={profileInfo}
                  faqQuestions={faqQuestions}
                />
              ) : null}
              {isDesktop && (
                <ChangeLocale
                  withTitle
                  changeLocale={changeLocale}
                  locale={locale}
                  communities={communities}
                />
              )}
            </Section>
          </div>
        </div>
      </MainSubHeader>
      {isEditDocumentation && (
        <EditDocumentation toggleEditDocumentation={toggleEditDocumentation} />
      )}
    </Wrapper>
  );
};

View.propTypes = {
  profileInfo: PropTypes.object,
  showMenu: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
  showLoginModalWithRedirectToAskQuestionPage: PropTypes.func,
  redirectToAskQuestionPage: PropTypes.func,
  faqQuestions: PropTypes.array,
  communities: PropTypes.array,
};

LoginProfile.propTypes = {
  isSearchFormVisible: PropTypes.bool,
  profileInfo: PropTypes.object,
  loginWithWalletDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
};

export default memo(View);
