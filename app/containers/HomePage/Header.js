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

  color: #ffffff !important;
  position: fixed;
  width: 100%;
  background-color: rgba(9, 17, 40, 0.8);
  z-index: 9999;
  padding: 19px 0;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .logo {
      img {
        width: 240px;
      }
      padding-top: 7px;
      display: flex;
      justify-content: space-between;
      align-items: end;
      cursor: pointer;
    }
    .nav-bar {
      font-size: 16px;
      display: flex;
      padding: 12px 0;
      button {
        outline: none;
        cursor: pointer;
        height: 100%;
        padding: 0 18px;
        vertical-align: middle;
      }
      .log-in-button {
        padding-right: 40px;
        img {
          padding-right: 9px;
        }
        span {
          vertical-align: 5px;
        }
      }
      .sign-up-button {
        border: 1px solid #fc6655;
        border-radius: 3px;
        color: #fc6655;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    text-align: center;
    padding: 11px 0;
    > div {
      flex-direction: column;
      .logo img {
        width: 180px;
      }
    }

    .navbar-toggler {
      display: inline-block;
      color: #fff;
    }

    .nav-bar {
      display: none !important;
    }

    .nav-bar.show {
      display: flex !important;
      flex-direction: column;
      > * {
        display: flex;
        flex-direction: column;
        > * {
          flex-basis: 45px;
        }
      }
    }
  }
`;

const Header = () => (
  <Box id={HEADER_ID}>
    <div className="container">
      <div className="logo">
        <a href={`#${FIRST_SCREEN}`}>
          <img src={bg} alt="logo" />
        </a>
        <button
          className="navbar-toggler navbar-dark"
          type="button"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

      <div className="nav-bar" id={togglerId}>
        <nav>
          <a href={`#${SECOND_SCREEN}`}>
            <button>
              <FormattedMessage {...messages.about} />
            </button>
          </a>
          <a href={`#${THIRD_SCREEN}`}>
            <button>
              <FormattedMessage {...messages.rewards} />
            </button>
          </a>
          <a href={`#${FOURTH_SCREEN}`}>
            <button>
              <FormattedMessage {...messages.faq} />
            </button>
          </a>
          <a href={`#${FIFTH_SCREEN}`}>
            <button>
              <FormattedMessage {...messages.team} />
            </button>
          </a>
        </nav>
        <nav>
          <button className="log-in-button">
            <img src={login} alt="login" />
            <FormattedMessage {...messages.login} />
          </button>
          <button className="sign-up-button">
            <FormattedMessage {...messages.signUpFree} />
          </button>
        </nav>
      </div>
    </div>
  </Box>
);

export default Header;
