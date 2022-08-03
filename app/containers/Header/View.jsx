import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  BG_LIGHT,
  BORDER_SECONDARY,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import * as routes from 'routes-config';
import communitiesConfig from 'communities-config';

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?external';
import headerNavigationIcon from 'images/headerNavigation.svg?external';
import peeranhaLogo from 'images/LogoBlack.svg?inline';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';

import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';
import { IconSm, IconLm } from 'components/Icon/IconWithSizes';

import styled from 'styled-components';
import { Wrapper, MainSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID, LOADER_HEIGHT, SEARCH_FORM_ID } from './constants';
import processIndicator from '../../images/progress-indicator.svg?inline';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

export const LoginProfile = memo(
  ({
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
      <ButtonGroupForNotAuthorizedUser
        showLoginModal={showLoginModalDispatch}
      />
    ),
);

const colors = singleCommunityColors();

const ProgressIndicator = styled.div`
  background: ${colors.mainBackground
    ? colors.mainBackground
    : 'rgb(234, 236, 244)'};
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
  img {
    margin-right: 10px;
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
  background-color: ${x => x.bg};
  border: ${x => (x.bg ? '1' : '0')}px solid ${BORDER_SECONDARY};

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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuLogo = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 340px) {
    margin-left: -20px;
    transform: scale(0.85);
  }
`;

const Buttons = Section.extend`
  @media only screen and (max-width: 325px) {
    margin-left: -30px;
    transform: scale(0.8);
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
}) => {
  const { t } = useTranslation();
  const [isSearchFormVisible, setSearchFormVisibility] = useState(false);

  useEffect(
    () => {
      if (isSearchFormVisible && !single) {
        document.getElementById(SEARCH_FORM_ID).focus();
      }
    },
    [isSearchFormVisible],
  );

  const Logo = useCallback(
    () => {
      if (isSearchFormVisible) return null;

      const src = styles.withoutSubHeader
        ? communitiesConfig[single].src
        : peeranhaLogo;

      return (
        <LogoStyles to={routes.feed()}>
          <img src={src} alt="logo" />
          {styles.logoText}
        </LogoStyles>
      );
    },
    [isSearchFormVisible],
  );

  return (
    <Wrapper id={HEADER_ID} transactionInitialised={transactionInitialised}>
      {transactionInitialised && (
        <ProgressIndicator>
          <div>
            <img src={processIndicator} alt="icon" />
            {isTransactionInPending ? (
              <>
                {t('common.transactionInPending')}{' '}
                <a
                  href={process.env.BLOCKCHAIN_TRANSACTION_INFO_URL.concat(
                    transactionHash,
                  )}
                  target="_blank"
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

      <MainSubHeader mainSubHeaderBgColor={styles.mainSubHeaderBgColor}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button
                className="mt-1 mr-3 d-flex d-lg-none"
                onClick={showMenu}
                type="button"
              >
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
                    onClick={() =>
                      setSearchFormVisibility(!isSearchFormVisible)
                    }
                  >
                    <Icon
                      icon={searchIcon}
                      width="16"
                      color={TEXT_SECONDARY_LIGHT}
                    />
                  </Button>
                  <Button
                    id="header-ask-question"
                    onClick={
                      profileInfo
                        ? redirectToAskQuestionPage
                        : showLoginModalWithRedirectToAskQuestionPage
                    }
                  >
                    <IconSm fill={BG_LIGHT} icon={addIcon} />

                    <span className="d-none d-lg-inline ml-2">
                      {t('common.askQuestion')}
                    </span>
                  </Button>
                </>
              )}

              {!single.withoutSubHeader || !profileInfo ? (
                <LoginProfile
                  isSearchFormVisible={isSearchFormVisible}
                  showLoginModalDispatch={showLoginModalDispatch}
                  profileInfo={profileInfo}
                  faqQuestions={faqQuestions}
                />
              ) : null}
            </Section>
          </div>
        </div>
      </MainSubHeader>
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
};

LoginProfile.propTypes = {
  isSearchFormVisible: PropTypes.bool,
  profileInfo: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
};

export default memo(View);
