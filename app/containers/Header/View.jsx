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

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?external';
import headerNavigationIcon from 'images/headerNavigation.svg?external';
import peeranhaLogo from 'images/LogoBlack.svg?inline';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  getSingleCommunityDetails,
} from 'utils/communityManagement';

import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';
import { IconSm, IconLm } from 'components/Icon/IconWithSizes';
import { ADefault } from 'components/A';

import { Wrapper, MainSubHeader, SingleModeSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles, { QAndALogo } from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID, SEARCH_FORM_ID } from './constants';

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
  faqQuestions,
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

      const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

      return styles.withoutSubHeader ? (
        <QAndALogo to={isBloggerMode ? routes.detailsHomePage() : routes.questions()}>
          <FormattedMessage {...messages.questions} />
          <span>&amp;</span>
          <FormattedMessage {...messages.answers} />
        </QAndALogo>
      ) : (
        <LogoStyles to={routes.questions()}>
          <img src={src} alt="logo" />
        </LogoStyles>
      );
    },
    [isSearchFormVisible],
  );

  return (
    <Wrapper id={HEADER_ID}>
      {!styles?.customSubHeader &&
        !!single && (
          <SingleModeSubHeader>
            <div className="container">
              <ADefault
                href={`${process.env.APP_LOCATION}${routes.questions()}`}
              >
                <img id="peeranha-logo" src={peeranhaLogo} alt="logo" />
              </ADefault>

              {profileInfo && (
                <ADefault href={`${process.env.APP_LOCATION}${routes.feed()}`}>
                  <FormattedMessage {...messages.myFeed} />
                </ADefault>
              )}
              <ADefault href={`${process.env.APP_LOCATION}/#allquestions`}>
                <FormattedMessage {...messages.allQuestions} />
              </ADefault>
              <ADefault
                href={`${process.env.APP_LOCATION}${routes.communities()}`}
              >
                <FormattedMessage {...messages.allCommunities} />
              </ADefault>
            </div>
          </SingleModeSubHeader>
        )}
      {styles?.customSubHeader ?? null}
      <MainSubHeader mainSubHeaderBgColor={styles.mainSubHeaderBgColor}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button className="mt-1 mr-3 d-flex d-lg-none" onClick={showMenu}>
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
                    <Icon
                      icon={searchIcon}
                      width="16"
                      color={TEXT_SECONDARY_LIGHT}
                    />
                  </Button>
                  <Button
                    id="header-ask-question"
                    onClick={redirectToAskQuestionPage}
                  >
                    <IconSm fill={BG_LIGHT} icon={addIcon} />

                    <span className="d-none d-lg-inline ml-2">
                      <FormattedMessage {...messages.askQuestion} />
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
  isMenuVisible: PropTypes.bool,
  showMenu: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  redirectToAskQuestionPage: PropTypes.func,
  faqQuestions: PropTypes.array,
};

LoginProfile.propTypes = {
  isSearchFormVisible: PropTypes.bool,
  profileInfo: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
};

export default injectIntl(memo(View));
