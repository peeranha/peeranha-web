import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getLinks } from 'media-links';
import { TEXT_PRIMARY, TEXT_DARK, LANDING_FONT } from 'style-constants';

import ChangeLocale from 'containers/ChangeLocale';

import Icon from 'components/Icon';
import IconStyled from 'components/Icon/IconStyled';

import logo from 'images/LogoBlack.svg?external';
import medium from 'images/medium.svg?external';
import twitter from 'images/twitter.svg?external';
import linkedin from 'images/in.svg?external';
import github from 'images/github.svg?external';
import facebook from 'images/facebook.svg?external';

import * as routes from 'routes-config';

import Gradient from './Gradient';

const Box = Gradient.extend`
  color: ${TEXT_DARK};
  padding: 36px 0 26px 0;

  > div {
    .logo {
      ${IconStyled} {
        width: 200px;
        margin-top: 5px;
      }

      .year {
        font-size: 16px;
        margin-bottom: 5px;
        text-align: center;
        letter-spacing: -0.6px;
        font-family: ${LANDING_FONT};
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

        ${IconStyled} {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 20px;
    .logo ${IconStyled} {
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
    .logo ${IconStyled} {
      width: 120px !important;
    }
  }
`;

const Year = new Date().getFullYear();

const MediaLink = /* istanbul ignore next */ ({ href, src }) =>
  href ? (
    <a href={href} target="_blank">
      <Icon icon={src} hover={TEXT_PRIMARY} />
    </a>
  ) : null;

const Footer = /* istanbul ignore next */ ({ locale }) => (
  <Box position="bottom">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-6 logo">
          <div className="row align-items-center">
            <Link to={routes.home()} href={routes.home()} className="col-5">
              <Icon icon={logo} />
            </Link>
            <span className="col-lg-3 col-xl-2 d-none d-lg-inline year">
              © {Year}
            </span>
          </div>
        </div>
        <div className="col-6 col-lg-3 media-section">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4 locale">
              <ChangeLocale />
            </div>
            <div className="col-8 d-none d-lg-flex align-items-center icons">
              <MediaLink href={getLinks(locale).facebook} src={facebook} />
              <MediaLink href={getLinks(locale).twitter} src={twitter} />
              <MediaLink href={getLinks(locale).github} src={github} />
              <MediaLink href={getLinks(locale).medium} src={medium} />
              <MediaLink href={getLinks(locale).linkedin} src={linkedin} />
            </div>
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
