import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as routes from 'routes-config';

import * as plus from 'images/Plus.png';
import * as minus from 'images/Minus.png';
import * as arrRight from 'images/arrRight.svg';

import { FOURTH_SCREEN } from './constants';
import messages from './messages';

const Box = styled.section`
  padding-top: 60px;
  padding-bottom: 126px;
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

const QuestionsData = [
  {
    header: 'whatIsPeerania',
    body: 'whatIsPeeraniaCollapsed',
  },
  {
    header: 'howToCreateAcc',
    body: 'howToCreateAccCollapsed',
  },
  {
    header: 'howToUpvote',
    body: 'howToUpvoteCollapsed',
  },
  {
    header: 'whatToPost',
    body: 'whatToPostCollapsed',
  },
  {
    header: 'canIEarn',
    body: 'canIEarnCollapsed',
  },
  {
    header: 'whatIsReputation',
    body: 'whatIsReputationCollapsed',
  },
  {
    header: 'whatIsPeerania',
    body: 'whatIsPeeraniaCollapsed',
  },
  {
    header: 'howToCreateAcc',
    body: 'howToCreateAccCollapsed',
  },
  {
    header: 'howToUpvote',
    body: 'howToUpvoteCollapsed',
  },
  {
    header: 'whatToPost',
    body: 'whatToPostCollapsed',
  },
  {
    header: 'canIEarn',
    body: 'canIEarnCollapsed',
  },
  {
    header: 'whatIsReputation',
    body: 'whatIsReputationCollapsed',
  },
];

const Question = ({ header, body }) => (
  <div className="card">
    <div className="card-header" id={`heading${header}`}>
      <div>
        <button
          data-toggle="collapse"
          data-target={`#collapse${header}`}
          aria-expanded="false"
          aria-controls={`collapse${header}`}
        >
          <span className="icon icon-collapse" />
          <span className="text">
            <FormattedMessage {...messages[header]} />
          </span>
        </button>
      </div>
      <div
        id={`collapse${header}`}
        className="collapse"
        aria-labelledby={`heading${header}`}
        data-parent="#accordion"
      >
        <div className="card-body">
          <FormattedMessage {...messages[body]} />
        </div>
      </div>
    </div>
  </div>
);

const Questions = ({ questionsNumber }) =>
  QuestionsData.slice(0, questionsNumber).map(item => (
    <Question key={item.header} {...item} />
  ));

const FaqMain = ({ questionsNumber }) => (
  <Box id={FOURTH_SCREEN}>
    <div className="container">
      <div className="row">
        <div className="col-lg-12 fourth-screen-faq" id="accordion">
          <Questions questionsNumber={questionsNumber} />
          <div className="card get-more-answers">
            <div className="card-header">
              <div className="mb-0">
                <Link to={routes.faq()} href={routes.faq()}>
                  <button className="get-more-answers">
                    <img
                      className="icon icon-getanswers"
                      src={arrRight}
                      alt="arrRight"
                    />
                    <span className="text">
                      <FormattedMessage {...messages.getMoreAnswers} />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

FaqMain.propTypes = {
  questionsNumber: PropTypes.number,
};

Question.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string,
};

export default FaqMain;
