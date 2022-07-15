import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import bg from 'images/BG_Rewards.jpg';

import { THIRD_SCREEN, SEND_EMAIL_FORM_REWARDS } from './constants';
import messages from './messages';

import ClickRouteToFeed from './ClickRouteToFeed';
import Section from './Section';

const Rewards = ({ translations }) => (
  <Box id={THIRD_SCREEN}>
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <h2 className="title">
              <FormattedMessage {...messages.beTheFirst} />
            </h2>
          </div>

          <div className="row justify-content-center">
            <p className="col-12 col-lg-10 content-body">
              <FormattedMessage {...messages.rewardsPool} />
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-xl-6 bottom-level mx-auto">
              <ClickRouteToFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

const Box = Section.extend`
  position: relative;
  background: url(${bg});
  background-size: cover;
  background-position-x: 50%;

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
`;

Rewards.propTypes = {
  translations: PropTypes.object,
};

export default Rewards;
