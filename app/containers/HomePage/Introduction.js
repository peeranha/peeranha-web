import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import * as arrowDown from 'images/arrow_down.svg';

import messages from './messages';
import Parallax from './Parallax';
import { FIRST_SCREEN, SECOND_SCREEN } from './constants';

import Header from './Header';

const Box = styled.div`
  color: #ffffff !important;
  z-index: 10;
  position: relative;
  text-align: center;
  background: none;

  .top-level {
    font-size: 64px;
    line-height: 1.23;
    letter-spacing: -2.6px;
    padding-top: 100px;
    font-family: OpenSansBold !important;
  }

  .middle-level {
    padding: 43px 64px 58px 64px;
    font-size: 24px;
    line-height: 1.42;
    letter-spacing: -1px;
  }

  @media only screen and (max-width: 992px) {
    .top-level {
      font-size: 48px;
    }

    .middle-level {
      font-size: 21px;
    }

    .icon-down {
      display: none;
    }
  }
`;

const Icon = styled.a`
  position: relative;
  color: #fff;
  font-size: 36px;
  padding-top: 95px;
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
    height: 100vh;
  }
`;

const Introduction = ({ translations }) => (
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

    <Header />
    <Wrapper className="container">
      <div className="row align-items-center justify-content-center">
        <Box className="col-lg-9 jumbotron jumbotron-fluid first-screen-banner">
          <h1 className="top-level">
            <FormattedMessage {...messages.knowledgeSharingEconomy} />
          </h1>
          <h3 className="middle-level">
            <FormattedMessage {...messages.weAreDecentralized} />
          </h3>
          <div className="col-12 col-md-7 col-lg-7 bottom-level mx-auto">
            <form className="row get-started-form">
              <input
                className="col-12 col-md-12 col-lg-8"
                placeholder={translations[messages.yourEmail.id]}
                type="text"
              />
              <button className="col-12 col-md-12 col-lg-4" type="submit">
                <FormattedMessage {...messages.getStarted} />
              </button>
            </form>
          </div>
          <div className="row w-100 justify-content-center icon-down">
            <Icon href={`#${SECOND_SCREEN}`}>
              <img src={arrowDown} alt="arrowDown" />
            </Icon>
          </div>
        </Box>
      </div>
    </Wrapper>
  </Parallax>
);

Introduction.propTypes = {
  translations: PropTypes.object,
};

export default Introduction;
