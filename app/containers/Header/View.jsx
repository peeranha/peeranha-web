import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import {
  BG_LIGHT,
  BORDER_SECONDARY,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import * as routes from 'routes-config';
import communitiesConfig from 'communities-config';
import messages from 'common-messages';

import SearchFeedIcon from 'icons/SearchFeed';
import BurgerIcon from 'icons/Burger';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import LoaderIcon from 'icons/Loader';
import PlusIcon from 'icons/Plus';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';

import LargeButton from 'components/Button/Contained/InfoLarge';

import styled from 'styled-components';
import { Wrapper, MainSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID, LOADER_HEIGHT, SEARCH_FORM_ID } from './constants';

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
  svg {
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

const View = ({
  showMenu,
  intl,
  profileInfo,
  showLoginModalDispatch,
  redirectToAskQuestionPage,
  showLoginModalWithRedirectToAskQuestionPage,
  faqQuestions,
  isTransactionInPending,
  transactionHash,
  transactionInitialised,
}) => {
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
            <LoaderIcon fill="#576fed" />
            {isTransactionInPending ? (
              <FormattedMessage
                id={messages.transactionInPending.id}
                values={{
                  transaction: (
                    <a
                      href={process.env.BLOCKCHAIN_TRANSACTION_INFO_URL.concat(
                        transactionHash,
                      )}
                      target="_blank"
                    >
                      <FormattedMessage id={messages.transaction.id} />
                    </a>
                  ),
                }}
              />
            ) : (
              <FormattedMessage id={messages.waitingForConfirm.id} />
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
                <BurgerIcon
                  fill={styles.commHeadElemColor || TEXT_SECONDARY_LIGHT}
                />
              </button>
              <Logo />
            </div>

            <Section className="insides">
              <SearchForm
                searchFormId={SEARCH_FORM_ID}
                onBlur={() => setSearchFormVisibility(false)}
                className={`${isSearchFormVisible ? '' : 'd-none'} d-lg-flex`}
                placeholder={intl.formatMessage({
                  id: messages.search.id,
                })}
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
                    <SearchFeedIcon
                      fill={TEXT_SECONDARY_LIGHT}
                      size={[16, 16]}
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
                    <PlusIcon fill={BG_LIGHT} />

                    <span className="d-none d-lg-inline ml-2">
                      <FormattedMessage id={messages.askQuestion.id} />
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
  intl: intlShape.isRequired,
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

export default injectIntl(memo(View));
