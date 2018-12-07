import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as plus from 'images/Plus.png';
import * as minus from 'images/Minus.png';
import * as arrRight from 'images/arrRight.svg';

import { FOURTH_SCREEN } from './constants';
import messages from './messages';

const Box = styled.section`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  background-color: #fff;

  .fourth-screen-faq {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;

    .card {
      border: none;

      .card-header {
        background: transparent;

        button {
          display: flex;
          text-align: left;
          align-items: center;
          outline: none;
          font-size: 30px;
          color: #282828;
          font-weight: bold;
          line-height: 40px;
          padding: 10px 0;
          cursor: pointer;

          .icon {
            background-size: cover;
            min-width: 30px;
            width: 30px;
            height: 30px;
            margin: 0 15px 3px 0;
          }
        }

        button[aria-expanded='true'] .icon.icon-collapse {
          background: url(${minus}) no-repeat;
        }

        button[aria-expanded='false'] .icon.icon-collapse {
          background: url(${plus}) no-repeat;
        }
      }
    }

    .card.get-more-answers .card-header {
      border: none;
      button {
        color: #fa8072 !important;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    padding: 30px 0;
    .fourth-screen-faq {
      button {
        font-size: 24px !important;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .fourth-screen-faq {
      flex-basis: 80%;
      button {
        .text {
          line-height: normal;
          font-size: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: 560px) {
    .fourth-screen-faq {
      flex-basis: 95%;
      button {
        .text {
          font-size: 18px;
        }
      }
    }
  }
`;

const FourthScreen = ({ translations }) => (
  <Box id={FOURTH_SCREEN}>
    <div className="fourth-screen-faq" id="accordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                {translations[messages.whatIsPeerania.id]}
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.whatIsPeeraniaCollapsed} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                {translations[messages.howToCreateAcc.id]}
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.howToCreateAccCollapsed} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                {translations[messages.howToUpvote.id]}
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.howToUpvoteCollapsed} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingFour">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                {translations[messages.whatToPost.id]}
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.whatToPostCollapsed} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingFive">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              <span className="icon icon-collapse" />
              <span className="text">{translations[messages.canIEarn.id]}</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseFive"
          className="collapse"
          aria-labelledby="headingFive"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.canIEarnCollapsed} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingSix">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                {translations[messages.whatIsReputation.id]}
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseSix"
          className="collapse"
          aria-labelledby="headingSix"
          data-parent="#accordion"
        >
          <div className="card-body">
            <FormattedMessage {...messages.whatIsReputationCollapsed} />
          </div>
        </div>
      </div>
      <div className="card get-more-answers">
        <div className="card-header">
          <h5 className="mb-0">
            <a href="/">
              <button>
                <img className="icon" src={arrRight} alt="arrRight" />
                <span className="text">
                  {translations[messages.getMoreAnswers.id]}
                </span>
              </button>
            </a>
          </h5>
        </div>
      </div>
    </div>
  </Box>
);

FourthScreen.propTypes = {
  translations: PropTypes.object,
};

export default FourthScreen;
