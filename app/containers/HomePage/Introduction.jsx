import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { scrollToSection } from 'utils/animation';
import TriangleIcon from 'icons/Triangle';

import messages from './messages';
import Parallax from './Parallax';

import { FIRST_SCREEN, SECOND_SCREEN } from './constants';

import Header from './Header';
import ClickRouteToFeed from './ClickRouteToFeed';

const Introduction = ({ translations, showLoginModal, account }) => (
  <Parallax id={FIRST_SCREEN}>
    <div className="layers">
      <div className="pattern pattern-1">
        <div className="inner" />
      </div>
      <div className="pattern pattern-2">
        <div className="inner" />
      </div>
      <div className="pattern pattern-3">
        <div className="inner" />
      </div>
    </div>

    <Header showLoginModal={showLoginModal} account={account} />

    <Wrapper className="container">
      <div className="row align-items-center justify-content-center">
        <Box className="col-lg-12 first-screen-banner">
          <div className="d-flex justify-content-center">
            <h1 className="top-level">
              <FormattedMessage {...messages.yourContributionsRewarded} />
            </h1>
          </div>

          <div className="row justify-content-center">
            <p className="col-12 col-lg-8 special-paragraph">
              <FormattedMessage {...messages.weAreDecentralized} />
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-xl-6 bottom-level mx-auto">
              <ClickRouteToFeed />
            </div>
          </div>

          <div className="d-none d-lg-flex justify-content-center">
            <div className="justify-content-center icon-down">
              <Icon onClick={() => scrollToSection(`#${SECOND_SCREEN}`)}>
                <TriangleIcon />
              </Icon>
            </div>
          </div>
        </Box>
      </div>
    </Wrapper>
  </Parallax>
);

const Box = styled.div`
  color: #ffffff !important;
  z-index: 10;
  position: relative;
  text-align: center;
  background: none;
  font-size: 16px;

  .top-level {
    font-size: 4em;
    line-height: 1.23;
    padding-top: 100px;
  }

  .special-paragraph {
    font-size: 1.5em !important;
    line-height: 1.5em !important;
    padding-top: 43px;
    padding-bottom: 58px;
  }

  .icon-down {
    padding-top: 95px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 21px;

    .top-level {
      padding-top: 0;
      font-size: 2.5em;
    }
  }

  @media only screen and (max-width: 560px) {
    font-size: 18px;

    .special-paragraph {
      padding-top: 20px;
      padding-bottom: 30px;
    }
  }

  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;

const Icon = styled.span`
  position: relative;
  color: #fff;
  font-size: 36px;
  cursor: pointer;

  animation: pulse 2s infinite;
  @keyframes pulse {
    0% {
      bottom: 0px;
    }
    50% {
      bottom: 10px;
    }
    100% {
      bottom: 0px;
    }
  }
`;

const Wrapper = styled.div`
  height: calc(100vh - 100px);

  > .row {
    height: 100%;
  }

  @media only screen and (max-width: 992px) {
    height: 100vmax;
  }
`;

Introduction.propTypes = {
  showLoginModal: PropTypes.func,
  account: PropTypes.string,
  translations: PropTypes.object,
};

export default React.memo(Introduction);
