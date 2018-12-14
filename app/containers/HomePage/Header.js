import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import * as bg from 'images/Logo.svg';
import * as login from 'images/Login.svg';
import * as bgLogin from 'images/BG_Login.png';

import * as routes from 'routes-config';
import ModalDialog from 'containers/ModalDialog';

import {
  HEADER_ID,
  SECOND_SCREEN,
  THIRD_SCREEN,
  FOURTH_SCREEN,
  FIFTH_SCREEN,
} from './constants';

import messages from './messages';

const togglerId = 'navbartogglerId';

const toggle = () => {
  const show = window.$(`#${togglerId}`).hasClass('show');
  const action = !show ? 'add' : 'remove';

  window.$(`#${togglerId}`)[`${action}Class`]('show');
};

const Box = styled.header`
  .navbar-toggler {
    display: none;
  }

  * {
    outline: none !important;
    letter-spacing: -0.9px;
    font-family: OpenSans;
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
    cursor: pointer;
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

    a {
      text-align: center;
      cursor: pointer;
      display: inline-block;
      color: #ffffff;

      :hover {
        color: #5c78d7 !important;
      }
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
    max-width: 400px;
    min-height: 240px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 20px;

    * {
      font-family: OpenSans;
      font-size: 18px;
    }

    .modal-dialog-message {
      text-align: left;
      font-size: 17px;
      padding-bottom: 10px;
    }

    form {
      > * {
        width: 100%;
        height: 48px;
        border: 1px solid #b9b9b9;
        margin-top: 15px;
        padding: 0 20px;
        border-radius: 3px;
      }

      button {
        color: #fff;
        background: #f76e5f;
        cursor: pointer;
      }
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
    position: fixed;
    text-align: center;
    padding: 11px 0;
    > div {
      .logo img {
        width: 180px;
      }
    }

    .navbar-toggler {
      text-align: right;
      display: inline-block;
      color: #fff;
    }

    .nav-bar {
      display: none !important;
      .row,
      .row button,
      .row div {
        height: auto;
        justify-content: center;
        margin: 0;
      }

      a,
      button {
        min-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .nav-bar.show {
      display: flex !important;
      justify-content: center;
    }
  }
`;

class Header extends React.PureComponent {
  state = {
    showModalPlatformDeveloping: false,
  };

  showModalPlatformDeveloping = e => {
    const { left } = window.$(e.target).offset();

    this.setState({
      showModalPlatformDeveloping: true,
      customPosition: {
        top: 120,
        left: left * 0.85,
      },
    });
  };

  closeModalPlatformDeveloping = () => {
    this.setState({ showModalPlatformDeveloping: false });
  };

  render() {
    return (
      <Box id={HEADER_ID}>
        <ModalDialog
          show={this.state.showModalPlatformDeveloping}
          closeModal={this.closeModalPlatformDeveloping}
          customPosition={this.state.customPosition}
        >
          <div className="header-modal-dialog">
            <div className="image-coins">
              <img src={bgLogin} alt="bgLogin" />
            </div>

            <div>
              <p className="modal-dialog-message">
                <FormattedMessage {...messages.platformUnderDeveloping} />
              </p>
              <form>
                <input type="text" placeholder="Your email address" />
                <button>
                  <FormattedMessage {...messages.getReward} />
                </button>
              </form>
            </div>
          </div>
        </ModalDialog>

        <div className="container">
          <div className="row">
            <div className="col-6 col-xl-6 col-lg-4 logo">
              <Link to={routes.home()} href={routes.home()}>
                <img src={bg} alt="logo" />
              </Link>
            </div>

            <button
              className="col-6 navbar-toggler navbar-dark"
              type="button"
              onClick={toggle}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="col-md-12 col-xl-6 col-lg-8 nav-bar" id={togglerId}>
              <div className="row">
                <div className="col-md-12 col-lg-7">
                  <div className="row">
                    <a
                      className="col-md-12 col-lg-3"
                      href={`#${SECOND_SCREEN}`}
                    >
                      <FormattedMessage {...messages.about} />
                    </a>
                    <a className="col-md-12 col-lg-3" href={`#${THIRD_SCREEN}`}>
                      <FormattedMessage {...messages.rewards} />
                    </a>
                    <a
                      className="col-md-12 col-lg-3"
                      href={`#${FOURTH_SCREEN}`}
                    >
                      <FormattedMessage {...messages.faq} />
                    </a>
                    <a className="col-md-12 col-lg-3" href={`#${FIFTH_SCREEN}`}>
                      <FormattedMessage {...messages.team} />
                    </a>
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
    );
  }
}

export default Header;
