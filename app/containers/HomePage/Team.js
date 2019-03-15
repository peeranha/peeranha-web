import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LANDING_FONT } from 'style-constants';

import sergeyIlin from 'images/Team_Sergey.jpg';
import steveKreynin from 'images/Team_Steve.png';
import nikitaSyr from 'images/av1.jpg';
import romRem from 'images/av2.jpg';
import ulyanaPopova from 'images/av3.jpg';
import arrowUp from 'images/ArrowUP.svg';
import letterSmile from 'images/letter-smile.svg';

import { FIRST_SCREEN, FIFTH_SCREEN, SEND_MESSAGE_FORM } from './constants';
import messages from './messages';

import SendMessageForm from './SendMessageForm';
import Section from './Section';
import Gradient from './Gradient';

const icon = 47;

const Box = Section.extend`
  color: #282828;

  a {
    text-decoration: none;
  }

  form {
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
      padding-bottom: 65px;
    }

    .fifth-screen-about {
      line-height: 1.5;
      color: #282828;
      padding-bottom: 65px;
    }

    .fifth-screen-content {
      .team-avatars {
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 60px;

        ul {
          .teammate-card {
            display: flex;
            flex-direction: row;
            padding-bottom: 65px;

            img {
              min-width: 150px;
              height: 150px;
              object-fit: cover;
              margin-bottom: 10px;
              margin-right: 30px;
            }

            .name {
              font-size: 18px;
              line-height: 20px;
              font-weight: 700;
              color: rgba(40, 40, 40, 0.9);
              letter-spacing: -0.6px;
              font-family: ${LANDING_FONT};
            }

            .role {
              font-family: ${LANDING_FONT};
              font-size: 14px;
              line-height: 18px;
              color: rgba(55, 55, 55, 0.5);
              letter-spacing: -0.6px;
              padding: 10px 0;
            }

            .description {
              font-family: ${LANDING_FONT};
              font-size: 16px;
              line-height: 1.63;
              letter-spacing: -0.6px;
              color: #282828;
            }
          }
        }
      }
    }

    .info-appreciate {
      padding: 30px 0px 30px 30px;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 17px;
      letter-spacing: -0.7px;
    }
  }

  @media only screen and (max-width: 992px) {
    .fifth-screen-content .info-appreciate {
      padding: 0px;
      padding-bottom: 30px;
    }

    form {
      padding: 0 !important;

      .button-submit-wrapper {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 560px) {
    .fifth-screen .fifth-screen-content .team-avatars ul .teammate-card {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;

      img {
        margin-right: 0;
      }
    }
  }
`;

const LinkIn = styled.a`
  color: #0b78b6;
  text-decoration: none;
  padding-left: 15px;
  font-size: 20px;

  :after {
    content: 'in';
  }
`;

const Team = ({ translations, sendMessageLoading, sendMessage }) => (
  <Gradient position="bottom">
    <Box id={FIFTH_SCREEN}>
      <div className="container">
        <div className="row fifth-screen">
          <h2 className="col-lg-12 fifth-screen-header">
            <FormattedMessage {...messages.ourTeam} />
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row fifth-screen">
          <div className="col-12 fifth-screen-content">
            <div className="team-avatars">
              <ul className="row">
                <li className="col-12 col-lg-6 teammate-card">
                  <img src={steveKreynin} alt="steveKreynin" />
                  <p className="d-flex flex-column">
                    <span className="name">
                      <span>{translations[messages.steveKreynin.id]}</span>
                      <LinkIn
                        href="https://www.linkedin.com/in/stevekreynin/"
                        target="_blank"
                      />
                    </span>
                    <span className="role">
                      {translations[messages.steveKreyninRole.id]}
                    </span>
                    <span className="description">
                      {translations[messages.steveKreyninDescription.id]}
                    </span>
                  </p>
                </li>

                <li className="col-12 col-lg-6 teammate-card">
                  <img src={sergeyIlin} alt="sergeyIlin" />
                  <p className="d-flex flex-column">
                    <span className="name">
                      <span>{translations[messages.sergeyIlin.id]}</span>
                      <LinkIn
                        href="https://www.linkedin.com/in/sergeyilinn/"
                        target="_blank"
                      />
                    </span>
                    <span className="role">
                      {translations[messages.sergeyIlinRole.id]}
                    </span>
                    <span className="description">
                      {translations[messages.sergeyIlinDescription.id]}
                    </span>
                  </p>
                </li>

                <li className="col-12 col-lg-6 teammate-card">
                  <img src={nikitaSyr} alt="nikitaSyr" />
                  <p className="d-flex flex-column">
                    <span className="name">
                      {translations[messages.nikitaSyr.id]}
                    </span>
                    <span className="role">
                      {translations[messages.nikitaSyrRole.id]}
                    </span>
                    <span className="description">
                      {translations[messages.nikitaSyrDescription.id]}
                    </span>
                  </p>
                </li>

                <li className="col-12 col-lg-6 teammate-card">
                  <img src={romRem} alt="romRem" />
                  <p className="d-flex flex-column">
                    <span className="name">
                      {translations[messages.romRem.id]}
                    </span>
                    <span className="role">
                      {translations[messages.romRemRole.id]}
                    </span>
                    <span className="description">
                      {translations[messages.romRemDescription.id]}
                    </span>
                  </p>
                </li>

                <li className="col-12 col-lg-6 teammate-card">
                  <img src={ulyanaPopova} alt="ulyanaPopova" />
                  <p className="d-flex flex-column">
                    <span className="name">
                      {translations[messages.ulyanaPopova.id]}
                    </span>
                    <span className="role">
                      {translations[messages.ulyanaPopovaRole.id]}
                    </span>
                    <span className="description">
                      {translations[messages.ulyanaPopovaDescription.id]}
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            <div className="row">
              <div className="col-12 col-lg-5">
                <p className="info-appreciate">
                  <img className="mb-4" src={letterSmile} alt="letter" />
                  <FormattedMessage {...messages.weAppreciate} />
                </p>
              </div>

              <div className="col-12 col-lg-5 offset-lg-1 send-message-form">
                <SendMessageForm
                  form={SEND_MESSAGE_FORM}
                  translations={translations}
                  sendMessage={sendMessage}
                  sendMessageLoading={sendMessageLoading}
                />
                <a
                  className="icon-arrow-up d-none d-xl-flex"
                  href={`#${FIRST_SCREEN}`}
                >
                  <img src={arrowUp} alt="arrowUp" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  </Gradient>
);

Team.propTypes = {
  translations: PropTypes.object,
  sendMessageLoading: PropTypes.bool,
  sendMessage: PropTypes.func,
};

export default Team;
