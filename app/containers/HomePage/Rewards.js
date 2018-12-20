import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import bg from 'images/BG_Rewards.jpg';

import { THIRD_SCREEN, SEND_EMAIL_FORM_C } from './constants';
import messages from './messages';

import EmailLandingForm from './EmailLandingForm';
import Section from './Section';

const Box = Section.extend`
  position: relative;
  background: url(${bg});
  background-size: cover;

  .title {
    color: #ffffff;
    text-align: center;
    line-height: 1.22;
    font-size: 2.8em;
  }

  .content-body {
    color: #ffffff;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 55px;
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
`;

const Rewards = ({ sendEmailLoading, sendEmail }) => (
  <Box id={THIRD_SCREEN}>
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <div className="row justify-content-center">
            <h2 className="col-12 col-lg-8 title">
              <FormattedMessage {...messages.beTheFirst} />
            </h2>
          </div>

          <div className="row justify-content-center">
            <p className="col-12 col-lg-8 content-body">
              <FormattedMessage {...messages.rewardsPool} />
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-xl-5 bottom-level mx-auto">
              <EmailLandingForm
                form={SEND_EMAIL_FORM_C}
                button={messages.getReward}
                sendEmailLoading={sendEmailLoading}
                sendEmail={sendEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

Rewards.propTypes = {
  sendEmailLoading: PropTypes.bool,
  sendEmail: PropTypes.func,
};

export default Rewards;
