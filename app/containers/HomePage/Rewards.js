import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as bg from 'images/BG_Rewards.jpg';

import { THIRD_SCREEN } from './constants';
import messages from './messages';

const Box = styled.div`
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
`;

const Rewards = ({ translations }) => (
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
          <div className="col-lg-8 bottom-level mx-auto">
            <form className="row get-started-form">
              <input
                className="col-lg-8"
                placeholder={translations[messages.yourEmail.id]}
                type="text"
              />
              <button className="col-lg-4" type="submit">
                <FormattedMessage {...messages.getReward} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

Rewards.propTypes = {
  translations: PropTypes.object,
};

export default Rewards;
