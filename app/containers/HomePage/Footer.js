import React from 'react';
import styled from 'styled-components';

import ChangeLocale from 'containers/ChangeLocale';

import * as logo from 'images/LogoBlack.svg';
import * as yt from 'images/yt.svg';
import * as tw from 'images/tw.svg';
import * as fb from 'images/fb.svg';

import { FIRST_SCREEN } from './constants';

const Box = styled.footer`
  background-color: rgba(229, 229, 229, 0.6);
  color: #282828;
  padding: 36px 0 26px 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      img {
        width: 200px;
      }

      .year {
        font-size: 16px;
        padding: 0 30px;
        margin-bottom: 5px;
      }
    }

    .media {
      .icons {
        display: flex;
        margin-bottom: 5px;

        > * {
          padding-left: 25px;
          cursor: pointer;
          display: flex;
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 20px;
    .logo img {
      width: 160px !important;
    }
    .year {
      display: none;
    }
    .media .icons {
      display: none !important;
    }
  }

  @media only screen and (max-width: 560px) {
    .logo img {
      width: 120px !important;
    }
  }
`;

const Year = new Date().getFullYear();

const Footer = () => (
  <Box>
    <div className="container">
      <div className="logo">
        <a href={`#${FIRST_SCREEN}`}>
          <img src={logo} alt="logo" />
        </a>
        <span className="year">© {Year}</span>
      </div>
      <div className="media">
        <div className="locale">
          <ChangeLocale />
        </div>
        <div className="icons">
          <a href="https://www.youtube.com/" target="_blank">
            <img src={yt} alt="logo" />
          </a>
          <a href="https://facebook.com" target="_blank">
            <img src={fb} alt="logo" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <img src={tw} alt="logo" />
          </a>
        </div>
      </div>
    </div>
  </Box>
);

export default Footer;
