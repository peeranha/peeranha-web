import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LANDING_FONT, TEXT_PRIMARY, TEXT_LIGHT } from 'style-constants';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import logo from 'images/Logo.svg?inline';
import login from 'images/Login.svg?external';
import closeIcon from 'images/close.svg?external';
import headerNavigation from 'images/headerNavigation.svg?external';

import { scrollToSection } from 'utils/animation';

import A from 'components/A';
import Icon from 'components/Icon';
import Button from 'components/Button/Outlined/InfoLarge';

import {
  HEADER_ID,
  SECOND_SCREEN,
  THIRD_SCREEN,
  FOURTH_SCREEN,
  FIFTH_SCREEN,
} from './constants';

import messages from './messages';

/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

const Header = ({ showLoginModal, account }) => {
  const [isToggled, setToggled] = useState(false);

  function toggle(screen) {
    setToggled(!isToggled);
    scrollToSection(typeof screen === 'string' ? `#${screen}` : ``);
  }

  return (
    <Wrapper>
      <Box id={HEADER_ID} isToggled={isToggled}>
        <div className="container">
          <div className="d-flex flex-lg-row flex-column justify-content-between">
            <div className="d-flex justify-content-between flex-grow-1 flex-lg-grow-0">
              <A to={routes.home()} className="d-flex logo">
                <img src={logo} alt="logo" />
              </A>

              <button
                className="d-inline-block d-lg-none navbar-toggler p-0"
                type="button"
                onClick={toggle}
              >
                <Icon
                  icon={isToggled ? closeIcon : headerNavigation}
                  color={TEXT_LIGHT}
                  width="20"
                />
              </button>
            </div>

            <div
              className={`${
                isToggled ? '' : 'd-none'
              } d-lg-flex flex-column flex-lg-row navbar`}
            >
              <button onClick={() => toggle(SECOND_SCREEN)}>
                <FormattedMessage {...messages.about} />
              </button>

              <button onClick={() => toggle(THIRD_SCREEN)}>
                <FormattedMessage {...messages.rewards} />
              </button>

              <button onClick={() => toggle(FOURTH_SCREEN)}>
                <FormattedMessage {...messages.faq} />
              </button>

              <button onClick={() => toggle(FIFTH_SCREEN)}>
                <FormattedMessage {...messages.team} />
              </button>

              {!account && (
                <React.Fragment>
                  <button className="login" onClick={showLoginModal}>
                    <Icon className="mr-2" width="20" icon={login} />
                    <FormattedMessage {...messages.login} />
                  </button>

                  <Button
                    className="signup"
                    onClick={() =>
                      createdHistory.push(routes.signup.email.name)
                    }
                  >
                    <FormattedMessage {...messages.signUpFree} />
                  </Button>
                </React.Fragment>
              )}

              {account && (
                <Button
                  className="signup"
                  onClick={() => createdHistory.push(routes.questions())}
                >
                  <FormattedMessage {...messages.goToSite} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

const Box = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  background-color: rgba(23, 35, 74, 0.95);
  z-index: 9999;
  padding: 19px 0;

  .logo img {
    width: 240px;
    text-align: left;
    margin-top: 7px;
  }

  .navbar {
    padding-top: 12px;
    padding-bottom: 12px;

    button {
      outline: none;
      display: flex;
      align-items: center;
      letter-spacing: -0.9px;
      font-family: ${LANDING_FONT};
      font-weight: 400;
      font-size: 16px;
      padding-left: 20px;
      padding-right: 20px;
    }

    button:not(.signup) {
      color: ${TEXT_LIGHT};

      :hover {
        color: ${TEXT_PRIMARY};
      }
    }

    .signup {
      margin-left: 25px;
      min-width: 140px;
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 11px 0;
    position: fixed;
    background-color: rgba(23, 35, 74, 1);
    height: ${x => (x.isToggled ? `100vh` : `auto`)};

    .logo img {
      width: 180px;
    }

    .navbar {
      button {
        width: 100%;
        justify-content: center;
        padding: 30px 0 !important;
      }

      .signup {
        margin-left: 0px !important;
        padding: 25px 0 !important;
      }
    }
  }
`;

const Wrapper = styled.header`
  .scroll {
    position: fixed;
    background-color: rgba(9, 17, 40, 0.9);
    animation: header 1s;
    padding: 5px 0;

    @keyframes header {
      0% {
        transform: translate(0px, -180px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }

    .logo img {
      width: 180px !important;
    }
  }
`;

Header.propTypes = {
  showLoginModal: PropTypes.func,
  account: PropTypes.string,
};

export default React.memo(Header);
