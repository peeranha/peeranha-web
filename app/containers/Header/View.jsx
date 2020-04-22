/**
 *
 * View
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
} from 'utils/communityManagement';

import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';
import { ADefault } from 'components/A';

import { Wrapper, MainSubHeader, SingleModeSubHeader } from './Wrapper';
import Section from './Section';
import LogoStyles from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID } from './constants';

export const LoginProfile = React.memo(
  ({ profileInfo, showLoginModalDispatch, faqQuestions }) => {
    if (profileInfo) {
      return (
        <ButtonGroupForAuthorizedUser
          faqQuestions={faqQuestions}
          profileInfo={profileInfo}
        />
      );
    }

    return (
      <ButtonGroupForNotAuthorizedUser
        showLoginModal={showLoginModalDispatch}
      />
    );
  },
);

const Button = LargeButton.extend`
  background-color: ${x => x.bg};
  border: ${x => (x.bg ? '1' : '0')}px solid ${BORDER_SECONDARY};

  @media only screen and (max-width: 992px) {
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

const Base = styled.div`
  display: flex;
  margin-left: auto;
  height: 27px;
  align-items: center;
  justify-content: center;
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
  const searchFormId = 'q';

  useEffect(
    () => {
      if (isSearchFormVisible) {
        document.getElementById(searchFormId).focus();
      }
    },
    [isSearchFormVisible],
  );

  const singleCommunityId = isSingleCommunityWebsite();
  const styles = singleCommunityStyles();

  const Logo = () => {
    if (isSearchFormVisible) return null;

    const src = styles.withoutSubHeader
      ? communitiesConfig[singleCommunityId].src
      : peeranhaLogo;

    return (
      <LogoStyles to={routes.questions()}>
        <img src={src} alt="logo" />
      </LogoStyles>
    );
  };

  return (
    <Wrapper id={HEADER_ID}>
      {singleCommunityId && !styles.withoutSubHeader ? (
        <SingleModeSubHeader>
          <div className="container">
            <ADefault href={`${process.env.APP_LOCATION}${routes.questions()}`}>
              <img id="peeranha-logo" src={peeranhaLogo} alt="logo" />
            </ADefault>

            {profileInfo && (
              <ADefault href={`${process.env.APP_LOCATION}${routes.feed()}`}>
                <FormattedMessage {...messages.myFeed} />
              </ADefault>
            )}
            <ADefault href={process.env.APP_LOCATION}>
              <FormattedMessage {...messages.allQuestions} />
            </ADefault>
            <ADefault
              href={`${process.env.APP_LOCATION}${routes.communities()}`}
            >
              <FormattedMessage {...messages.allCommunities} />
            </ADefault>
            <Base>
              {profileInfo ? (
                <LoginProfile
                  showLoginModalDispatch={showLoginModalDispatch}
                  profileInfo={profileInfo}
                  faqQuestions={faqQuestions}
                />
              ) : null}
            </Base>
          </div>
        </SingleModeSubHeader>
      ) : null}

      {singleCommunityId && styles.customSubHeader
        ? styles.customSubHeader
        : null}

      <MainSubHeader>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <button className="mt-1 mr-3 d-flex d-lg-none" onClick={showMenu}>
                <Icon
                  icon={headerNavigationIcon}
                  color={TEXT_SECONDARY_LIGHT}
                  width="20"
                />
              </button>

              <Logo />
            </div>

            <Section className="insides">
              <SearchForm
                searchFormId={searchFormId}
                onBlur={() => setSearchFormVisibility(false)}
                className={`${isSearchFormVisible ? '' : 'd-none'} d-lg-flex`}
                placeholder={intl.formatMessage({
                  id: messages.search.id,
                })}
              />

              {!isSearchFormVisible && (
                <Button
                  bg={BG_LIGHT}
                  className="d-flex d-lg-none"
                  onClick={() => setSearchFormVisibility(!isSearchFormVisible)}
                >
                  <Icon
                    icon={searchIcon}
                    width="16"
                    color={TEXT_SECONDARY_LIGHT}
                  />
                </Button>
              )}

              {!isSearchFormVisible && (
                <Button
                  id="header-ask-question"
                  onClick={redirectToAskQuestionPage}
                >
                  <Icon icon={addIcon} width="14" />

                  <span className="d-none d-lg-inline ml-2">
                    <FormattedMessage {...messages.askQuestion} />
                  </span>
                </Button>
              )}

              {!singleCommunityId.withoutSubHeader || !profileInfo ? (
                <LoginProfile
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
  profileInfo: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  faqQuestions: PropTypes.array,
};

export default injectIntl(React.memo(View));
