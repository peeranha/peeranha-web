import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ChangeLocale from 'containers/ChangeLocale';

import * as logo from 'images/LogoBlack.svg';
import * as yt from 'images/yt.svg';
import * as tw from 'images/tw.svg';
import * as fb from 'images/fb.svg';

import * as routes from 'routes-config';

const Box = styled.footer`
  color: #282828;
  padding: 36px 0 26px 0;
  background: linear-gradient(
    to bottom,
    #f9f9f9 0%,
    #f8f8f8 0%,
    #fafafa 20%,
    #fbfbfb 59%,
    #fbfbfb 59%,
    #fcfcfc 80%,
    #fdfdfd 100%
  );

  > div {
    .logo {
      img {
        width: 200px;
        margin-top: 5px;
      }

      .year {
        font-size: 16px;
        margin-bottom: 5px;
        text-align: center;
        letter-spacing: -0.6px;
        font-family: OpenSans;
      }
    }

    .media-section {
      .locale {
        text-align: center;
      }

      .icons > * {
        flex: 1;
        text-align: center;
        cursor: pointer;
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

    .media-section {
      .locale {
        text-align: right !important;
      }

      .icons {
        display: none !important;
      }
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
      <div className="row justify-content-between align-items-center">
        <div className="col-6 logo">
          <div className="row align-items-center">
            <Link to={routes.home()} href={routes.home()} className="col-5">
              <img src={logo} alt="logo" />
            </Link>
            <span className="col-2 year">© {Year}</span>
          </div>
        </div>
        <div className="col-6 col-lg-3 media-section">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 locale">
              <ChangeLocale />
            </div>
            <div className="col-6 icons d-flex align-items-center">
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
      </div>
    </div>
  </Box>
);

export default Footer;
