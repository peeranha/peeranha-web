import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import messages from './messages';

import Parallax from './Parallax';
import { FIRST_SCREEN, SECOND_SCREEN } from './constants';

const Box = styled.div`
  color: #ffffff !important;
  z-index: 10;
  position: relative;
  text-align: center;
  .top-level {
    font-size: 64px;
    font-weight: bold;
  }
  .middle-level {
    width: 50%;
    margin: 0 auto;
    padding: 43px;
    font-size: 24px;
  }

  @media only screen and (max-width: 992px) {
    flex-basis: 90%;
    .top-level {
      font-size: 48px;
    }
    .middle-level {
      width: 100%;
      padding: 5% 10%;
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 560px) {
    .bottom-level {
      height: auto;
      .get-started-form {
        flex-direction: column;
        > * {
          flex-basis: 48px;
          margin: 5px 0;
        }
      }
    }
  }
`;

const Icon = styled.a`
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: rotate(135deg);
  font-size: 36px;
  padding: 50px 0;
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

  @media only screen and (max-width: 992px) {
    font-size: 24px;
  }
`;

const FirstScreen = ({ translations }) => (
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
    <Box className="first-screen-banner">
      <h3 className="top-level">
        <FormattedMessage {...messages.knowledgeSharingEconomy} />
      </h3>
      <p className="middle-level">
        <FormattedMessage {...messages.weAreDecentralized} />
      </p>
      <p className="bottom-level">
        <form className="get-started-form">
          <input
            placeholder={translations[messages.yourEmail.id]}
            type="text"
          />
          <button type="submit">
            <FormattedMessage {...messages.getStarted} />
          </button>
        </form>
      </p>
    </Box>
    <Icon href={`#${SECOND_SCREEN}`}>◥</Icon>
  </Parallax>
);

FirstScreen.propTypes = {
  translations: PropTypes.object,
};

export default FirstScreen;
