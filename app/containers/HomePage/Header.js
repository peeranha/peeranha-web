import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import logo from 'images/Logo.svg';
import login from 'images/Login.svg';
import bgLogin from 'images/BG_Login.png';

import createdHistory from 'createdHistory';

import * as routes from 'routes-config';
import ModalDialog from 'containers/ModalDialog';

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

const Box = styled.div`
  * {
    outline: none !important;
    letter-spacing: -0.9px;
    font-family: OpenSans, sans-serif;
  }

  position: relative;
  top: 0;
  width: 100%;
  background-color: rgba(9, 17, 40, 0.8);
  z-index: 9999;
  padding: 19px 0;

  button {
    cursor: pointer;
  }

  .logo {
    img {
      width: 240px;
      text-align: left;
    }

    display: flex;
    padding-top: 7px;
  }

  .nav-bar {
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

    .navigation button {
      text-align: center;
      cursor: pointer;
      display: inline-block;
      color: #ffffff;
    }

    .log-in-button {
      display: flex;
      text-align: left;
      cursor: pointer;
      color: #ffffff;

      img {
        padding-right: 9px;
      }

      span {
        vertical-align: 5px;
      }

      :hover {
        color: #5c78d7 !important;
      }
    }

    .sign-up-button {
      cursor: pointer;
      border: 1px solid #fc6655;
      border-radius: 3px;
      color: #fc6655;

      :hover {
        color: #fff;
        background: #fc6655;
      }
    }
  }

  .header-modal-dialog {
    max-width: 480px;
    min-height: 280px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 20px 10px 20px;

    * {
      font-family: OpenSans, sans-serif;
      font-size: 18px;
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

    > div {
      .logo img {
        width: 180px;
      }
    }

    .navbar-toggler {
      text-align: right;
      color: #fff;
    }

    .nav-bar {
      button {
        min-height: 40px;
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

    .nav-bar.show {
      display: flex !important;
      justify-content: center;
    }
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

export class Header extends React.PureComponent {
  state = {
    togglerId: 'navbartogglerId',
  };

  showModalPlatformDeveloping = e => {
    const { left } = window.$(e.target).offset();

    this.props.showHeaderPopupDispatch({
      top: 120,
      left: left * 0.85,
    });
  };

  closeModalPlatformDeveloping = () => {
    this.props.closeHeaderPopupDispatch();
  };

  changeLocation = e => {
    createdHistory.push(routes.home());
    window.location.hash = `#${e.currentTarget.dataset.hash}`;
  };

  toggle = () => {
    const show = window.$(`#${this.state.togglerId}`).hasClass('show');
    const action = !show ? 'add' : 'remove';

    window.$(`#${this.state.togglerId}`)[`${action}Class`]('show');
  };

  render() {
    return (
      <Wrapper>
        <Box id={HEADER_ID}>
          <ModalDialog
            show={this.props.showPopup}
            closeModal={this.closePopup}
            customPosition={this.props.popupPosition}
          >
            <div className="header-modal-dialog">
              <div className="image-coins">
                <img src={bgLogin} alt="bgLogin" />
              </div>

              <div>
                <p className="modal-dialog-message">
                  <FormattedMessage {...messages.platformUnderDeveloping} />
                </p>
                <EmailLandingForm
                  form={SEND_EMAIL_FORM_HEADER}
                  button={messages.getReward}
                  sendEmail={this.props.sendEmail}
                  sendEmailLoading={this.props.sendEmailLoading}
                />
              </div>
            </div>
          </ModalDialog>

          <div className="container">
            <div className="row">
              <div className="col-6 col-xl-6 col-lg-4 logo">
                <button onClick={this.changeLocation} data-hash={FIRST_SCREEN}>
                  <img src={logo} alt="logo" />
                </button>
              </div>

              <button
                className="col-6 d-inline-block d-lg-none navbar-toggler navbar-dark"
                type="button"
                onClick={this.toggle}
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="col-md-12 col-xl-6 col-lg-8 nav-bar d-none d-lg-block"
                id={this.state.togglerId}
              >
                <div className="row">
                  <div className="col-md-12 col-lg-7">
                    <div className="row navigation">
                      <button
                        className="col-md-12 col-lg-3"
                        onClick={this.changeLocation}
                        data-hash={SECOND_SCREEN}
                      >
                        <FormattedMessage {...messages.about} />
                      </button>
                      <button
                        className="col-md-12 col-lg-3"
                        onClick={this.changeLocation}
                        data-hash={THIRD_SCREEN}
                      >
                        <FormattedMessage {...messages.rewards} />
                      </button>
                      <button
                        className="col-md-12 col-lg-3"
                        onClick={this.changeLocation}
                        data-hash={FOURTH_SCREEN}
                      >
                        <FormattedMessage {...messages.faq} />
                      </button>
                      <button
                        className="col-md-12 col-lg-3"
                        onClick={this.changeLocation}
                        data-hash={FIFTH_SCREEN}
                      >
                        <FormattedMessage {...messages.team} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <div className="row">
                      <button
                        className="col-md-12 col-lg-6 log-in-button"
                        onClick={this.showModalPlatformDeveloping}
                      >
                        <img src={login} alt="login" />
                        <FormattedMessage {...messages.login} />
                      </button>
                      <button
                        className="col-md-12 col-lg-6 sign-up-button"
                        onClick={this.showModalPlatformDeveloping}
                      >
                        <FormattedMessage {...messages.signUpFree} />
                      </button>
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

Header.propTypes = {
  sendEmailLoading: PropTypes.bool,
  sendEmail: PropTypes.func,
  showHeaderPopupDispatch: PropTypes.func,
  closeHeaderPopupDispatch: PropTypes.func,
  showPopup: PropTypes.bool,
  popupPosition: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  showPopup: homepageSelectors.selectShowPopup(),
  popupPosition: homepageSelectors.selectHeaderPopupPosition(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showHeaderPopupDispatch: position => dispatch(showHeaderPopup(position)),
    closeHeaderPopupDispatch: () => dispatch(closeHeaderPopup()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
