import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import * as arrowDown from 'images/arrow_down.svg';

import messages from './messages';
import Parallax from './Parallax';
import {
  FIRST_SCREEN,
  SECOND_SCREEN,
  SEND_EMAIL_FORM_INTRODUCTION,
} from './constants';

import Header from './Header';
import EmailLandingForm from './EmailLandingForm';

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
    font-size: 1.5em;
    padding-top: 43px;
    padding-bottom: 58px;
  }

  form {
    display: flex;
    width: 100%;

    > div:nth-child(1) {
      flex: 2;
      margin-right: 10px;
    }

    > div:nth-child(2) {
      flex: 1;
    }
  }

  .icon-down {
    padding-top: 95px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 12px;

    .top-level {
      padding-top: 0;
    }
  }

  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const Icon = styled.a`
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

const Introduction = ({ sendEmailLoading, sendEmail }) => (
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

    <Header sendEmailLoading={sendEmailLoading} sendEmail={sendEmail} />
    <Wrapper className="container">
      <div className="row align-items-center justify-content-center">
        <Box className="col-lg-12 first-screen-banner">
          <div className="row justify-content-center">
            <h1 className="col-12 col-lg-10 top-level">
              <FormattedMessage {...messages.yourContributionsRewarded} />
            </h1>
          </div>

          <div className="row justify-content-center">
            <p className="col-12 col-lg-8 special-paragraph">
              <FormattedMessage {...messages.weAreDecentralized} />
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-xl-5 bottom-level mx-auto">
              <EmailLandingForm
                form={SEND_EMAIL_FORM_INTRODUCTION}
                button={messages.getStarted}
                sendEmailLoading={sendEmailLoading}
                sendEmail={sendEmail}
              />
            </div>
          </div>

          <div className="row justify-content-center d-none d-lg-block">
            <div className="col-12 justify-content-center icon-down">
              <Icon href={`#${SECOND_SCREEN}`}>
                <img src={arrowDown} alt="arrowDown" />
              </Icon>
            </div>
          </div>
        </Box>
      </div>
    </Wrapper>
  </Parallax>
);

Introduction.propTypes = {
  sendEmailLoading: PropTypes.bool,
  sendEmail: PropTypes.func,
};

export default Introduction;
