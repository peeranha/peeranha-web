import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getLinks } from 'media-links';

import {
  TEXT_DARK,
  LANDING_FONT,
  TEXT_PRIMARY,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import partners from 'images/footer-partners.svg?inline';
import logo from 'images/LogoBlack.svg?inline';
import MediumSupportIcon from 'icons/MediumSupport';
import TwitterIcon from 'icons/Twitter';
import GithubSupportIcon from 'icons/GithubSupport';
import LinkedinIcon from 'icons/Linkedin';
import TelegramIcon from 'icons/Telegram';
import FacebookIcon from 'icons/Facebook';

import * as routes from 'routes-config';

import Gradient from './Gradient';

const Box = Gradient.extend`
  color: ${TEXT_DARK};
  padding: 36px 0 26px 0;

  > div {
    .logo {
      img {
        width: 200px;
        margin-top: 5px;
      }

      .year {
        font-size: 16px;
        text-align: center;
        letter-spacing: -0.6px;
        font-family: ${LANDING_FONT};
        margin-left: 25px;
      }
    }

    .media-section {
      .icons {
        margin-left: 35px;

        > * {
          flex: 1;
          text-align: center;
          cursor: pointer;
          color: ${TEXT_SECONDARY_LIGHT};
          line-height: 22px;
          overflow: hidden;

          &:hover {
            color: ${TEXT_PRIMARY};
          }

          :not(:last-child) {
            margin-right: 12px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 20px;
    .logo img {
      width: 160px !important;
    }
  }

  @media only screen and (max-width: 560px) {
    .logo img {
      width: 120px !important;
    }
  }
`;

const Year = new Date().getFullYear();

const MediaLink = ({ href, icon }) =>
  href ? (
    <a href={href} target="_blank">
      {icon}
    </a>
  ) : null;

const Footer = ({ locale }) => (
  <Box position="bottom">
    <div className="container">
      <div className="d-flex-column d-sm-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center logo">
          <Link to={routes.feed()}>
            <img src={logo} alt="logo" />
          </Link>
          <span className="d-none d-lg-inline year">© {Year}</span>
          <div className="d-flex align-items-center">
            <img width={87} height={55} src={partners} alt="Partners" />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center media-section">
          <div className="d-flex justify-content-center align-items-center icons">
            <MediaLink
              href={getLinks(locale).facebook}
              icon={<FacebookIcon fill="rgb(87, 111, 237)" size={[22, 22]} />}
            />
            <MediaLink
              href={getLinks(locale).twitter}
              icon={<TwitterIcon fill="rgb(87, 111, 237)" size={[22, 22]} />}
            />
            <MediaLink
              href={getLinks(locale).github}
              icon={
                <GithubSupportIcon fill="rgb(87, 111, 237)" size={[22, 22]} />
              }
            />
            <MediaLink
              href={getLinks(locale).medium}
              icon={
                <MediumSupportIcon fill="rgb(87, 111, 237)" size={[22, 20]} />
              }
            />
            <MediaLink
              href={getLinks(locale).linkedin}
              icon={<LinkedinIcon fill="rgb(87, 111, 237)" size={[22, 22]} />}
            />
            <MediaLink
              href={getLinks(locale).telegram}
              icon={<TelegramIcon fill="rgb(87, 111, 237)" size={[22, 22]} />}
            />
          </div>
        </div>
      </div>
    </div>
  </Box>
);

MediaLink.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string,
};

Footer.propTypes = {
  locale: PropTypes.string,
};

export default Footer;
