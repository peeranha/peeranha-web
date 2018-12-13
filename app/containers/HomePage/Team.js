import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import av11 from 'images/1.png';
import av22 from 'images/2.png';
import av1 from 'images/av1.jpg';
import av2 from 'images/av2.jpg';
import av3 from 'images/av3.jpg';

import { FIFTH_SCREEN } from './constants';
import messages from './messages';

const inputHeight = 40;

const Box = styled.section`
  padding-bottom: 50px;
  color: #282828;

  .fifth-screen {
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

      .send-message-form {
        padding-left: 40px;

        .custom-input-5-scr {
          position: relative;

          p {
            line-height: ${inputHeight}px;
            color: #282828;
            font-size: 16px;
            position: absolute;
            top: 0;
            left: 2px;
          }

          input {
            position: relative;
            z-index: 2;
            transition: 0.5s;
            width: 100%;
            height: ${inputHeight}px;
            outline: none;
            border-bottom: 2px solid #e6e6e6;
            padding: 0 2px;
            font-size: 14px;
            margin-bottom: 40px;
          }

          input:focus {
            border-color: #f76f60;
            + p {
              transition: 0.5s;
              color: #9b9b9b;
              font-size: 14px;
              line-height: 0;
            }
          }

          input[value]:not([value='']) {
            + p {
              line-height: 0 !important;
              color: #9b9b9b !important;
              font-size: 14px !important;
            }
          }
        }

        .form-submit-button {
          display: flex;
          margin-top: 10px;
          height: ${inputHeight}px;
          button {
            padding: 0 30px;
            flex: unset;
          }
        }
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

const CustomInput = ({ label }) => (
  <div className="custom-input-5-scr">
    <input
      type="text"
      onKeyUp={e => e.target.setAttribute('value', e.target.value)}
    />
    <p>{label}</p>
  </div>
);

CustomInput.propTypes = {
  label: PropTypes.string,
};

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
              <form>
                <CustomInput label={translations[messages.yourName.id]} />
                <CustomInput label={translations[messages.email.id]} />
                <CustomInput label={translations[messages.subject.id]} />
                <CustomInput label={translations[messages.message.id]} />
                <div className="form-submit-button">
                  <button type="submit">
                    {translations[messages.sendMessage.id]}
                  </button>
                </div>
              </form>
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
