import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import bg from 'images/BG_Rewards.jpg';

import { THIRD_SCREEN } from './constants';
import messages from './messages';

import EmailLandingForm from './EmailLandingForm';

const Box = styled.section`
  position: relative;
  padding-top: 96px;
  padding-bottom: 96px;
  background: url(${bg});
  background-size: cover;

  .content {
    justify-content: center;

    .title {
      color: #ffffff;
      font-family: OpenSansBold !important;
      font-size: 45px;
      text-align: center;
      line-height: 1.22;
      letter-spacing: -1.8px;
      padding: 0 2rem;
    }

    .content-body {
      color: #ffffff;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      padding: 49px 0 55px 0;
      line-height: 1.5;
      letter-spacing: -0.8px;
      font-family: OpenSans;
    }
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

const Rewards = () => (
  <Box id={THIRD_SCREEN}>
    <div className="container">
      <div className="row content">
        <div className="col-lg-8">
          <h1 className="title">
            <FormattedMessage {...messages.beTheFirst} />
          </h1>
          <p className="col-lg-12 content-body">
            <FormattedMessage {...messages.rewardsPool} />
          </p>
          <div className="col-10 col-md-6 col-lg-7 bottom-level mx-auto">
            <div className="row">
              <EmailLandingForm button={messages.getReward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

export default Rewards;
