import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import av11 from 'images/1.png';
import av22 from 'images/2.png';
import av1 from 'images/av1.jpg';
import av2 from 'images/av2.jpg';
import av3 from 'images/av3.jpg';
import arrowUp from 'images/ArrowUP.svg';

import { FIRST_SCREEN, FIFTH_SCREEN } from './constants';
import messages from './messages';

import SendMessageForm from './SendMessageForm';

const icon = 47;

const Box = styled.section`
  padding-bottom: 50px;
  color: #282828;

  form {
    padding-left: 50px;

    .floating-label-input-wrapper {
      margin-bottom: 20px;
    }

    .button-submit-wrapper {
      display: flex;
      margin: 40px 0;
    }
  }

  .fifth-screen {
    position: relative;

    .icon-arrow-up {
      position: absolute;
      top: 300px;
      right: -92px;
      width: ${icon}px;
      height: ${icon}px;
      border-radius: 3px;
      box-shadow: 0px 3px 10px 0 rgba(40, 40, 40, 0.3);
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      :hover {
        animation: translatingY 2s infinite;
        @keyframes translatingY {
          0% {
            transform: translate(0, 10px);
          }
          50% {
            transform: translate(0, -10px);
          }
          100% {
            transform: translate(0, 10px);
          }
        }
      }
    }

    .fifth-screen-header {
      font-size: 45px;
      font-family: OpenSansBold !important;
      letter-spacing: -1.8px;
      padding-top: 60px;
      padding-bottom: 42px;
    }

    .fifth-screen-about {
      font-size: 20px;
      line-height: 1.5;
      letter-spacing: -0.8px;
      font-family: OpenSans;
      color: #282828;
      padding-bottom: 66px;
    }

    .fifth-screen-content {
      padding-bottom: 90px;

      .team-avatars {
        ul {
          .teammate-card {
            display: flex;
            flex-direction: column;
            padding-bottom: 63px;

            img {
              width: 150px;
              height: 150px;
              object-fit: cover;
              margin-bottom: 10px;
            }

            .name {
              font-size: 16px;
              color: rgba(40, 40, 40, 0.9);
              letter-spacing: -0.6px;
              font-family: OpenSans;
              padding: 15px 0 8px 0;
            }

            .role {
              font-family: OpenSans;
              font-size: 14px;
              color: rgba(55, 55, 55, 0.5);
              letter-spacing: -0.6px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 992px) {
    form {
      padding: 0 !important;
    }
  }

  @media only screen and (max-width: 560px) {
    .team-avatars {
      img {
        margin: 0 auto;
      }
      text-align: center;
    }
  }
`;

const Team = ({ translations }) => (
  <Box id={FIFTH_SCREEN}>
    <div className="separator">
      <div className="container">
        <div className="row fifth-screen">
          <h3 className="col-lg-12 fifth-screen-header">
            <FormattedMessage {...messages.ourTeam} />
          </h3>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row fifth-screen">
        <p className="col-lg-6 fifth-screen-about">
          <FormattedMessage {...messages.weAppreciate} />
        </p>

        <div className="col-12 fifth-screen-content">
          <div className="row">
            <div className="col-12 col-lg-7 team-avatars">
              <ul className="row">
                <li className="col-12 col-sm-4 teammate-card">
                  <img src={av11} alt="avatar" />
                  <span className="name">
                    {translations[messages.sergeyIlin.id]}
                  </span>
                  <span className="role">
                    {translations[messages.founder.id]}
                  </span>
                </li>
                <li className="col-12 col-sm-4 teammate-card">
                  <img src={av1} alt="avatar" />
                  <span className="name">
                    {translations[messages.nikitaSyr.id]}
                  </span>
                  <span className="role">
                    {translations[messages.backendDev.id]}
                  </span>
                </li>
                <li className="col-12 col-sm-4 teammate-card">
                  <img src={av2} alt="avatar" />
                  <span className="name">
                    {translations[messages.romRem.id]}
                  </span>
                  <span className="role">
                    {translations[messages.frontendDev.id]}
                  </span>
                </li>
                <li className="col-12 col-sm-4 teammate-card">
                  <img src={av3} alt="avatar" />
                  <span className="name">
                    {translations[messages.ulyanaPopova.id]}
                  </span>
                  <span className="role">
                    {translations[messages.designer.id]}
                  </span>
                </li>
                <li className="col-12 col-sm-4 teammate-card">
                  <img src={av22} alt="avatar" />
                  <span className="name">
                    {translations[messages.kateBehey.id]}
                  </span>
                  <span className="role">
                    {translations[messages.marketing.id]}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 send-message-form">
              <SendMessageForm translations={translations} />

              <a className="icon-arrow-up" href={`#${FIRST_SCREEN}`}>
                <img src={arrowUp} alt="arrowUp" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

Team.propTypes = {
  translations: PropTypes.object,
};

export default Team;
