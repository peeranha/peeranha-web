import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  LANDING_FONT,
  TEXT_PRIMARY,
  TEXT_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import logo from 'images/Logo.svg?inline';
import login from 'images/Login.svg?external';
import closeIcon from 'images/close.svg?external';
import headerNavigation from 'images/headerNavigation.svg?external';
import bgLogin from 'images/BG_Login.png';

import { scrollToSection } from 'utils/animation';
import * as routes from 'routes-config';
import ModalDialog from 'containers/ModalDialog';

import A from 'components/A';
import Icon from 'components/Icon';
import Button from 'components/Button/Outlined/InfoStretching';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

import { showHeaderPopup, closeHeaderPopup } from './actions';
import * as homepageSelectors from './selectors';

import {
  HEADER_ID,
  FIRST_SCREEN,
  SECOND_SCREEN,
  THIRD_SCREEN,
  FOURTH_SCREEN,
  FIFTH_SCREEN,
  SEND_EMAIL_FORM_HEADER,
} from './constants';

import messages from './messages';
import EmailLandingForm from './EmailLandingForm';

/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

export class Header extends React.PureComponent {
  state = {
    isToggled: false,
  };

  toggle /* istanbul ignore next */ = screen => {
    this.setState({ isToggled: !this.state.isToggled });
    scrollToSection(typeof screen === 'string' ? `#${screen}` : ``);
  };

  render() /* istanbul ignore next */ {
    const {
      showHeaderPopupDispatch,
      closeHeaderPopupDispatch,
      translations,
      sendEmail,
      sendEmailLoading,
    } = this.props;

    const { isToggled } = this.state;

    return (
      <Wrapper>
        <Box id={HEADER_ID} isToggled={isToggled}>
          <ModalDialog
            show={this.props.showPopup}
            closeModal={closeHeaderPopupDispatch}
          >
            <div className="header-modal-dialog">
              <div className="image-coins">
                <img src={bgLogin} alt="bgLogin" />
              </div>

              <div className="close-icon" onClick={closeHeaderPopupDispatch}>
                <Icon icon={closeIcon} />
              </div>

              <div>
                <p className="modal-dialog-message">
                  <FormattedMessage {...messages.platformUnderDeveloping} />
                </p>
                <EmailLandingForm
                  form={SEND_EMAIL_FORM_HEADER}
                  button={messages.getReward}
                  sendEmail={sendEmail}
                  sendEmailLoading={sendEmailLoading}
                  translations={translations}
                />
              </div>
            </div>
          </ModalDialog>

          <div className="container">
            <div className="row">
              <div className="col-6 col-lg-4 col-xl-5 logo">
                <A to={routes.home()} href={routes.home()}>
                  <img
                    onClick={() => scrollToSection(`#${FIRST_SCREEN}`)}
                    src={logo}
                    alt="logo"
                  />
                </A>
              </div>

              <button
                className="col-6 d-inline-block d-lg-none navbar-toggler"
                type="button"
                onClick={this.toggle}
              >
                <Icon icon={isToggled ? closeIcon : headerNavigation} />
              </button>

              <div
                className={`col-md-12 col-lg-8 col-xl-7 ${!isToggled &&
                  'd-none'} d-lg-block navbar`}
              >
                <div className="row">
                  <div className="col-12 col-lg-7">
                    <div className="row navigation">
                      <span
                        className="col-md-12 col-lg-3"
                        onClick={() => this.toggle(SECOND_SCREEN)}
                      >
                        <FormattedMessage {...messages.about} />
                      </span>

                      <span
                        className="col-md-12 col-lg-3"
                        onClick={() => this.toggle(THIRD_SCREEN)}
                      >
                        <FormattedMessage {...messages.rewards} />
                      </span>

                      <span
                        className="col-md-12 col-lg-3"
                        onClick={() => this.toggle(FOURTH_SCREEN)}
                      >
                        <FormattedMessage {...messages.faq} />
                      </span>

                      <span
                        className="col-md-12 col-lg-3"
                        onClick={() => this.toggle(FIFTH_SCREEN)}
                      >
                        <FormattedMessage {...messages.team} />
                      </span>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-5">
                    <div className="row">
                      <button
                        className="col-md-12 col-lg-6 log-in-button"
                        onClick={showHeaderPopupDispatch}
                      >
                        <Icon icon={login} />
                        <FormattedMessage {...messages.login} />
                      </button>

                      <Button
                        className="col-md-12 col-lg-6"
                        onClick={showHeaderPopupDispatch}
                      >
                        <FormattedMessage {...messages.signUpFree} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Wrapper>
    );
  }
}

