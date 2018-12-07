import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Parallax from './Parallax';
import { THIRD_SCREEN } from './constants';
import messages from './messages';

const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 60px 0 50px 0;

  .content {
    display: flex;
    flex-basis: 60%;
    flex-direction: column;

    .title {
      color: #ffffff;
      font-weight: bold;
      font-size: 45px;
      text-align: center;
      line-height: 55px;
    }
    .content-body {
      color: #ffffff;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      padding: 50px 0;
    }
  }

  @media only screen and (max-width: 992px) {
    .content {
      flex-basis: 90%;
      .title {
        font-size: 36px;
      }
    }
  }

  @media only screen and (max-width: 560px) {
    .bottom-level {
      height: auto;
      .get-started-form {
        flex-direction: column;
        > * {
          flex-basis: 48px;
          margin: 5px 0;
        }
      }
    }
  }
`;

const ThirdScreen = ({ translations }) => (
  <Parallax id={THIRD_SCREEN}>
    <div className="layers">
      <div className="pattern pattern-1">
        <div className="inner" />
      </div>
    </div>
    <Box>
      <div className="content">
        <h3 className="title">
          <FormattedMessage {...messages.beTheFirst} />
        </h3>
        <p className="content-body">
          <FormattedMessage {...messages.rewardsPool} />
        </p>
        <p className="bottom-level">
          <form className="get-started-form">
            <input
              placeholder={translations[messages.yourEmail.id]}
              type="text"
            />
            <button type="submit">
              <FormattedMessage {...messages.getReward} />
            </button>
          </form>
        </p>
      </div>
    </Box>
  </Parallax>
);

ThirdScreen.propTypes = {
  translations: PropTypes.object,
};

export default ThirdScreen;
