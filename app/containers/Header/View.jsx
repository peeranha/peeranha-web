import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { css } from '@emotion/react';
import { BG_LIGHT, BORDER_SECONDARY, TEXT_SECONDARY_LIGHT, TEXT_PRIMARY } from 'style-constants';

import * as routes from 'routes-config';
import communitiesConfig from 'communities-config';

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?external';
import headerNavigationIcon from 'images/headerNavigation.svg?external';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import peeranhaMetaLogo from 'images/PeeranhaMeta.svg?inline';
import processIndicator from 'images/progress-indicator.svg?external';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { getRatingByCommunity } from 'utils/profileManagement';
import { showPopover } from 'utils/popover';
import useMediaQuery from 'hooks/useMediaQuery';

import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';
import EditDocumentation from 'components/Documentation';
import { IconSm, IconLm, IconLg } from 'components/Icon/IconWithSizes';

import styled from 'styled-components';
import { Wrapper, MainSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';
import ChangeLocale from 'containers/ChangeLocale';

import { HEADER_ID, LOADER_HEIGHT, SEARCH_FORM_ID, MIN_REPUTATION } from './constants';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

export const LoginProfile = ({
  profileInfo,
  showLoginModalDispatch,
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
    <ButtonGroupForNotAuthorizedUser showLoginModal={showLoginModalDispatch} />
  );

const colors = singleCommunityColors();

const ProgressIndicator = styled.div`
  background: ${colors.mainBackground ? colors.mainBackground : 'rgb(234, 236, 244)'};
  min-height: ${LOADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  animation: animation 0.5s forwards;

  @keyframes animation {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  svg {
    animation: rotation 1s infinite linear;
  }

  div {
    display: flex;
    align-items: center;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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
`;

const View = ({
  showMenu,
  profileInfo,
  showLoginModalDispatch,
  redirectToAskQuestionPage,
  showLoginModalWithRedirectToAskQuestionPage,
  faqQuestions,
  isTransactionInPending,
  transactionHash,
  transactionInitialised,
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

  const Logo = useCallback(() => {
    if (isSearchFormVisible) return null;

    const logo = single ? peeranhaMetaLogo : peeranhaLogo;
    const src = styles.withoutSubHeader ? communitiesConfig[single].src : logo;

    return (
      <LogoStyles to={single ? routes.feed() : routes.home()}>
        <img src={src} alt="logo" />
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

  return (
    <Wrapper id={HEADER_ID} transactionInitialised={transactionInitialised}>
      {transactionInitialised && (
        <ProgressIndicator>
          <div
            css={css`
              > span {
                margin-left: 10px;
              }
              color: ${colors.white || ''};
            `}
          >
            <IconLg
              icon={processIndicator}
              css={css`
                path {
                  fill: ${colors.linkColor || TEXT_PRIMARY};
                }
              `}
            />
            {isTransactionInPending ? (
              <>
                {t('common.transactionInPending')}{' '}
                <a
                  href={process.env.BLOCKCHAIN_TRANSACTION_INFO_URL.concat(transactionHash)}
                  target="_blank"
                  css={css`
                    margin: 0 5px;
                    color: ${colors.linkColor || TEXT_PRIMARY};
                    :hover {
                      color: ${colors.linkColor || TEXT_PRIMARY};
                      opacity: 0.5;
                    }
                  `}
                >
                  {t('common.transaction')}
                </a>{' '}
                {t('common.transactionInPendingEnd')}
              </>
            ) : (
              t('common.waitingForConfirm')
            )}
          </div>
        </ProgressIndicator>
      )}

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
                    bg={BG_LIGHT}
                    className="d-flex d-lg-none"
                    onClick={() => setSearchFormVisibility(!isSearchFormVisible)}
                  >
                    <Icon icon={searchIcon} width="16" color={TEXT_SECONDARY_LIGHT} />
                  </Button>
                  <Button
                    id="header-ask-question"
                    onClick={
                      profileInfo ? askQuestionHandler : showLoginModalWithRedirectToAskQuestionPage
                    }
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
                    <IconSm fill={colors.newPostButtonText || BG_LIGHT} icon={addIcon} />

                    <span
                      className="d-none d-lg-inline ml-2"
                      css={css`
                        color: ${colors.newPostButtonText};
                      `}
                    >
                      {t('common.askQuestion')}
                    </span>
                  </Button>
                </>
              )}

              {!single?.withoutSubHeader || !profileInfo ? (
                <LoginProfile
                  isSearchFormVisible={isSearchFormVisible}
                  showLoginModalDispatch={showLoginModalDispatch}
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
  showLoginModalDispatch: PropTypes.func,
  showLoginModalWithRedirectToAskQuestionPage: PropTypes.func,
  redirectToAskQuestionPage: PropTypes.func,
  faqQuestions: PropTypes.array,
  isTransactionInPending: PropTypes.bool,
  transactionHash: PropTypes.string,
  transactionInitialised: PropTypes.bool,
  communities: PropTypes.array,
};

LoginProfile.propTypes = {
  isSearchFormVisible: PropTypes.bool,
  profileInfo: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
};

export default memo(View);