/* eslint indent: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */

const Box = styled.div`
  * {
    outline: none !important;
    letter-spacing: -0.9px;
    font-family: ${LANDING_FONT};
    font-weight: 400;
  }

  position: relative;
  top: 0;
  width: 100%;
  background-color: rgba(9, 17, 40, 0.8);
  z-index: 9999;
  padding: 19px 0;

  .logo {
    img {
      width: 240px;
      text-align: left;
    }

    display: flex;
    padding-top: 7px;
  }

  .navbar {
    font-size: 16px;
    padding-top: 12px;
    padding-bottom: 12px;

    > .row {
      margin: 0;
    }

    .row,
    .row button,
    .row div {
      height: 100%;
      align-items: center;
    }

    .navigation span,
    .log-in-button {
      display: inline-block;
      text-align: center;
      color: ${TEXT_LIGHT};
      cursor: pointer;

      ${IconStyled} {
        margin-right: 9px;
        width: 21px;
        height: 21px;
      }

      :hover {
        color: ${TEXT_PRIMARY};

        ${IconHover} {
          ${IconHover({ color: TEXT_PRIMARY })};
        }
      }
    }

    .log-in-button {
      text-align: left;
    }
  }

  .header-modal-dialog {
    max-width: 480px;
    min-height: 280px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 50px 20px 10px 20px;

    * {
      font-family: ${LANDING_FONT};
      font-size: 18px;
    }

    .close-icon {
      position: absolute;
      right: 0px;
      top: 0px;
      padding: 15px 5px;

      ${IconStyled} {
        ${IconHover({ color: TEXT_SECONDARY })};

        width: 18px;
      }
    }

    .modal-dialog-message {
      text-align: left;
      font-size: 17px;
      padding-bottom: 30px;
    }

    .image-coins {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    text-align: center;
    padding: 11px 0;
    position: fixed;
    background-color: #17234a !important;
    height: ${/* istanbul ignore next */ x => (x.isToggled ? `100vh` : `auto`)};

    > div {
      .logo img {
        width: 180px;
      }
    }

    .navbar-toggler {
      text-align: right;

      ${IconStyled} {
        ${IconHover({ color: TEXT_LIGHT })};

        width: 18px;
      }
    }

    .navbar {
      .navigation span,
      button {
        min-height: calc(100vh / 8);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .row,
      .row button,
      .row div {
        height: auto;
        justify-content: center;
        margin: 0;
      }
    }

    ${/* istanbul ignore next */ x =>
      x.isToggled
        ? `
      .navbar {
        display: flex !important;
        justify-content: center;

        .log-in-button {
          text-align: center;
        }
      }
    `
        : ``};
  }
`;

const Wrapper = styled.header`
  .scroll {
    position: fixed;
    background-color: rgba(9, 17, 40, 0.9);
    animation: header 1s;

    @keyframes header {
      0% {
        transform: translate(0px, -180px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }

    padding: 5px 0;
    > div .logo {
      img {
        width: 180px !important;
      }
    }
  }
`;

Header.propTypes = {
  sendEmailLoading: PropTypes.bool,
  sendEmail: PropTypes.func,
  showHeaderPopupDispatch: PropTypes.func,
  closeHeaderPopupDispatch: PropTypes.func,
  showPopup: PropTypes.bool,
  popupPosition: PropTypes.object,
  translations: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  showPopup: homepageSelectors.selectShowPopup(),
  popupPosition: homepageSelectors.selectHeaderPopupPosition(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    showHeaderPopupDispatch: () => dispatch(showHeaderPopup()),
    closeHeaderPopupDispatch: () => dispatch(closeHeaderPopup()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
