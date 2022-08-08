import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_DARK, TEXT_LIGHT } from 'style-constants';

import { scrollToSection } from 'utils/animation';

import ArrowLeftThinIcon from 'icons/ArrowLeftThin';
import letterSmile from 'images/letter-smile.svg?inline';

import { FIRST_SCREEN, FIFTH_SCREEN, SEND_MESSAGE_FORM } from './constants';
import messages from './messages';

import SendMessageForm from './SendMessageForm';
import Section from './Section';
import Gradient from './Gradient';

const icon = 47;

const FeedbackForm = ({ translations, sendMessageLoading, sendMessage }) => (
  <Gradient position="bottom">
    <Box id={FIFTH_SCREEN}>
      <div className="container">
        <div className="row fifth-screen">
          <div className="col-12 fifth-screen-content">
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
                <button
                  className="icon-arrow-up d-none d-xl-flex"
                  onClick={() => scrollToSection(`#${FIRST_SCREEN}`)}
                >
                  <ArrowLeftThinIcon
                    className="transform90"
                    size={[24, 15]}
                    fill="#7699ff"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  </Gradient>
);

const Box = Section.extend`
  color: ${TEXT_DARK};

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
      background-color: ${TEXT_LIGHT};
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
      color: ${TEXT_DARK};
      padding-bottom: 65px;
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
FeedbackForm.propTypes = {
  translations: PropTypes.object,
  sendMessageLoading: PropTypes.bool,
  sendMessage: PropTypes.func,
};

export default React.memo(FeedbackForm);
