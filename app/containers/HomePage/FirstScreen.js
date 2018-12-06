import React from 'react';
import styled from 'styled-components';

import Parallax from './Parallax';
import { FIRST_SCREEN, SECOND_SCREEN } from './constants';

const Box = styled.div`
  color: #ffffff !important;
  z-index: 10;
  position: relative;
  text-align: center;
  .top-level {
    font-size: 65px;
    font-weight: bold;
  }
  .middle-level {
    width: 50%;
    margin: 0 auto;
    padding: 43px;
    font-size: 24px;
  }

  @media only screen and (max-width: 992px) {
    .top-level {
      font-size: 6vw;
      font-weight: bold;
    }
    .middle-level {
      width: 100%;
      padding: 5% 10%;
      font-size: 18px;
    }
    .bottom-level {
      input {
        width: 200px;
      }
      > * {
        font-size: 15px;
      }
      margin: 10px auto;
      max-width: 300px;
      height: 32px;
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

  :hover {
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
  }
`;

const FirstScreen = () => (
  <Parallax id={FIRST_SCREEN}>
    <div className="layers">
      <div className="pattern pattern-1">
        <div className="inner" />
      </div>
    </div>
    <Box className="first-screen-banner">
      <h3 className="top-level">Knowledge Sharing Economy</h3>
      <p className="middle-level">
        We are decentralized question and answer platform for professional
        communities with economy that pays contributors in crypto.
      </p>
      <p className="bottom-level">
        <form className="get-started-form">
          <input placeholder="Your email address" type="text" />
          <button type="submit">Get started</button>
        </form>
      </p>
    </Box>
    <Icon href={`#${SECOND_SCREEN}`}>◥</Icon>
  </Parallax>
);

export default FirstScreen;
