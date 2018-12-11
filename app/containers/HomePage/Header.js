import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import * as bg from 'images/Logo.svg';
import * as login from 'images/Login.svg';

import {
  HEADER_ID,
  FIRST_SCREEN,
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

  a {
    display: inline-block;
  }

  color: #ffffff !important;
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

    * {
      letter-spacing: -0.9px;
    }

    a {
      text-align: center;
      outline: none;
      cursor: pointer;

      :hover {
        color: #5c78d7 !important;
      }
    }

    .log-in-button {
      display: flex;
      text-align: left;
      cursor: pointer;

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
      outline: none;
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

const Header = () => (
  <Box id={HEADER_ID}>
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-xl-6 col-lg-5 logo">
          <a className="col-md-6" href={`#${FIRST_SCREEN}`}>
            <img src={bg} alt="logo" />
          </a>
          <button
            className="col-md-6 navbar-toggler navbar-dark"
            type="button"
            onClick={toggle}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <div className="col-md-12 col-xl-6 col-lg-7 nav-bar" id={togglerId}>
          <div className="row">
            <div className="col-md-12 col-lg-7">
              <div className="row">
                <a className="col-md-12 col-lg-3" href={`#${SECOND_SCREEN}`}>
                  <FormattedMessage {...messages.about} />
                </a>
                <a className="col-md-12 col-lg-3" href={`#${THIRD_SCREEN}`}>
                  <FormattedMessage {...messages.rewards} />
                </a>
                <a className="col-md-12 col-lg-3" href={`#${FOURTH_SCREEN}`}>
                  <FormattedMessage {...messages.faq} />
                </a>
                <a className="col-md-12 col-lg-3" href={`#${FIFTH_SCREEN}`}>
                  <FormattedMessage {...messages.team} />
                </a>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              <div className="row">
                <button className="col-md-12 col-lg-6 log-in-button">
                  <img src={login} alt="login" />
                  <FormattedMessage {...messages.login} />
                </button>
                <button className="col-md-12 col-lg-6 sign-up-button">
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

export default Header;
