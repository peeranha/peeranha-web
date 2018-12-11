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
  padding: 60px 0;
  background-color: #fff;

  .fourth-screen-faq {
    .card {
      border: none;

      .card-header {
        background: transparent;

        button {
          display: flex;
          align-items: center;
          text-align: left;
          outline: none;
          font-size: 30px;
          color: #282828;
          font-family: OpenSansBold !important;
          line-height: 1.33;
          letter-spacing: -1.2px;
          padding: 10px 0;
          cursor: pointer;

          .icon {
            background-size: cover;
            min-width: 30px;
            width: 30px;
            height: 30px;
            margin: 3px 15px 0 0;
            display: inline-block;
            transition: 0.5s;
          }
        }

        button[aria-expanded='true'] .icon.icon-collapse {
          background: url(${minus}) no-repeat;
        }

        button[aria-expanded='false'] {
          .icon.icon-collapse {
            background: url(${plus}) no-repeat;
          }

          :hover {
            color: #5c78d7;
            .icon {
              transform: rotate(90deg);
            }
          }
        }

        button.get-more-answers {
          .icon {
            transition: 0.5s;
            height: 15px !important;
            wudth: 15px !important;
          }

          :hover {
            color: #f76e5f;
            .icon {
              transform: translate(10px, 0px);
            }
          }
        }
      }

      .card-body {
        font-family: OpenSans;
        padding-left: 3rem;
      }
    }

    .card.get-more-answers .card-header {
      border: none;
      button {
        color: #fa8072 !important;
      }
    }
  }
`;

const Faq = ({ translations }) => (
  <Box id={FOURTH_SCREEN}>
    <div className="container">
      <div className="row">
        <div className="col-lg-12 fourth-screen-faq" id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <div>
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
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <div>
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
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <div>
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
          </div>
          <div className="card">
            <div className="card-header" id="headingFour">
              <div>
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
          </div>
          <div className="card">
            <div className="card-header" id="headingFive">
              <div>
                <button
                  data-toggle="collapse"
                  data-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  <span className="icon icon-collapse" />
                  <span className="text">
                    {translations[messages.canIEarn.id]}
                  </span>
                </button>
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
          </div>
          <div className="card">
            <div className="card-header" id="headingSix">
              <div>
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
          </div>
          <div className="card get-more-answers">
            <div className="card-header">
              <div className="mb-0">
                <a href="/">
                  <button className="get-more-answers">
                    <img
                      className="icon icon-getanswers"
                      src={arrRight}
                      alt="arrRight"
                    />
                    <span className="text">
                      {translations[messages.getMoreAnswers.id]}
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

Faq.propTypes = {
  translations: PropTypes.object,
};

export default Faq;
