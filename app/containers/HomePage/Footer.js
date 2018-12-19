import React from 'react';
import { Link } from 'react-router-dom';

import ChangeLocale from 'containers/ChangeLocale';

import logo from 'images/LogoBlack.svg';
import youtube from 'images/yt.svg';
import twitter from 'images/tw.svg';
import facebook from 'images/fb.svg';

import * as routes from 'routes-config';

import Gradient from './Gradient';

const Box = Gradient.extend`
  color: #282828;
  padding: 36px 0 26px 0;

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
  <Box position="top">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-6 logo">
          <div className="row align-items-center">
            <Link to={routes.home()} href={routes.home()} className="col-5">
              <img src={logo} alt="logo" />
            </Link>
            <span className="col-lg-3 col-xl-2 d-none d-lg-inline year">
              © {Year}
            </span>
          </div>
        </div>
        <div className="col-6 col-lg-3 media-section">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 locale">
              <ChangeLocale />
            </div>
            <div className="col-6 d-none d-lg-flex align-items-center icons">
              <a href="https://www.youtube.com/" target="_blank">
                <img src={youtube} alt="youtube" />
              </a>
              <a href="https://facebook.com" target="_blank">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="https://twitter.com" target="_blank">
                <img src={twitter} alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

export default Footer;
