import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import sergeyIlin from 'images/1.png';
import kateBehey from 'images/2.png';
import nikitaSyr from 'images/av1.jpg';
import romRem from 'images/av2.jpg';
import ulyanaPopova from 'images/av3.jpg';
import arrowUp from 'images/ArrowUP.svg';

import { FIRST_SCREEN, FIFTH_SCREEN, SEND_MESSAGE_FORM } from './constants';
import messages from './messages';

import SendMessageForm from './SendMessageForm';
import Section from './Section';
import Gradient from './Gradient';

const icon = 47;

const Box = Section.extend`
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
      padding-bottom: 40px;
    }

    .fifth-screen-about {
      line-height: 1.5;
      color: #282828;
      padding-bottom: 65px;
    }

    .fifth-screen-content {
      .team-avatars {
        ul {
          .teammate-card {
            display: flex;
            flex-direction: column;
            padding-bottom: 65px;

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
              font-family: OpenSans, sans-serif;
              padding: 15px 0 8px 0;
            }

            .role {
              font-family: OpenSans, sans-serif;
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

      .button-submit-wrapper {
        display: block;
      }
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
          <p className="col-lg-6 fifth-screen-about">
            <FormattedMessage {...messages.weAppreciate} />
          </p>

          <div className="col-12 fifth-screen-content">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-7 team-avatars">
                <ul className="row">
                  <li className="col-12 col-sm-4 teammate-card">
                    <img src={sergeyIlin} alt="sergeyIlin" />
                    <span className="name">
                      {translations[messages.sergeyIlin.id]}
                    </span>
                    <span className="role">
                      {translations[messages.founder.id]}
                    </span>
                  </li>
                  <li className="col-12 col-sm-4 teammate-card">
                    <img src={nikitaSyr} alt="nikitaSyr" />
                    <span className="name">
                      {translations[messages.nikitaSyr.id]}
                    </span>
                    <span className="role">
                      {translations[messages.backendDev.id]}
                    </span>
                  </li>
                  <li className="col-12 col-sm-4 teammate-card">
                    <img src={romRem} alt="romRem" />
                    <span className="name">
                      {translations[messages.romRem.id]}
                    </span>
                    <span className="role">
                      {translations[messages.frontendDev.id]}
                    </span>
                  </li>
                  <li className="col-12 col-sm-4 teammate-card">
                    <img src={ulyanaPopova} alt="ulyanaPopova" />
                    <span className="name">
                      {translations[messages.ulyanaPopova.id]}
                    </span>
                    <span className="role">
                      {translations[messages.designer.id]}
                    </span>
                  </li>
                  <li className="col-12 col-sm-4 teammate-card">
                    <img src={kateBehey} alt="kateBehey" />
                    <span className="name">
                      {translations[messages.kateBehey.id]}
                    </span>
                    <span className="role">
                      {translations[messages.marketing.id]}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="col-10 col-lg-5 send-message-form">
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
