import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as img1 from 'images/Ico_01.svg';
import * as img2 from 'images/Ico_02.svg';
import * as img3 from 'images/Ico_03.svg';

import * as img11 from 'images/1.png';
import * as img22 from 'images/2.png';
import * as img33 from 'images/3.png';
import * as img44 from 'images/4.png';
import * as img55 from 'images/5.png';

import { SECOND_SCREEN, ANIMATE_IMAGE } from './constants';
import messages from './messages';

const Box = styled.section`
  scroll-behavior: smooth;
  text-align: center;
  background-color: #fff;
  padding-bottom: 80px;

  .second-screen-header {
    padding-top: 112px;
    padding-bottom: 81px;
    font-size: 30px;
    font-family: OpenSansBold !important;
  }

  .separator {
    transform: rotate(180deg);
    height: 170px;
  }

  .main-difference {
    li {
      letter-spacing: -0.7px;
      font-size: 18px;
      color: #282828;

      .card {
        border: none;
        .card-body {
          padding: 0;
        }
      }

      img {
        height: 81px;
      }

      .item-title {
        padding: 31px 0 26px 0;
        font-family: OpenSansBold !important;
      }

      .item-content {
        font-family: OpenSans;
        padding: 0 3.25rem;
      }
    }
  }

  .second-screen-elements-column {
    li:nth-child(even) {
      .block1 {
        order: 2;
      }
      .block2 {
        order: 1;
        padding: 0 55px 0 35px;
      }
    }

    li {
      padding-top: 80px;
      display: flex;
      align-items: center;

      > * {
        text-align: left;
      }

      .block2 {
        display: flex;
        align-items: center;
        padding: 0 35px 0 55px;
      }

      .block1 {
        img {
          position: relative;
          transform: translate(0, 0);
          transition: 2s;
        }
      }

      .text-1 {
        font-family: OpenSans;
        color: #fa8072;
        font-size: 16px;
        letter-spacing: -0.6px;
      }

      .text-2 {
        color: #282828;
        font-size: 30px;
        font-family: OpenSansBold !important;
        padding-top: 19px;
        padding-bottom: 32px;
        letter-spacing: -1.2px;
      }

      .text-3 {
        font-family: OpenSans;
        color: #282828;
        font-size: 20px;
        letter-spacing: -0.8px;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .second-screen-header {
      padding-top: 81px;
      padding-bottom: 0;
    }

    .main-difference {
      li {
        padding-top: 75px;
        padding-bottom: 0;
      }
    }

    .second-screen-elements-column {
      li {
        padding-top: 40px;

        .block1 {
          margin: 40px 0;
          text-align: center;
        }

        .block1,
        .block2 {
          order: 1 !important;
        }
      }
    }
  }
`;

const About = () => (
  <Box id={SECOND_SCREEN}>
    <div className="container second-screen">
      <h1 className="col-lg-12 second-screen-header">
        <FormattedMessage {...messages.differentThan} />
      </h1>
      <div className="row second-screen-elements">
        <ul className="col-lg-12 main-difference">
          <div className="row">
            <li className="col-lg-4">
              <div className="card row">
                <div className="col-lg-12">
                  <img src={img1} alt="img1" />
                </div>
                <div className="card-body">
                  <p className="card-text item-title">
                    <FormattedMessage {...messages.practicalAnswers} />
                  </p>
                  <p className="card-text item-content">
                    <FormattedMessage {...messages.sitesAreModerated} />
                  </p>
                </div>
              </div>
            </li>
            <li className="col-lg-4">
              <div className="card row">
                <div className="col-lg-12">
                  <img src={img2} alt="img2" />
                </div>
                <div className="card-body">
                  <p className="item-title">
                    <FormattedMessage {...messages.fairEconomy} />
                  </p>
                  <p className="item-content">
                    <FormattedMessage {...messages.postsOnQA} />
                  </p>
                </div>
              </div>
            </li>
            <li className="col-lg-4">
              <div className="card row">
                <div>
                  <img src={img3} alt="img3" />
                </div>
                <div className="card-body">
                  <p className="item-title">
                    <FormattedMessage {...messages.builtOnSmart} />
                  </p>
                  <p className="item-content">
                    <FormattedMessage {...messages.platformIsDistributed} />
                  </p>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div className="separator" />
    <div className="container second-screen">
      <div className="row second-screen-elements">
        <ul className="col-lg-12 second-screen-elements-column">
          <div className="row">
            <li className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={img11}
                    width="93%"
                    alt="img11"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.simpleAndAffordable} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.getHelp} />
                    </h5>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.askQuestionAndGetHelp} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={img22}
                    width="93%"
                    alt="img22"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.helpfulAndGenerous} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.shareKnowledge} />
                    </h5>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.helpCommunity} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={img33}
                    width="93%"
                    alt="img33"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.profitableAndModern} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.getPaidInCrypto} />
                    </h5>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage
                        {...messages.getPaidInCryptoFromWeekly}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={img44}
                    width="93%"
                    alt="img44"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.worthyAndPrestig} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.earnReputation} />
                    </h5>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.whetherYouAsk} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={img55}
                    width="93%"
                    alt="img55"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.honorableAndFascinating} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.ruleThePlatform} />
                    </h5>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.participateInModeration} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </Box>
);

About.propTypes = {
  translations: PropTypes.object,
};

export default About;
