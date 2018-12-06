import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import av11 from 'images/1.png';
import av22 from 'images/2.png';
import av1 from 'images/av1.jpg';
import av2 from 'images/av2.jpg';
import av3 from 'images/av3.jpg';

import { FIFTH_SCREEN } from './constants';

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
            margin-right: 60px;
            margin-bottom: 60px;

            img {
              width: 150px;
              height: 150px;
              object-fit: cover;
              margin-bottom: 10px;
            }

            .name {
              opacity: 0.9;
              font-size: 16px;
              color: #282828;
              line-height: 26px;
            }

            .role {
              font-size: 14px;
              color: #373737;
              line-height: 30px;
              opacity: 0.5;
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

const FifthScreen = () => (
  <Box id={FIFTH_SCREEN}>
    <div className="fifth-screen">
      <h3 className="fifth-screen-header">Our team</h3>
      <p className="fifth-screen-about">
        We highly appreciate your feedback, opinion or suggestion for the
        platform. Send us few lines or even better let us know if you have 15
        minutes to chat.
      </p>
      <div className="fifth-screen-content">
        <div className="team-avatars">
          <ul>
            <li className="teammate-card">
              <img src={av11} alt="avatar" />
              <span className="name">Sergey Ilin</span>
              <span className="role">Founder</span>
            </li>
            <li className="teammate-card">
              <img src={av1} alt="avatar" />
              <span className="name">Nikita Syrovatnikov</span>
              <span className="role">Back-end developer</span>
            </li>
            <li className="teammate-card">
              <img src={av2} alt="avatar" />
              <span className="name">Roman Remniov</span>
              <span className="role">Front-end developer</span>
            </li>
            <li className="teammate-card">
              <img src={av3} alt="avatar" />
              <span className="name">Ulyana Popova</span>
              <span className="role">Designer</span>
            </li>
            <li className="teammate-card">
              <img src={av22} alt="avatar" />
              <span className="name">Kate Behey</span>
              <span className="role">Marketing</span>
            </li>
          </ul>
        </div>
        <div className="send-message-form">
          <form>
            <CustomInput label="Your name" />
            <CustomInput label="Email" />
            <CustomInput label="Subject" />
            <CustomInput label="Message" />
            <div className="form-submit-button">
              <button type="submit">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Box>
);

export default FifthScreen;
