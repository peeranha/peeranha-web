/**
 *
 * View
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { BG_LIGHT, BORDER_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?inline';
import headerNavigationIcon from 'images/headerNavigation.svg?inline';
import img from 'images/LogoBlack.svg?inline';

import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID } from './constants';

export const LoginProfile = React.memo(
  ({ profileInfo, showLoginModalDispatch }) => {
    if (profileInfo) {
      return <ButtonGroupForAuthorizedUser profileInfo={profileInfo} />;
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
    width: 42px;
    height: 42px;
  }

  @media only screen and (max-width: 576px) {
    width: 36px;
    height: 36px;
  }
`;

const View = ({
  showMenu,
  intl,
  profileInfo,
  showLoginModalDispatch,
  redirectToAskQuestionPage,
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

  return (
    <Wrapper id={HEADER_ID}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button className="mt-1 mr-3 d-flex d-md-none" onClick={showMenu}>
              <img src={headerNavigationIcon} alt="switch" />
            </button>

            {!isSearchFormVisible && (
              <Logo to={routes.questions()}>
                <img src={img} alt="logo" />
              </Logo>
            )}
          </div>

          <Section>
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
                <img src={searchIcon} alt="icon" />
              </Button>
            )}

            {!isSearchFormVisible && (
              <Button
                id="header-ask-question"
                onClick={redirectToAskQuestionPage}
              >
                <Icon color={BG_LIGHT} icon={addIcon} width="14" noMargin />
                <span className="d-none d-lg-inline ml-2">
                  <FormattedMessage {...messages.addQuestion} />
                </span>
              </Button>
            )}

            <LoginProfile
              showLoginModalDispatch={showLoginModalDispatch}
              profileInfo={profileInfo}
            />
          </Section>
        </div>
      </div>
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
};

LoginProfile.propTypes = {
  profileInfo: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
};

export default injectIntl(React.memo(View));
