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
  padding: 60px 0 50px 0;
  display: flex;
  justify-content: center;
  color: #282828;
  background-color: rgba(229, 229, 229, 0.2);

  .fifth-screen {
    display: flex;
    flex-basis: 60%;
    flex-direction: column;

    .fifth-screen-header {
      font-size: 45px;
      font-weight: bold;
      line-height: 55px;
    }

    .fifth-screen-about {
      font-size: 20px;
      line-height: 30px;
      padding: 30px 50% 50px 0;
    }

    .fifth-screen-content {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .team-avatars {
        flex: 3;
        ul {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;

          .teammate-card {
            display: flex;
            flex-direction: column;
            margin-right: 40px;
            margin-bottom: 40px;

            img {
              width: 150px;
              height: 150px;
              object-fit: cover;
              margin-bottom: 10px;
            }

            .name {
              font-size: 16px;
              color: rgba(40, 40, 40, 0.9);
              line-height: 26px;
            }

            .role {
              font-size: 14px;
              color: rgba(55, 55, 55, 0.5);
              line-height: 30px;
            }
          }
        }
      }

      .send-message-form {
        flex: 2;
        padding-left: 40px;

        .custom-input-5-scr {
          position: relative;
          margin-bottom: 30px;

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
            padding-top: 5px;
            width: 100%;
            height: ${inputHeight}px;
            outline: none;
            border-bottom: 2px solid #e6e6e6;
            padding: 0 2px;
            font-size: 14px;
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
          margin: 40px 0;
          height: ${inputHeight}px;
          button {
            padding: 0 30px;
            flex: unset;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    padding: 30px 0;
    .fifth-screen {
      flex-basis: 60%;
      .fifth-screen-header {
        font-size: 36px;
      }
      .fifth-screen-about {
        font-size: 18px;
        padding: 20px 0;
      }
      .fifth-screen-content {
        flex-direction: column;
        ul {
          justify-content: center;
          li.teammate-card {
            padding: 25px !important;
            margin: 0 !important;
          }
        }
        .send-message-form {
          padding: 10px;
          .form-submit-button {
            button {
              flex: 1;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 992px) {
    .fifth-screen {
      flex-basis: 80%;
    }
  }
  @media only screen and (max-width: 560px) {
    .fifth-screen {
      flex-basis: 90%;
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

const FifthScreen = ({ translations }) => (
  <Box id={FIFTH_SCREEN}>
    <div className="fifth-screen">
      <h3 className="fifth-screen-header">
        <FormattedMessage {...messages.ourTeam} />
      </h3>
      <p className="fifth-screen-about">
        <FormattedMessage {...messages.weAppreciate} />
      </p>
      <div className="fifth-screen-content">
        <div className="team-avatars">
          <ul>
            <li className="teammate-card">
              <img src={av11} alt="avatar" />
              <span className="name">
                {translations[messages.sergeyIlin.id]}
              </span>
              <span className="role">{translations[messages.founder.id]}</span>
            </li>
            <li className="teammate-card">
              <img src={av1} alt="avatar" />
              <span className="name">
                {translations[messages.nikitaSyr.id]}
              </span>
              <span className="role">
                {translations[messages.backendDev.id]}
              </span>
            </li>
            <li className="teammate-card">
              <img src={av2} alt="avatar" />
              <span className="name">{translations[messages.romRem.id]}</span>
              <span className="role">
                {translations[messages.frontendDev.id]}
              </span>
            </li>
            <li className="teammate-card">
              <img src={av3} alt="avatar" />
              <span className="name">
                {translations[messages.ulyanaPopova.id]}
              </span>
              <span className="role">{translations[messages.designer.id]}</span>
            </li>
            <li className="teammate-card">
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
        <div className="send-message-form">
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
  </Box>
);

FifthScreen.propTypes = {
  translations: PropTypes.object,
};

export default FifthScreen;
